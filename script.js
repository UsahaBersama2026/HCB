'use strict';

/* ================================================================
   TOKO HCB — DATA AWAL UNTUK PRATINJAU LOKAL
   ================================================================
   Setelah config.js terhubung ke Supabase, isi toko dikelola melalui
   admin.html. Data di bawah hanya dipakai jika sambungan belum diaktifkan.

   1. Isi whatsapp dengan nomor toko, misalnya "6281234567890".
      Contoh nomor hanya petunjuk penulisan, bukan kontak toko.
      Nomor diawali 08 atau +62 akan dirapikan secara otomatis.
   2. Isi address dan hours jika ingin ditampilkan.
   3. Ubah nama, deskripsi, harga, dan foto di DATA_PRODUK.
   4. Simpan file (Ctrl+S), lalu muat ulang halaman browser (Ctrl+R).

   PETUNJUK DATA_PRODUK
   - id        : kode unik produk; jangan gunakan kode yang sama.
   - name      : nama yang tampil di katalog.
   - price     : angka tanpa titik, misalnya 300000; null = Tanya harga.
   - priceType : "reference" = harga acuan; "retail" = harga jual toko.
                 Harga saat ini adalah acuan katalog GM, 28 Sep 2026.
   - category  : "herbal", "minyak", "perawatan", atau "aksesori".
   - image     : lokasi foto, misalnya "assets/foto/foto-baru.jpg".
   - frame     : area tampilan foto asli. Ganti menjadi null bila Anda
                 memakai foto baru, agar foto tampil utuh.
   - active    : true = tampil; false = sembunyikan dari katalog.
   - sortOrder : urutan tampil; angka yang lebih kecil tampil dahulu.
   - source    : tautan informasi produk; null jika belum tersedia.

   Foto tambahan dapat disalin ke assets/foto/. Untuk menambah produk,
   salin satu objek di DATA_PRODUK, pisahkan dengan koma, lalu ubah id.
   Semua foto dan logo disertakan di folder assets.
   ================================================================ */

const PENGATURAN_TOKO = {
  "name": "Toko HCB — Herbal Cageur Bageur",
  "whatsapp": "",
  "address": "",
  "hours": "",
  "announcement": "Selamat datang di Toko HCB",
  "heroTitle": "Belanja herbal, di Toko HCB.",
  "heroDescription": "Jelajahi produk merek GM, dari kapsul, madu, dan teh hingga perawatan serta aksesori.",
  "about": "Toko HCB menjual produk herbal, perawatan, dan aksesori dari merek GM. Kami berfokus pada penjualan serta pelayanan pemesanan. Produk berasal dari merek atau produsen masing-masing; Toko HCB berperan sebagai penjual."
};

