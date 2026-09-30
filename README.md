# Toko HCB — Herbal Cageur Bageur

Toko HTML, CSS, dan JavaScript dengan 18 produk awal, logo, foto asli, pencarian,
keranjang, pemesanan WhatsApp, serta halaman admin untuk mengelola isinya.
Tidak memerlukan Node.js atau instalasi paket untuk dipakai.

**Status awal:** tampilan toko dapat dibuka langsung. Login admin baru aktif
setelah proyek Supabase, database, dan akun pengelola disiapkan. Tidak ada kata
sandi bawaan. Jangan memasukkan kata sandi ke file atau mengirimkannya di chat.

## Membuka toko

Ekstrak atau unduh seluruh file, kemudian buka `index.html`. Saat `config.js`
masih kosong, katalog menampilkan data awal dari `script.js`.

Setelah sambungan Supabase diisi, toko mengambil data online dan admin berada
di `admin.html`. Perubahan admin terlihat setelah pengunjung memuat ulang toko.
Gunakan HTTPS pada website yang dipublikasikan.

## Bagian utama

| File / folder | Isi |
| --- | --- |
| `assets/foto/` | Foto produk dan aset tambahan asli |
| `assets/logo/` | Logo HCB |
| `index.html`, `style.css`, `script.js` | Tampilan dan fungsi toko |
| `admin.html`, `admin.css`, `admin.js` | Login dan pengelolaan isi toko |
| `config.js`, `backend.js` | Sambungan Supabase |
| `vendor/` | SDK resmi Supabase 2.117.2 beserta lisensi; tidak memakai CDN saat dibuka |
| `supabase/001_hcb.sql` | Tabel, izin akses, dan tempat menyimpan foto |
| `supabase/002_seed.sql` | 18 produk awal dan informasi toko |

## Aktivasi admin — satu kali

