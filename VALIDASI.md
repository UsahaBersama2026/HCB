# Hasil pemeriksaan Toko HCB

Diperiksa pada 30 September 2026. Kode siap untuk konfigurasi dan uji layanan
milik pemilik toko. **Belum diunggah ke GitHub atau diaktifkan pada Supabase.**

## Pemeriksaan yang berhasil

- JavaScript toko, sambungan data, dan admin lolos pemeriksaan sintaks.
- Toko terbuka langsung dari `index.html` tanpa instalasi paket: 18 produk,
  foto asli, pencarian, kategori, detail produk, jumlah, keranjang, dan
  ringkasan pesanan bekerja.
- Tanpa konfigurasi layanan, halaman admin menjelaskan bahwa aktivasi belum
  dilakukan dan tombol masuk dinonaktifkan.
- Alur email/kata sandi salah dan akun tanpa izin tidak membuka dashboard.
  Akun pengelola yang diizinkan dapat masuk dan memulihkan sesi setelah reload.
- Tambah, edit, hapus, status tampil produk, unggah foto, serta perubahan
  informasi toko bekerja pada pemeriksaan antarmuka. Nomor WhatsApp awalan 08
  diubah ke 62; ringkasan pesanan menghasilkan tautan dengan nomor tersebut.
- Produk tersembunyi tidak ditampilkan pada katalog pengunjung. Katalog online
  yang gagal dimuat menampilkan pesan kegagalan tanpa mengganti harga dengan
  data awal yang mungkin sudah kedaluwarsa.
- Perubahan memakai nomor revisi: penyimpanan dari salinan lama ditolak agar
  tidak menimpa data baru. Keluar dari akun membersihkan data editor.
- Aturan database menolak perubahan oleh pengunjung dan akun biasa,
  termasuk upaya menambahkan dirinya sendiri sebagai admin. Hanya pengelola
  yang diizinkan dapat mengubah produk, informasi toko, dan objek foto.
- Database menolak harga, alamat tautan, data pemotongan foto, dan nomor
  WhatsApp yang tidak sesuai batasan. Menjalankan seed kembali tidak
  menggandakan produk atau menimpa perubahan yang sudah ada.
- Tampilan toko, admin, dan editor diperiksa pada ukuran komputer 1280 × 900
  serta ponsel 390 × 844. Tidak ada luapan halaman ke samping. Screenshot
  admin dan editor ditinjau secara visual.
- Seluruh 22 aset foto/logo sama dengan file sumber. Arsip ZIP diperiksa
  kelengkapannya dan integritas isinya.

## Cara pengujian dan batasnya

Antarmuka diuji memakai Chromium 153.0.8010.0 dan SDK resmi Supabase 2.117.2.
Respons HTTP autentikasi, data, dan unggahan foto disimulasikan untuk menguji
perilaku browser; tidak ada akun atau pesanan sungguhan dibuat.

SQL dijalankan di PostgreSQL melalui PGlite 0.5.8. Peran pengguna, `auth.uid()`,
serta struktur tabel Storage Supabase disimulasikan. Tujuh kelompok uji SQL
dan sepuluh kelompok uji browser berhasil. Tidak ada galat JavaScript browser
yang tidak tertangani dalam pengujian tersebut.

Pemeriksaan ini belum menggantikan pengujian layanan Supabase sebenarnya.
Sesudah konfigurasi, pemilik perlu memeriksa login dengan akun miliknya,
akses pengunjung, simpan perubahan, unggah foto, dan keluar dari akun pada
alamat hosting yang dipilih. Hosting, kuota, pengiriman email pemulihan,
cadangan database, dan pemeliharaan akun tetap dikelola pemilik layanan.

Ikuti **Aktivasi admin — satu kali** pada `README.md`.
