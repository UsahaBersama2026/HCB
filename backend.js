'use strict';

// Sambungan toko dan admin. Tidak ada kata sandi atau hak admin di file ini.
window.HCBBackend = (() => {
  const config = window.HCB_CONFIG || {};
  const url = String(config.supabaseUrl || '').trim().replace(/\/$/, '');
  const key = String(config.supabasePublishableKey || '').trim();
  const configured = Boolean(url || key);
  let client;
  function getClient() {
    if (client) return client;
    if (!url || !key) throw new Error('Sambungan toko belum lengkap. Periksa config.js.');
    let parsed;
    try { parsed = new URL(url); } catch { throw new Error('Alamat Supabase belum benar.'); }
    if (parsed.protocol !== 'https:' || parsed.pathname !== '/' || parsed.username || parsed.password || parsed.search || parsed.hash) throw new Error('Gunakan Project URL Supabase dengan HTTPS.');
    if (key.startsWith('sb_secret_')) throw new Error('Gunakan publishable key, bukan secret key.');
    if (!key.startsWith('sb_publishable_')) {
      let claims;
      try { claims = JSON.parse(atob(key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); } catch { throw new Error('Gunakan publishable key atau anon key Supabase.'); }
      if (claims.role !== 'anon') throw new Error('Kunci server tidak boleh digunakan di browser.');
    }
    if (!window.supabase?.createClient) throw new Error('File pendukung login belum termuat. Muat ulang halaman.');
    client = window.supabase.createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'hcb-admin-session-v1' },
    });
    return client;
  }
  function product(row) {
    return { ...row, price: row.price === null ? null : Number(row.price), priceType: row.price_type, sortOrder: row.sort_order };
  }
  function settings(row) {
    return { name: row.name, whatsapp: row.whatsapp, address: row.address, hours: row.hours,
      announcement: row.announcement, heroTitle: row.hero_title, heroDescription: row.hero_description, about: row.about };
  }
  async function loadCatalog() {
    const db = getClient();
    const signal = AbortSignal.timeout(15000);
    const [store, items] = await Promise.all([
      db.from('hcb_settings').select('*').eq('id', 1).single().abortSignal(signal),
      db.from('hcb_products').select('*').eq('active', true).order('sort_order').order('name').abortSignal(signal),
    ]);
    if (store.error || items.error) throw new Error('Katalog online belum dapat dimuat. Coba muat ulang halaman.');
    if (!store.data || !Array.isArray(items.data)) throw new Error('Data toko belum tersedia.');
    return { settings: settings(store.data), products: items.data.map(product) };
  }
  async function requireAdmin() {
    const db = getClient();
    const { data, error } = await db.rpc('hcb_is_admin');
    if (error) throw new Error('Akses admin belum dapat diperiksa. Coba lagi.');
    if (data !== true) throw new Error('Akun ini belum diberi akses admin Toko HCB.');
    return db;
  }
  function safeImage(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    if (/^assets\/foto\/[a-zA-Z0-9_.-]+\.(?:png|jpe?g|webp)$/i.test(text)) return text;
    try { const parsed = new URL(text); if (parsed.protocol === 'https:' && !parsed.username && !parsed.password) return text; } catch {}
    throw new Error('Foto harus berada di assets/foto/ atau memakai alamat HTTPS.');
  }
  return Object.freeze({ configured, getClient, loadCatalog, requireAdmin, product, settings, safeImage });
})();