const DATA_PRODUK = [
  {
    "id": "a-kapsul",
    "name": "GM A Kapsul",
    "category": "herbal",
    "label": "Kapsul",
    "price": 300000,
    "description": "Produk herbal merek GM dalam bentuk kapsul.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/a-kapsul-salin/",
    "image": "assets/foto/customer-a-kapsul.jpg",
    "frame": {
      "size": [
        1080,
        1088
      ],
      "crop": [
        40,
        410,
        460,
        615
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 1,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "b-kapsul",
    "name": "GM B Kapsul",
    "category": "herbal",
    "label": "Kapsul",
    "price": 300000,
    "description": "Varian B dalam rangkaian kapsul herbal GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/b-kapsul/",
    "image": "assets/foto/customer-b-kapsul.jpg",
    "frame": {
      "size": [
        1080,
        1069
      ],
      "crop": [
        350,
        460,
        365,
        495
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 2,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "c-kapsul",
    "name": "GM C Kapsul",
    "category": "herbal",
    "label": "Kapsul",
    "price": 300000,
    "description": "Varian C dalam rangkaian kapsul herbal GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/c-kapsul/",
    "image": "assets/foto/customer-c-kapsul.jpg",
    "frame": {
      "size": [
        1080,
        958
      ],
      "crop": [
        15,
        370,
        450,
        580
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 3,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "gm-max",
    "name": "GM Max Kapsul",
    "category": "herbal",
    "label": "Kapsul",
    "price": 300000,
    "description": "Produk kapsul GM Max dalam kemasan kotak.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/gm-max-kapsul/",
    "image": "assets/foto/customer-gm-max.jpg",
    "frame": {
      "size": [
        1080,
        1077
      ],
      "crop": [
        382,
        488,
        316,
        493
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 4,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "rpgm",
    "name": "Madu RPGM",
    "category": "herbal",
    "label": "Madu",
    "price": 250000,
    "description": "Produk madu RPGM dalam kemasan botol.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/rpgm/",
    "image": "assets/foto/customer-rpgm.jpg",
    "frame": {
      "size": [
        1080,
        1024
      ],
      "crop": [
        530,
        185,
        528,
        720
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 5,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "gm-oil",
    "name": "GM Oil",
    "category": "minyak",
    "label": "Minyak",
    "price": 250000,
    "description": "Minyak oles merek GM untuk pemakaian luar.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/gm-oil/",
    "image": "assets/foto/customer-gm-oil.jpg",
    "frame": {
      "size": [
        522,
        816
      ],
      "crop": [
        106,
        175,
        310,
        300
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 6,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "c-powder",
    "name": "C Powder GM",
    "category": "herbal",
    "label": "Serbuk",
    "price": 250000,
    "description": "Produk herbal serbuk C Powder merek GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/c-powder/",
    "image": "assets/foto/customer-c-powder.jpg",
    "frame": {
      "size": [
        720,
        1280
      ],
      "crop": [
        55,
        290,
        610,
        419
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 7,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "teh-bmt",
    "name": "Teh Hijau BMT GM",
    "category": "herbal",
    "label": "Teh",
    "price": 150000,
    "description": "Teh hijau BMT GM dalam kemasan pouch.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/teh-hijau-bmt/",
    "image": "assets/foto/customer-teh-bmt.jpg",
    "frame": {
      "size": [
        522,
        816
      ],
      "crop": [
        80,
        178,
        360,
        335
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 8,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "gurah-tht",
    "name": "Gurah THT GM",
    "category": "perawatan",
    "label": "Perawatan",
    "price": 200000,
    "description": "Varian perawatan THT dari rangkaian produk GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/gurah-tht-gm/",
    "image": "assets/foto/gurah-tht.png",
    "frame": {
      "size": [
        500,
        500
      ],
      "crop": [
        128,
        65,
        242,
        385
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 9,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "vitamax",
    "name": "Vitamax GM",
    "category": "herbal",
    "label": "Herbal",
    "price": 200000,
    "description": "Varian Vitamax dalam rangkaian herbal GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/vitamax-gm/",
    "image": "assets/foto/vitamax.png",
    "frame": {
      "size": [
        454,
        449
      ],
      "crop": [
        188,
        286,
        210,
        138
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 10,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "spoon",
    "name": "Spoon GM",
    "category": "perawatan",
    "label": "Alat pijat",
    "price": 200000,
    "description": "Alat bantu pijat berbahan kuningan dari GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/spoon-gm/",
    "image": "assets/foto/spoon.png",
    "frame": {
      "size": [
        640,
        640
      ],
      "crop": [
        368,
        355,
        180,
        170
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 11,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "godogan",
    "name": "Godogan GM",
    "category": "herbal",
    "label": "Ramuan luar",
    "price": 250000,
    "description": "Ramuan rempah GM untuk pemakaian luar.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/godogan-gm/",
    "image": "assets/foto/godogan.png",
    "frame": {
      "size": [
        720,
        720
      ],
      "crop": [
        76,
        202,
        280,
        335
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 12,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "hexa",
    "name": "Hexa GM",
    "category": "herbal",
    "label": "Air mineral",
    "unit": "dus",
    "price": 300000,
    "description": "Air mineral dalam botol. Harga acuan per dus.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/hexa-gm/",
    "image": "assets/foto/hexa.png",
    "frame": {
      "size": [
        720,
        720
      ],
      "crop": [
        80,
        162,
        270,
        488
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 13,
    "brand": "GM"
  },
  {
    "id": "gms-2",
    "name": "GMS 2",
    "category": "herbal",
    "label": "Minuman",
    "price": 250000,
    "description": "Minuman herbal dalam botol dari rangkaian GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/gms-2/",
    "image": "assets/foto/gms-2.png",
    "frame": {
      "size": [
        720,
        720
      ],
      "crop": [
        98,
        158,
        228,
        382
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 14,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "skincare",
    "name": "Skincare GM",
    "category": "perawatan",
    "label": "Skincare",
    "price": 450000,
    "description": "Rangkaian produk perawatan kulit merek GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/skincare-gm/",
    "image": "assets/foto/skincare.png",
    "frame": {
      "size": [
        640,
        640
      ],
      "crop": [
        0,
        0,
        640,
        548
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 15,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "gm-feeling",
    "name": "GM Feeling",
    "category": "perawatan",
    "label": "Perawatan",
    "price": null,
    "description": "Produk perawatan kulit GM dalam kemasan pot.",
    "source": null,
    "image": "assets/foto/customer-gm-feeling.jpg",
    "frame": {
      "size": [
        813,
        1280
      ],
      "crop": [
        500,
        1120,
        300,
        160
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 16,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "magic-ring",
    "name": "Magic Ring GM",
    "category": "aksesori",
    "label": "Aksesori",
    "price": 250000,
    "description": "Aksesori berbentuk cincin dari rangkaian GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/magic-ring-gm/",
    "image": "assets/foto/customer-magic-ring.jpg",
    "frame": {
      "size": [
        720,
        720
      ],
      "crop": [
        270,
        175,
        450,
        440
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 17,
    "unit": "",
    "brand": "GM"
  },
  {
    "id": "energy-pendan",
    "name": "Energy Pendan GM",
    "category": "aksesori",
    "label": "Aksesori",
    "price": null,
    "description": "Aksesori kalung GM dengan liontin dan tali.",
    "source": null,
    "image": "assets/foto/customer-energy-pendan.jpg",
    "frame": {
      "size": [
        1080,
        1058
      ],
      "crop": [
        15,
        50,
        620,
        685
      ]
    },
    "active": true,
    "priceType": "reference",
    "sortOrder": 18,
    "unit": "",
    "brand": "GM"
  }
];

/* ================================================================
   FUNGSI TOKO — tidak perlu diubah untuk mengatur isi katalog.
   ================================================================ */

function normalizeWhatsApp(value) {
  let phone = String(value || '').replace(/[^0-9]/g, '');
  if (phone.startsWith('0')) phone = '62' + phone.slice(1);
  return /^\d{10,15}$/.test(phone) ? phone : '';
}
async function startStorefront() {
  let catalog = { settings: PENGATURAN_TOKO, products: DATA_PRODUK };
  if (window.HCBBackend?.configured) {
    document.querySelector('#results-count').textContent = 'Memuat katalog…';
    catalog = await window.HCBBackend.loadCatalog();
  }
  const STORE = { ...catalog.settings, whatsapp: normalizeWhatsApp(catalog.settings.whatsapp) };
  const PRODUCTS = catalog.products.filter(product => product.active !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const money = value => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const $ = selector => document.querySelector(selector);
const PRODUCT_MAP = new Map(PRODUCTS.map(p => [p.id, p]));
function productPhoto(p, lazy = true) {
  if (!p.image) return `<span class="photo-stage no-product-photo">${icon('bag')}<span>Foto belum tersedia</span></span>`;
  if (!p.frame) return `<span class="photo-stage"><img class="uploaded-product-photo" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" ${lazy ? 'loading="lazy"' : ''}></span>`;
  const { size: [originalWidth, originalHeight], crop: [x, y, width, height] } = p.frame;
  const ratio = width / height;
  const style = `--photo-ratio:${ratio};--photo-width:${Math.min(.92, .92 * ratio) * 100}%;--image-width:${originalWidth / width * 100}%;--image-left:${-x / width * 100}%;--image-top:${-y / height * 100}%`;
  return `<span class="photo-stage"><span class="product-photo" style="${style}"><img src="${escapeHtml(p.image)}" alt="Foto ${escapeHtml(p.name)}" width="${originalWidth}" height="${originalHeight}" ${lazy ? 'loading="lazy"' : ''}></span></span>`;
}
function hasPrice(p) { return Number.isFinite(p.price) && p.price > 0; }
function priceLabel(p) { return hasPrice(p) ? `${money(p.price)}${p.unit ? `<span class="price-unit"> / ${escapeHtml(p.unit)}</span>` : ''}` : '<span class="price-on-request">Tanya harga</span>'; }
function renderSpotlight() {
  const selected = ['a-kapsul', 'rpgm'].map(id => PRODUCT_MAP.get(id)).filter(Boolean);
  for (const product of PRODUCTS) if (selected.length < 2 && !selected.some(p => p.id === product.id)) selected.push(product);
  $('#store-spotlight').innerHTML = selected.slice(0, 2).map(p => `<button class="spotlight-product" data-detail="${p.id}" aria-label="Lihat ${escapeHtml(p.name)}"><span class="spotlight-image">${productPhoto(p, false)}</span><span class="spotlight-brand">${escapeHtml(p.brand)}</span><span class="spotlight-name">${escapeHtml(p.name)}</span><span class="spotlight-link">Lihat produk ${icon('arrow')}</span></button>`).join('');
}
const storageKey = 'hcb-simple-cart-v1';
let cart = {};
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
    for (const [id, qty] of Object.entries(saved)) {
      if (PRODUCT_MAP.has(id) && Number.isInteger(qty) && qty > 0 && qty <= 99) cart[id] = qty;
    }
  }
} catch { /* Storage can be unavailable; the in-memory cart remains usable. */ }
let category = 'all';
let search = '';
let sort = 'featured';
let detailProduct = null;
let detailQuantity = 1;
let cartView = 'cart';
let toastTimer;
let restoreDialogFocus = null;

function visibleProducts() {
  const query = search.toLocaleLowerCase('id-ID').trim();
  const list = PRODUCTS.filter(p => (category === 'all' || p.category === category) && `${p.name} ${p.label} ${p.description}`.toLocaleLowerCase('id-ID').includes(query));
  if (sort === 'price-asc') list.sort((a, b) => hasPrice(a) && hasPrice(b) ? a.price - b.price : hasPrice(a) ? -1 : hasPrice(b) ? 1 : 0);
  if (sort === 'price-desc') list.sort((a, b) => hasPrice(a) && hasPrice(b) ? b.price - a.price : hasPrice(a) ? -1 : hasPrice(b) ? 1 : 0);
  if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'id'));
  return list;
}

function renderProducts() {
  const list = visibleProducts();
  $('#product-grid').innerHTML = list.map(p => `<article class="product-card">
    <button class="product-image-button" data-detail="${p.id}" aria-label="Lihat detail ${escapeHtml(p.name)}"><span class="product-category">${escapeHtml(p.label)}</span>${productPhoto(p)}<span class="product-view">${icon('arrow')}</span></button>
    <div class="product-info"><div class="product-line"><h3><button class="product-title-button" data-detail="${p.id}">${escapeHtml(p.name)}</button></h3><span class="product-series">${escapeHtml(p.brand)}</span></div><p class="product-description">${escapeHtml(p.description)}</p><div class="product-bottom"><span class="product-price">${priceLabel(p)}${hasPrice(p) ? `<small class="card-price-type">${p.priceType === 'retail' ? 'Harga jual toko' : 'Harga acuan'}</small>` : ''}</span><button class="add-button" data-add="${p.id}" aria-label="Tambah ${escapeHtml(p.name)} ke keranjang">${icon('plus')}</button></div></div>
  </article>`).join('');
  $('#results-count').textContent = `Menampilkan ${list.length} produk`;
  $('#empty-results').hidden = list.length !== 0;
  $('#product-grid').hidden = list.length === 0;
  document.querySelectorAll('.filter').forEach(button => {
    const active = button.dataset.category === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function cartEntries() { return PRODUCTS.filter(p => cart[p.id]).map(p => ({ ...p, quantity: cart[p.id], total: hasPrice(p) ? p.price * cart[p.id] : null })); }
function cartTotal() { return cartEntries().reduce((sum, p) => sum + (p.total ?? 0), 0); }
function pendingPrices() { return cartEntries().filter(p => !hasPrice(p)); }
function cartEstimate() { return cartEntries().some(hasPrice) ? cartTotal() : null; }
function totalDisplay() { return cartEstimate() === null ? 'Tanya harga' : money(cartTotal()); }
function cartCount() { return Object.values(cart).reduce((sum, qty) => sum + qty, 0); }
function saveCart() {
  try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch { /* Device storage is optional. */ }
  const count = cartCount();
  $('#cart-count').textContent = count;
  $('#open-cart').setAttribute('aria-label', `Buka keranjang, ${count} produk`);
}
function showToast(message, showCart = true) {
  clearTimeout(toastTimer);
  $('#toast-text').textContent = message;
  $('#toast-cart').hidden = !showCart;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 3800);
}
function addToCart(id, quantity = 1, announce = true) {
  if (!PRODUCT_MAP.has(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new Error('Produk atau jumlah tidak valid.');
  const next = (cart[id] || 0) + quantity;
  if (next > 99) { if (announce) showToast('Maksimal 99 buah untuk setiap produk.', false); throw new Error('Jumlah melebihi 99 buah.'); }
  cart[id] = next;
  saveCart();
  if ($('#cart-dialog').open) renderCart();
  if (announce) showToast(`${PRODUCT_MAP.get(id).name} ditambahkan`);
  return { id, quantity: cart[id], cartCount: cartCount(), estimatedTotal: cartEstimate(), pricesComplete: pendingPrices().length === 0 };
}
function openDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog.open) return;
  document.querySelectorAll('dialog[open]').forEach(other => other.close());
  restoreDialogFocus = document.activeElement;
  document.body.classList.add('modal-open');
  dialog.showModal();
}
function closeDialog(id) { document.getElementById(id).close(); }
function showProduct(id) {
  const p = PRODUCT_MAP.get(id);
  if (!p) throw new Error('Produk tidak ditemukan.');
  detailProduct = p;
  detailQuantity = 1;
  $('#product-detail').innerHTML = `<div class="detail-layout"><div class="detail-image">${productPhoto(p, false)}</div><div class="detail-copy"><div class="eyebrow">${escapeHtml(p.label)} · ${escapeHtml(p.brand)}</div><h2 id="detail-title">${escapeHtml(p.name)}</h2><p class="detail-description">${escapeHtml(p.description)}</p><p class="detail-price">${priceLabel(p)}</p><span class="reference-label">${hasPrice(p) ? (p.priceType === 'retail' ? 'Harga jual toko' : 'Harga acuan, perlu konfirmasi') : 'Harga dan varian perlu dikonfirmasi'}</span><div class="detail-controls"><div class="quantity-control"><button id="detail-minus" aria-label="Kurangi jumlah" disabled>${icon('minus')}</button><output id="detail-quantity" aria-label="Jumlah produk">1</output><button id="detail-plus" aria-label="Tambah jumlah">${icon('plus')}</button></div><button class="button primary" id="detail-add">${icon('bag')} Tambah</button></div><p class="detail-note">Dijual oleh Toko HCB. Konfirmasikan harga, varian kemasan, dan ketersediaan sebelum memesan.</p>${p.source ? `<a class="detail-source" href="${escapeHtml(p.source)}" target="_blank" rel="noopener noreferrer">Informasi produk ↗</a>` : ''}</div></div>`;
  openDialog('product-dialog');
}
function openCart() { cartView = 'cart'; renderCart(); openDialog('cart-dialog'); $('#toast').hidden = true; }
function orderText() {
  const lines = cartEntries().map((p, i) => `${i + 1}. ${p.name}\n   ${p.quantity}${p.unit ? ` ${p.unit}` : ' unit'}${hasPrice(p) ? ` × ${money(p.price)} = ${money(p.total)}` : ' — mohon info harga'}`);
  const pending = pendingPrices();
  const summary = cartEstimate() === null ? 'Total belum dapat dihitung: harga produk perlu dikonfirmasi.' : `${pending.length ? 'Subtotal sementara (produk yang sudah memiliki harga)' : 'Perkiraan total'}: ${money(cartTotal())}`;
  return `Halo ${STORE.name},\nSaya ingin menanyakan pesanan berikut:\n\n${lines.join('\n\n')}\n\n${summary}${pending.length && cartEstimate() !== null ? `\nBelum termasuk ${pending.length} jenis produk yang masih perlu konfirmasi harga.` : ''}\nHarga belum termasuk ongkir. Produk berlabel harga acuan perlu dikonfirmasi.\n\nMohon konfirmasi harga jual Toko HCB, varian kemasan, dan ketersediaan produknya. Terima kasih.`;
}
function renderCart() {
  const entries = cartEntries();
  if (!entries.length) {
    cartView = 'cart';
    $('#cart-content').innerHTML = `<div class="empty-cart">${icon('bag')}<h3>Pilihan baik dimulai di sini.</h3><p>Keranjang Anda masih kosong.<br>Pilih produk yang ingin Anda beli di Toko HCB.</p><button class="button primary" id="continue-shopping">Jelajahi produk ${icon('arrow')}</button></div>`;
    return;
  }
  if (cartView === 'review') {
    const phone = typeof STORE.whatsapp === 'string' && /^\d{10,15}$/.test(STORE.whatsapp) ? STORE.whatsapp : null;
    $('#cart-content').innerHTML = `<div class="order-review"><button class="order-back" id="back-to-cart">${icon('arrow')} Kembali ke keranjang</button><h3>Ringkasan pesanan</h3><p>Periksa daftar produk Anda sebelum membagikannya.</p><textarea id="order-text" readonly aria-label="Ringkasan pesanan"></textarea><div class="order-status">${icon('info')}<span>${phone ? 'Harga akhir dan ketersediaan akan dikonfirmasi oleh Toko HCB melalui WhatsApp.' : 'Pemesanan langsung belum tersedia. Ringkasan ini belum dikirim dan belum menjadi pesanan terkonfirmasi.'}</span></div>${phone ? `<a class="button primary" id="send-whatsapp" target="_blank" rel="noopener noreferrer">Lanjut ke WhatsApp ${icon('arrow')}</a>` : `<button class="button primary" id="copy-order">${icon('copy')} Salin pesanan</button>`}</div>`;
    $('#order-text').value = orderText();
    if (phone) $('#send-whatsapp').href = `https://wa.me/${phone}?text=${encodeURIComponent(orderText())}`;
    return;
  }
  $('#cart-content').innerHTML = `<div class="cart-items">${entries.map(p => `<article class="cart-item"><div class="cart-item-image">${productPhoto(p, false)}</div><div><div class="cart-item-top"><h3>${escapeHtml(p.name)}</h3><button class="remove-item" data-remove="${p.id}" aria-label="Hapus ${escapeHtml(p.name)}">${icon('trash')}</button></div><p class="cart-item-price">${priceLabel(p)}</p><div class="cart-item-bottom"><div class="quantity-control"><button data-qty="${p.id}" data-delta="-1" aria-label="Kurangi jumlah ${escapeHtml(p.name)}" ${p.quantity === 1 ? 'disabled' : ''}>${icon('minus')}</button><output aria-label="Jumlah ${escapeHtml(p.name)}">${p.quantity}</output><button data-qty="${p.id}" data-delta="1" aria-label="Tambah jumlah ${escapeHtml(p.name)}" ${p.quantity === 99 ? 'disabled' : ''}>${icon('plus')}</button></div><span class="cart-line-total">${hasPrice(p) ? money(p.total) : 'Tanya harga'}</span></div></div></article>`).join('')}</div><div class="cart-summary"><div class="subtotal-row"><span>${pendingPrices().length ? 'Subtotal sementara' : 'Perkiraan total'}</span><strong>${totalDisplay()}</strong></div><p class="summary-note">${pendingPrices().length ? `${pendingPrices().length} jenis produk belum memiliki harga dan belum masuk subtotal. ` : ''}Harga belum termasuk ongkir. Produk berlabel harga acuan perlu dikonfirmasi. Konfirmasikan harga akhir, varian, dan ketersediaan ke Toko HCB.</p><button class="button primary" id="prepare-order">Siapkan pesanan ${icon('arrow')}</button><p class="cart-storage">Keranjang tersimpan di browser ini jika penyimpanan tersedia.</p></div>`;
}

document.addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.dataset.detail) showProduct(button.dataset.detail);
  else if (button.dataset.add) { try { addToCart(button.dataset.add); } catch { /* Limit already announced. */ } }
  else if (button.dataset.close) closeDialog(button.dataset.close);
  else if (button.dataset.category) { category = button.dataset.category; renderProducts(); }
  else if (button.dataset.qty) {
    const id = button.dataset.qty;
    const qty = cart[id] + Number(button.dataset.delta);
    if (qty >= 1 && qty <= 99) {
      cart[id] = qty; saveCart(); renderCart();
      const replacement = [...document.querySelectorAll('[data-qty]')].find(el => el.dataset.qty === id && el.dataset.delta === button.dataset.delta && !el.disabled);
      (replacement || document.querySelector(`[data-remove="${id}"]`))?.focus();
    }
  } else if (button.dataset.remove) {
    delete cart[button.dataset.remove]; saveCart(); renderCart();
    ($('#cart-content button') || $('[data-close="cart-dialog"]')).focus();
  } else if (button.id === 'open-cart' || button.id === 'toast-cart') openCart();
  else if (button.id === 'search-shortcut') { $('#produk').scrollIntoView({ behavior: 'smooth' }); $('#product-search').focus({ preventScroll: true }); }
  else if (button.id === 'reset-search') { category = 'all'; search = ''; sort = 'featured'; $('#product-search').value = ''; $('#product-sort').value = 'featured'; renderProducts(); $('#product-search').focus(); }
  else if (button.id === 'detail-minus' || button.id === 'detail-plus') {
    detailQuantity = Math.max(1, Math.min(99, detailQuantity + (button.id === 'detail-plus' ? 1 : -1)));
    $('#detail-quantity').textContent = detailQuantity; $('#detail-minus').disabled = detailQuantity === 1; $('#detail-plus').disabled = detailQuantity === 99;
  } else if (button.id === 'detail-add') {
    try { addToCart(detailProduct.id, detailQuantity); closeDialog('product-dialog'); } catch {
      const note = $('#product-detail .detail-note');
      note.setAttribute('role', 'status');
      note.textContent = 'Maksimal 99 unit produk di keranjang. Kurangi jumlah pilihan Anda.';
    }
  } else if (button.id === 'continue-shopping') { closeDialog('cart-dialog'); $('#produk').scrollIntoView({ behavior: 'smooth' }); }
  else if (button.id === 'prepare-order') { cartView = 'review'; renderCart(); $('#back-to-cart').focus(); }
  else if (button.id === 'back-to-cart') { cartView = 'cart'; renderCart(); $('#prepare-order').focus(); }
  else if (button.id === 'copy-order') {
    try {
      await navigator.clipboard.writeText(orderText());
      button.innerHTML = `${icon('check')} Pesanan disalin`;
    } catch {
      $('#order-text').focus(); $('#order-text').select();
      button.textContent = 'Teks dipilih — salin secara manual';
    }
  }
});
$('#product-search').addEventListener('input', event => { search = event.target.value; renderProducts(); });
$('#product-sort').addEventListener('change', event => { sort = event.target.value; renderProducts(); });
document.addEventListener('keydown', event => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !document.querySelector('dialog[open]')) {
    event.preventDefault(); $('#produk').scrollIntoView({ behavior: 'smooth' }); $('#product-search').focus({ preventScroll: true });
  }
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) { document.body.classList.remove('modal-open'); if (restoreDialogFocus?.isConnected) restoreDialogFocus.focus(); }
  });
});
window.addEventListener('storage', event => {
  if (event.key !== storageKey) return;
  try {
    const next = JSON.parse(event.newValue || '{}');
    if (!next || typeof next !== 'object' || Array.isArray(next)) return;
    cart = {};
    for (const [id, qty] of Object.entries(next)) if (PRODUCT_MAP.has(id) && Number.isInteger(qty) && qty > 0 && qty <= 99) cart[id] = qty;
    saveCart(); if ($('#cart-dialog').open) renderCart();
  } catch { /* Ignore malformed device-local data. */ }
});
function applyStoreSettings() {
  document.title = STORE.name;
  $('#announcement-text').textContent = STORE.announcement;
  $('.announcement').hidden = !STORE.announcement;
  if (STORE.heroTitle !== 'Belanja herbal, di Toko HCB.') $('#hero-title').textContent = STORE.heroTitle;
  $('#hero-description').textContent = STORE.heroDescription;
  $('#about-name').textContent = STORE.name;
  $('#about-description').textContent = STORE.about;
  $('#footer-name').textContent = `© ${new Date().getFullYear()} ${STORE.name}`;
  $('#collection-count').textContent = `${PRODUCTS.length} pilihan produk di toko`;
  $('.filter[data-category="all"] span').textContent = PRODUCTS.length;
  $('#store-address').textContent = STORE.address;
  $('#store-address-line').hidden = !STORE.address;
  $('#store-hours').textContent = STORE.hours;
  $('#store-hours-line').hidden = !STORE.hours;
  $('#store-contact').hidden = !STORE.address && !STORE.hours && !STORE.whatsapp;
  $('#store-whatsapp').hidden = !STORE.whatsapp;
  if (STORE.whatsapp) $('#store-whatsapp').href = `https://wa.me/${STORE.whatsapp}`;
  const references = PRODUCTS.some(p => hasPrice(p) && p.priceType === 'reference');
  $('#price-overview').textContent = references ? 'Perhatikan label harga setiap produk' : 'Harga jual Toko HCB';
  $('#price-note').textContent = references ? 'Produk berlabel “Harga acuan” menggunakan referensi katalog GM yang diperiksa 28 September 2026. Konfirmasikan harga akhir, varian, dan ketersediaan sebelum memesan. Produk tanpa harga ditandai “Tanya harga”.' : 'Harga belum termasuk ongkir. Konfirmasikan varian dan ketersediaan sebelum memesan. Produk tanpa harga ditandai “Tanya harga”.';
}
applyStoreSettings();
renderProducts();
renderSpotlight();
saveCart();


}
startStorefront().catch(() => {
  document.querySelector('#results-count').textContent = 'Katalog belum dapat dimuat';
  const warning = document.querySelector('#catalog-error');
  warning.hidden = false;
  warning.textContent = 'Katalog online belum dapat dimuat. Periksa koneksi, lalu muat ulang halaman.';
  document.querySelector('#open-cart').disabled = true;
});