1. Buat proyek di akun [Supabase](https://supabase.com/dashboard) milik Anda.
   Pilih paket sesuai kebutuhan dan periksa biaya/kuota di dashboard sebelum
   membuatnya. Situs tidak bergantung pada langganan GPT.
2. Buka **SQL Editor**. Jalankan isi `supabase/001_hcb.sql` sekali pada proyek
   untuk toko ini. Skrip berhenti jika tabel/bucket dengan nama yang sama sudah
   ada, sehingga tidak menghapus data lama.
3. Jalankan `supabase/002_seed.sql`. Skrip ini menambahkan data awal yang belum
   ada; perubahan pada produk yang sudah ada tetap dipertahankan.
4. Di **Authentication → Users**, buat akun pengelola dengan email dan kata
   sandi Anda sendiri. Simpan kata sandi secara pribadi. Gunakan kata sandi
   yang kuat dan unik. Anda bisa membuat pengguna dengan email terkonfirmasi
   melalui dashboard. Jika memilih konfirmasi email, selesaikan dahulu.
5. Salin **User UID** akun tersebut. Jalankan SQL berikut di SQL Editor,
   mengganti teks di dalam tanda kutip dengan UID yang benar:

   ```sql
   insert into public.hcb_admins (user_id)
   values ('GANTI-DENGAN-USER-UID-ADMIN')
   on conflict (user_id) do nothing;
   ```

   Daftar pengelola hanya bisa diubah dari dashboard/server tepercaya. Akun
   biasa yang berhasil masuk tetap tidak memiliki izin mengedit toko.
6. Di pengaturan autentikasi, matikan pendaftaran pengguna baru jika hanya
   akun pengelola yang diperlukan. Aplikasi ini tidak menyediakan pendaftaran.
7. Isi `config.js` dengan **Project URL** dan **publishable key** dari proyek
   Supabase tersebut. Anon key lama juga didukung. Jangan gunakan `secret key`
   atau `service_role`, karena kunci itu memiliki hak server.
8. Buka `admin.html`, masukkan email dan kata sandi pengelola tadi.
9. Buka tab **Informasi toko**, isi nomor WhatsApp toko, lalu simpan.

Aturan akses database wajib dipasang melalui langkah 2. Menyembunyikan tombol
admin tidak menggantikan aturan tersebut. Hak mengubah data diperiksa oleh
Supabase, bukan oleh kata sandi di JavaScript.

## Mengelola isi

- **Produk:** tambah, edit, hapus, ubah harga, kategori, urutan, dan status tampil.
- **Foto:** JPG, PNG, atau WebP, maksimal 5 MB. Foto yang diunggah ke penyimpanan
  katalog bersifat publik. Klik **Simpan produk** setelah memilih foto baru.
- **Informasi toko:** nama, WhatsApp, alamat, jam operasional, pengumuman,
  judul depan, dan deskripsi toko.
- **Harga:** harga awal berlabel acuan katalog GM yang diperiksa 28 September
  2026. Ganti ke harga jual toko setelah Anda menentukan harganya.
- **Perubahan dari dua tab:** bila data sudah berubah, admin meminta muat ulang
  agar perubahan lama tidak menimpa data terbaru.
- **Kata sandi terlupa:** kelola/reset akun melalui dashboard Supabase. Jika
  memakai email pemulihan, pengiriman email Supabase/SMTP perlu dikonfigurasi.

Foto baru langsung tersimpan sebagai aset publik. Menghapus produk atau
membatalkan editor tidak otomatis menghapus file foto, agar foto yang masih
digunakan tidak ikut hilang. File yang tidak dipakai dapat dibersihkan melalui
dashboard Storage setelah diperiksa.

## GitHub dan publikasi

Repositori tujuan: https://github.com/UsahaBersama2026/HCB

Untuk mengunggah tanpa terminal:

1. Ekstrak ZIP di komputer, lalu buka folder `Toko-HCB-Admin`.
2. Masuk ke GitHub dengan akun pemilik repositori tersebut.
3. Buka repositori, pilih **Add file → Upload files**. Jika repositori masih
   kosong, gunakan tautan **uploading an existing file** pada halaman awal.
4. Seret semua file dan folder di dalam `Toko-HCB-Admin` ke area unggah.
   Pastikan `index.html` berada langsung di halaman utama repositori.
5. Isi keterangan perubahan dan simpan melalui **Commit changes** atau
   **Propose changes**, sesuai pilihan cabang yang ditampilkan GitHub.
   Bila ada file lama, periksa perbedaannya sebelum menyimpan.

Panduan resmi unggah file:
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

GitHub menyimpan kode. Data yang diubah melalui admin berada di Supabase dan
tidak otomatis masuk ke GitHub; gunakan ekspor database dan salin file Storage
untuk cadangan data online.

Unggah folder utama situs ke layanan hosting statis yang mendukung penggunaan
komersial. Pilih pengaturan **tanpa build command**, dengan folder utama sebagai
publish directory. `index.html` dan `admin.html` harus berada di tingkat yang
sama dengan `config.js` dan folder `assets`.

GitHub Pages melarang penggunaan sebagai hosting gratis untuk toko online
yang terutama memfasilitasi transaksi komersial. Karena itu, gunakan repositori
GitHub untuk kode dan pilih hosting lain untuk menjalankan toko ini:
https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Pemeriksaan

Hasil pemeriksaan lokal tercantum di `VALIDASI.md`. Pemeriksaan produksi login,
penyimpanan foto, dan akses pengelola masih perlu dijalankan setelah proyek
Supabase milik Anda terhubung. Jangan menganggap admin sudah aktif hanya karena
file halaman login dapat dibuka.

## Rujukan teknis

- https://supabase.com/docs/guides/auth/passwords
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/storage/security/access-control
- https://supabase.com/docs/guides/getting-started/api-keys

Toko HCB adalah penjual produk. Pesanan disiapkan sebagai ringkasan untuk
WhatsApp; aplikasi ini tidak memproses pembayaran atau memastikan stok secara
otomatis. Keranjang hanya disimpan di browser pengunjung bila tersedia.
