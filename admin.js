'use strict';

(() => {
  const $ = selector => document.querySelector(selector);
  const backend = window.HCBBackend;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  const rupiah = value => new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(value);
  let client;
  let products = [];
  let settings = null;
  let editing = null;
  let editorDirty = false;
  let settingsDirty = false;
  let busy = false;
  let epoch = 0;

  function message(selector, text = '', kind = 'error') {
    const target = $(selector);
    target.textContent = text;
    target.className = 'form-message ' + kind;
  }
  function readable(error) {
    if (error?.code === '42501') return 'Akun Anda tidak memiliki izin untuk tindakan ini.';
    if (error?.code === '23514') return 'Ada isian yang tidak sesuai. Periksa harga, kategori, dan alamat tautan.';
    if (error?.code === '23505') return 'Kode produk sudah dipakai. Muat ulang data lalu coba lagi.';
    return error?.message || 'Tindakan belum dapat dikonfirmasi. Periksa koneksi dan muat ulang data.';
  }
  async function action(button, target, task) {
    if (busy) return;
    busy = true;
    const oldText = button?.textContent;
    if (button) { button.disabled = true; button.textContent = 'Memproses…'; }
    message(target);
    try { await task(); }
    catch (error) { message(target, readable(error)); }
    finally { busy = false; if (button) { button.disabled = false; button.textContent = oldText; } }
  }
  function cleanPhone(value) {
    let phone = String(value || '').replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.slice(1);
    if (phone && !/^\d{10,15}$/.test(phone)) throw new Error('Periksa nomor WhatsApp. Gunakan kode negara dan nomor yang lengkap.');
    return phone;
  }
  function sourceURL(value) {
    const text = String(value || '').trim();
    if (!text) return null;
    let url;
    try { url = new URL(text); } catch { throw new Error('Tautan informasi produk belum benar.'); }
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Tautan informasi produk harus memakai HTTPS.');
    return text;
  }
  function imageHTML(product) {
    let image;
    try { image = backend.safeImage(product.image); } catch { return ''; }
    if (!image) return '<span class="small muted">Tanpa foto</span>';
    const frame = product.frame;
    if (frame && Array.isArray(frame.size) && Array.isArray(frame.crop)) {
      const [ow, oh] = frame.size.map(Number);
      const [x, y, width, height] = frame.crop.map(Number);
      if ([ow,oh,width,height].every(v => Number.isFinite(v) && v > 0) && [x,y].every(v => Number.isFinite(v) && v >= 0)) {
        const ratio = width / height;
        const style = `--ratio:${ratio};--width:${Math.min(.92,.92*ratio)*100}%;--image-width:${ow/width*100}%;--left:${-x/width*100}%;--top:${-y/height*100}%`;
        return `<span class="photo-frame" style="${style}"><img src="${escape(image)}" alt="${escape(product.name)}" loading="lazy"></span>`;
      }
    }
    return `<img src="${escape(image)}" alt="${escape(product.name)}" loading="lazy">`;
  }
  function renderProducts() {
    const query = $('#admin-search').value.toLocaleLowerCase('id-ID').trim();
    const list = products.filter(product => product.name.toLocaleLowerCase('id-ID').includes(query));
    $('#product-count').textContent = `${products.length} produk · ${products.filter(p => p.active).length} ditampilkan`;
    $('#admin-products').innerHTML = list.map(product => `<article class="product-row"><div class="row-photo">${imageHTML(product)}</div><div><h3>${escape(product.name)}<span class="badge ${product.active ? '' : 'off'}">${product.active ? 'Tampil' : 'Disembunyikan'}</span></h3><p>${escape(product.label)} · ${product.price === null ? 'Tanya harga' : rupiah(product.price)}${product.unit ? ' / ' + escape(product.unit) : ''} · ${product.price_type === 'retail' ? 'Harga jual' : 'Harga acuan'}</p></div><div class="row-actions"><button class="button secondary" data-edit="${escape(product.id)}">Edit</button><button class="text-button delete-button" data-delete="${escape(product.id)}">Hapus</button></div></article>`).join('');
    $('#admin-empty').hidden = list.length !== 0;
  }
  function fillSettings() {
    const form = $('#settings-form');
    for (const key of ['name','whatsapp','address','hours','announcement','hero_title','hero_description','about']) form.elements.namedItem(key).value = settings[key] || '';
    settingsDirty = false;
  }
  async function loadData() {
    const requestEpoch = epoch;
    const signal = AbortSignal.timeout(15000);
    const [items, store] = await Promise.all([
      client.from('hcb_products').select('*').order('sort_order').order('name').abortSignal(signal),
      client.from('hcb_settings').select('*').eq('id',1).single().abortSignal(signal),
    ]);
    if (requestEpoch !== epoch) throw new Error('Sesi sudah berakhir. Silakan masuk kembali.');
    if (items.error || store.error) throw new Error('Data toko belum dapat dimuat. Periksa sambungan dan pemasangan database.');
    products = items.data;
    settings = store.data;
    renderProducts();
    fillSettings();
  }
  function showLogin() {
    epoch++;
    $('#dashboard').hidden = true;
    $('#login-panel').hidden = false;
    $('#logout').hidden = true;
    if ($('#product-editor').open) $('#product-editor').close();
    products = []; settings = null; editing = null;
    editorDirty = false; settingsDirty = false;
    $('#admin-products').replaceChildren();
    $('#settings-form').reset();
    $('#product-form').reset();
    $('#signed-in').textContent = '';
    $('#login-password').value = '';
  }
  async function enter(session) {
    const attempt = ++epoch;
    await backend.requireAdmin();
    if (attempt !== epoch) return;
    await loadData();
    if (attempt !== epoch) return;
    $('#signed-in').textContent = session.user.email || 'Akun pengelola';
    $('#login-panel').hidden = true;
    $('#dashboard').hidden = false;
    $('#logout').hidden = false;
    message('#login-message');
  }
  function previewPhoto() {
    const box = $('#photo-preview');
    box.replaceChildren();
    let url;
    try { url = backend.safeImage(editing?.image); } catch { url = ''; }
    if (!url) { box.textContent = 'Foto belum tersedia'; return; }
    const img = document.createElement('img');
    img.src = url; img.alt = 'Pratinjau foto produk';
    box.append(img);
  }
  function openEditor(id) {
    if (busy) return;
    const found = products.find(p => p.id === id);
    editing = found ? structuredClone(found) : {
      id: 'p-' + crypto.randomUUID(), name:'', category:'herbal', label:'Herbal',
      price:null, price_type:'retail', unit:'', brand:'GM', description:'', source:null,
      image:'', frame:null, active:true, sort_order:Math.max(0,...products.map(p=>p.sort_order)) + 1,
    };
    const form = $('#product-form');
    form.reset();
    for (const key of ['name','category','label','price','price_type','unit','brand','description','source','sort_order']) form.elements.namedItem(key).value = editing[key] ?? '';
    form.elements.namedItem('active').checked = editing.active;
    $('#editor-title').textContent = found ? 'Edit produk' : 'Tambah produk';
    message('#editor-message');
    editorDirty = false;
    previewPhoto();
    $('#product-editor').showModal();
    form.elements.namedItem('name').focus();
  }
  function closeEditor() {
    if (busy) return;
    if (editorDirty && !confirm('Tutup editor tanpa menyimpan perubahan?')) return;
    $('#product-editor').close();
    editing = null; editorDirty = false;
  }
  async function uploadPhoto(file) {
    if (!file || !editing) return;
    if (file.size > 5*1024*1024 || file.size === 0) throw new Error('Ukuran foto harus di bawah 5 MB dan tidak kosong.');
    const bytes = new Uint8Array(await file.slice(0,12).arrayBuffer());
    let mime, extension;
    if (bytes[0]===0xff && bytes[1]===0xd8 && bytes[2]===0xff) { mime='image/jpeg'; extension='jpg'; }
    else if ([137,80,78,71,13,10,26,10].every((n,i)=>bytes[i]===n)) { mime='image/png'; extension='png'; }
    else if (String.fromCharCode(...bytes.slice(0,4))==='RIFF' && String.fromCharCode(...bytes.slice(8,12))==='WEBP') { mime='image/webp'; extension='webp'; }
    else throw new Error('Pilih foto JPG, PNG, atau WebP yang valid.');
    await backend.requireAdmin();
    const path = 'products/' + crypto.randomUUID() + '.' + extension;
    const { error } = await client.storage.from('hcb-products').upload(path, file, { contentType:mime, cacheControl:'3600', upsert:false });
    if (error) throw new Error('Foto belum berhasil diunggah. Periksa koneksi dan izin penyimpanan.');
    const { data } = client.storage.from('hcb-products').getPublicUrl(path);
    editing.image = backend.safeImage(data.publicUrl);
    editing.frame = null;
    editorDirty = true;
    previewPhoto();
    message('#editor-message','Foto sudah diunggah. Klik Simpan produk untuk memasangnya pada katalog.','success');
  }

  $('#login-form').addEventListener('submit', event => {
    event.preventDefault();
    action($('#login-submit'),'#login-message', async () => {
      const email = $('#login-email').value.trim();
      const password = $('#login-password').value;
      let result;
      try { result = await client.auth.signInWithPassword({ email, password }); }
      finally { $('#login-password').value = ''; }
      if (result.error || !result.data?.session) throw new Error('Email atau kata sandi belum cocok, atau layanan login belum dapat dihubungi.');
      try { await enter(result.data.session); }
      catch (error) { await client.auth.signOut({ scope:'local' }); throw error; }
    });
  });
  $('#logout').addEventListener('click', () => {
    if ((settingsDirty || editorDirty) && !confirm('Keluar tanpa menyimpan perubahan?')) return;
    action($('#logout'),'#dashboard-message', async () => {
      const { error } = await client.auth.signOut({ scope:'local' });
      if (error) throw new Error('Keluar belum dapat dikonfirmasi. Coba lagi.');
      showLogin();
    });
  });
  $('#reload-data').addEventListener('click', () => {
    if (settingsDirty && !confirm('Muat ulang dan batalkan perubahan informasi toko yang belum disimpan?')) return;
    action($('#reload-data'),'#dashboard-message',async()=>{ await backend.requireAdmin(); await loadData(); message('#dashboard-message','Data terbaru sudah dimuat.','success'); });
  });
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    $('#products-panel').hidden = tab !== 'products';
    $('#settings-panel').hidden = tab !== 'settings';
    document.querySelectorAll('[data-tab]').forEach(item => { const active=item===button; item.classList.toggle('active',active); item.setAttribute('aria-pressed',String(active)); });
    message('#dashboard-message');
  }));
  $('#admin-search').addEventListener('input',renderProducts);
  $('#add-product').addEventListener('click',()=>openEditor());
  $('#close-editor').addEventListener('click',closeEditor);
  $('#cancel-editor').addEventListener('click',closeEditor);
  $('#product-editor').addEventListener('cancel',event=>{event.preventDefault();closeEditor();});
  $('#product-form').addEventListener('input',()=>{editorDirty=true;});
  $('#settings-form').addEventListener('input',()=>{settingsDirty=true;});
  $('#photo-upload').addEventListener('change',event=>{
    const file=event.target.files?.[0];
    if (busy) { event.target.value=''; return; }
    action($('#save-product'),'#editor-message',async()=>{await uploadPhoto(file);event.target.value='';});
  });
  $('#remove-photo').addEventListener('click',()=>{
    if(busy||!editing)return;
    editing.image='';editing.frame=null;editorDirty=true;previewPhoto();
    message('#editor-message','Foto akan dilepas dari produk setelah disimpan.','success');
  });
  $('#admin-products').addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button||busy)return;
    if(button.dataset.edit)openEditor(button.dataset.edit);
    if(button.dataset.delete){
      const product=products.find(p=>p.id===button.dataset.delete);
      if(!product||!confirm(`Hapus ${product.name} dari katalog? Foto aslinya tetap disimpan.`))return;
      action(button,'#dashboard-message',async()=>{
        await backend.requireAdmin();
        const {data,error}=await client.from('hcb_products').delete().eq('id',product.id).eq('revision',product.revision).select('id').abortSignal(AbortSignal.timeout(15000));
        if(error)throw error;
        if(data?.length!==1)throw new Error('Produk sudah berubah di tempat lain. Muat ulang data sebelum menghapus.');
        products=products.filter(p=>p.id!==product.id);renderProducts();
        message('#dashboard-message','Produk berhasil dihapus dari katalog.','success');
      });
    }
  });
  $('#product-form').addEventListener('submit',event=>{
    event.preventDefault();
    if(!editing)return;
    action($('#save-product'),'#editor-message',async()=>{
      await backend.requireAdmin();
      const form=event.target;
      const value=name=>form.elements.namedItem(name).value.trim();
      const rawPrice=value('price');
      const price=rawPrice===''?null:Number(rawPrice);
      if(price!==null&&(!Number.isSafeInteger(price)||price<=0||price>999999999))throw new Error('Harga harus berupa angka bulat positif, tanpa titik atau koma.');
      const draft={ id:editing.id,name:value('name'),category:value('category'),label:value('label'),price,
        price_type:value('price_type'),unit:value('unit'),brand:value('brand'),description:value('description'),
        source:sourceURL(value('source')),image:backend.safeImage(editing.image),frame:editing.frame,
        active:form.elements.namedItem('active').checked,sort_order:Number(value('sort_order')) };
      const existing=products.find(p=>p.id===editing.id);
      const query=existing?client.from('hcb_products').update(draft).eq('id',existing.id).eq('revision',existing.revision):client.from('hcb_products').insert(draft);
      const {data,error}=await query.select('*').abortSignal(AbortSignal.timeout(15000));
      if(error)throw error;
      if(data?.length!==1)throw new Error('Produk sudah berubah di tempat lain. Tutup editor, muat ulang data, lalu ulangi perubahan.');
      products=[...products.filter(p=>p.id!==data[0].id),data[0]].sort((a,b)=>a.sort_order-b.sort_order||a.name.localeCompare(b.name,'id'));
      renderProducts();editorDirty=false;editing=null;$('#product-editor').close();
      message('#dashboard-message','Produk tersimpan. Muat ulang halaman toko untuk melihat hasilnya.','success');
    });
  });
  $('#settings-form').addEventListener('submit',event=>{
    event.preventDefault();
    action($('#save-settings'),'#dashboard-message',async()=>{
      await backend.requireAdmin();
      const form=event.target;
      const draft={};
      for(const key of ['name','address','hours','announcement','hero_title','hero_description','about'])draft[key]=form.elements.namedItem(key).value.trim();
      draft.whatsapp=cleanPhone(form.elements.namedItem('whatsapp').value);
      const {data,error}=await client.from('hcb_settings').update(draft).eq('id',1).eq('revision',settings.revision).select('*').abortSignal(AbortSignal.timeout(15000));
      if(error)throw error;
      if(data?.length!==1)throw new Error('Informasi toko sudah berubah di tempat lain. Muat ulang data sebelum menyimpan lagi.');
      settings=data[0];fillSettings();
      message('#dashboard-message','Informasi toko berhasil disimpan.','success');
    });
  });
  window.addEventListener('beforeunload',event=>{
    if(settingsDirty||editorDirty||busy){event.preventDefault();event.returnValue='';}
  });
  async function init(){
    if(!backend?.configured){$('#setup-message').hidden=false;$('#login-submit').disabled=true;return;}
    try{
      client=backend.getClient();
      client.auth.onAuthStateChange(event=>{if(event==='SIGNED_OUT')showLogin();});
      const {data,error}=await client.auth.getSession();
      if(error)throw error;
      if(data.session)await enter(data.session);
    }catch(error){
      showLogin();
      if(!client){$('#login-submit').disabled=true;$('#setup-message').hidden=false;}
      message('#login-message',readable(error));
    }
  }
  init();
})();
