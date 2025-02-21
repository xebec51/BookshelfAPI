# **Bookshelf API Project - Final Submission**

[![GitHub](https://img.shields.io/badge/GitHub-xebec51-blue?logo=github)](https://github.com/xebec51)  
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://raw.githubusercontent.com/xebec51/Submission-Membangun-Bookshelf-App---Dicoding-Indonesia/refs/heads/main/LICENSE)

---

## **Deskripsi Proyek**
Bookshelf API adalah proyek untuk membangun **API** yang digunakan untuk mengelola koleksi buku. API ini dapat digunakan untuk **menambahkan**, **memperbarui**, **menampilkan**, dan **menghapus** buku. Buku juga dapat disaring berdasarkan **nama**, **status sedang dibaca (reading)**, dan **status selesai dibaca (finished)**.

API ini dibangun menggunakan **Node.js** dan **Hapi.js**, dengan penyimpanan data dalam format **JSON**.

Proyek ini adalah **final submission** dari kelas **[Belajar Back-End Pemula dengan JavaScript](https://www.dicoding.com/academies/261/corridor)** di **[Dicoding Academy](https://www.dicoding.com/academies/261/corridor)**.

---

## **Fitur Utama**
1. **Menambahkan Buku Baru**
   - Menyimpan informasi buku dengan validasi pada input seperti nama buku dan jumlah halaman yang telah dibaca.

2. **Menampilkan Daftar Semua Buku**
   - Menampilkan daftar buku dengan informasi dasar seperti nama buku dan penerbit.

3. **Menampilkan Detail Buku Berdasarkan ID**
   - Menampilkan detail buku berdasarkan ID dengan validasi bahwa buku dengan ID tersebut ada.

4. **Memperbarui Buku Berdasarkan ID**
   - Memperbarui informasi buku seperti nama, penulis, jumlah halaman, dan status selesai dibaca.

5. **Menghapus Buku Berdasarkan ID**
   - Menghapus buku dari koleksi berdasarkan ID yang diberikan.

6. **Penyaringan Buku**
   - Menyaring buku berdasarkan nama, status sedang dibaca (reading), dan status selesai dibaca (finished).

---

## **Langkah Menjalankan Proyek**

### **Prasyarat**
Sebelum menjalankan proyek, pastikan bahwa Anda sudah menginstal software berikut:

- **Node.js** versi >= 18
- **npm** versi >= 8
- **Git** untuk mengelola repository

### **Langkah-Langkah**
1. Clone repository ini:
   ```bash
   git clone https://github.com/xebec51/Submission-Membangun-Bookshelf-App---Dicoding-Indonesia.git
   ```
   
2. Masuk ke folder proyek:
   ```bash
   cd "Submission-Membangun-Bookshelf-App---Dicoding-Indonesia"
   cd "Bookshelf API"
   ```
   
3. Instal semua dependensi:
   ```bash
   npm install
   ```
   
4. Jalankan server pengembangan:
   ```bash
   npm run start
   ```
   
5. Akses aplikasi API melalui:  
   [http://localhost:9000](http://localhost:9000)

---

## **Pengujian**
Pengujian API telah dilakukan menggunakan **Postman Collection** yang dapat diimpor untuk menguji semua endpoint API yang telah disediakan. Semua pengujian wajib telah berhasil dan sesuai dengan spesifikasi.

---

## **Teknologi Pendukung**
- **Node.js**: Untuk menjalankan API.
- **Hapi.js**: Framework untuk membangun server dan API.
- **ESLint**: Untuk memastikan konsistensi gaya penulisan kode.
- **Postman**: Untuk pengujian otomatis API.

---

## **Kontributor**
- **Muh. Rinaldi Ruslan**
  - **Email**: [rinaldi.ruslan51@gmail.com](mailto:rinaldi.ruslan51@gmail.com)
  - **GitHub**: [xebec51](https://github.com/xebec51)

---

## **Lisensi**
Proyek ini dilisensikan di bawah **MIT License**. Lihat file [LICENSE](https://raw.githubusercontent.com/xebec51/Submission-Membangun-Bookshelf-App---Dicoding-Indonesia/refs/heads/main/LICENSE) untuk informasi lebih lanjut.
