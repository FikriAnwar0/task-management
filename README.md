
# 🧩 TaskEasy – Task Management Web App with XP Practices

# -- preview gambar website --
![image](https://github.com/user-attachments/assets/6017ec44-2d63-4cda-85f6-d52e4dab5c18)

🌐 [Preview Live App](https://task-management-dusky-sigma.vercel.app/)

## 📌 Deskripsi Proyek

**TaskEasy** adalah aplikasi web manajemen tugas yang dikembangkan dalam waktu 1 minggu oleh tim mahasiswa dengan menerapkan praktik **Extreme Programming (XP)** secara menyeluruh. Proyek ini meniru situasi nyata di mana sebuah startup kecil membutuhkan prototipe sistem pengelolaan tugas yang sederhana, namun fleksibel, untuk membantu tim mengelola pekerjaan mereka secara efisien.

Aplikasi ini memungkinkan pengguna untuk:
- Membuat tugas baru dengan judul, deskripsi, prioritas (rendah, sedang, tinggi), dan status (to-do, in-progress, done).
- Melihat daftar semua tugas, yang disortir berdasarkan prioritas.
- Mengedit atau menghapus tugas yang ada.
- Menyimpan data secara lokal atau dengan backend ringan.
- Menyaring tugas secara cepat berdasarkan status atau prioritas.

---

## 👥 Tim Pengembang

| Nama | Peran | Fokus |
|------|-------|-------|
| Fikri Anwar | Developer A (Driver) | Formulir penambahan tugas (TaskForm.tsx) |
| Nickolas | Developer B (Navigator) | Tampilan kartu tugas (TaskCard.tsx) |
| Mikael | Customer | Feedback pengguna & prioritas fitur (StatsCards, QuickActions) |
| Ipaldi | XP Coach | CI, dokumentasi, dan penerapan praktik XP |

---

## 🛠️ Teknologi & Tools

- **Frontend**: React.js, Tailwind CSS
- **Backend (optional)**: JSON Server
- **Testing**: Jest
- **CI/CD**: GitHub Actions
- **Version Control**: Git
- **Deployment**: Vercel

---

## 📈 XP Practices yang Diterapkan

| Praktik XP | Implementasi |
|------------|--------------|
| ✅ Pair Programming | Setiap fitur dikerjakan oleh dua developer dengan rotasi peran (driver/navigator). |
| ✅ Test-Driven Development (TDD) | Unit test ditulis sebelum implementasi fitur menggunakan Jest. |
| ✅ Continuous Integration (CI) | Setiap commit memicu GitHub Actions untuk menjalankan test otomatis. |
| ✅ Small Releases | Fitur dirilis secara bertahap setiap hari (satu fitur per hari). |
| ✅ Refactoring | Kode dioptimasi dan dibersihkan secara berkala tanpa mengubah fungsionalitas. |
| ✅ Customer Collaboration | Mikael sebagai customer memberikan feedback harian untuk menentukan prioritas. |
| ✅ Planning Game | User stories dibuat bersama dan diprioritaskan berdasarkan nilai bisnis dan effort. |

---

## 🧾 User Stories & Estimasi

| No | User Story | Story Point |
|----|------------|-------------|
| 1 | Sebagai user, saya bisa membuat tugas dengan judul dan prioritas agar saya bisa mengatur pekerjaan saya. | 3 |
| 2 | Sebagai user, saya bisa melihat daftar tugas berdasarkan prioritas untuk membantu menentukan urgensi. | 2 |
| 3 | Sebagai user, saya bisa memperbarui status tugas agar saya tahu progresnya. | 2 |
| 4 | Sebagai user, saya bisa menghapus tugas agar daftar saya tetap bersih. | 1 |
| 5 | Sebagai user, saya bisa menyaring tugas berdasarkan status dan prioritas. | 2 |
| 6 | Sebagai user, saya bisa melihat ringkasan jumlah tugas per status. | 1 |
| 7 | Sebagai user, saya ingin tampilan aplikasi yang simpel dan menarik. | 1 |

**Total Story Point**: 12

---

## 💬 Feedback dari Customer (Mikael)

Berikut adalah umpan balik dari customer selama proses pengembangan:

- 💡 **Hari 1**: "Tampilan input tugas sudah bagus, tapi perlu validasi kalau ada input kosong."
- 💡 **Hari 2**: "Bisa ditambah visual untuk membedakan status tugas, misal warna hijau untuk 'done'."
- 💡 **Hari 3**: "Bagus! Tolong tambahkan statistik ringkasan agar saya tahu seberapa banyak tugas selesai."
- 💡 **Hari 4**: "Saya ingin cara cepat untuk filter tugas. Bisa pakai tombol Quick Filter?"
- 💡 **Hari 5**: "Semua fitur penting sudah masuk. Fokus ke penyempurnaan UI dan UX."

---

## 📅 Catatan Harian Standup

### 📖 Day 1
- Membagi peran dan user story.
- Membuat wireframe awal dan task planning.
- Fokus: Struktur awal project, TaskForm.

### 📖 Day 2
- Menyelesaikan TaskForm dan validasi input.
- Memulai komponen TaskCard dan logika status.

### 📖 Day 3
- Menambahkan fitur filter tugas.
- Mulai fitur statistik jumlah tugas per status.
- Review dari customer: bagus, tapi UX perlu ditingkatkan.

### 📖 Day 4
- Tambahan QuickActions untuk filter cepat.
- Refactor kode ke komponen yang lebih modular.
- CI setup selesai di GitHub Actions.

### 📖 Day 5
- Finalisasi desain dan styling.
- Menyelesaikan semua user story.
- Test akhir dan perbaikan minor berdasarkan feedback user.

---

## ✅ Hasil Akhir & Deliverables

- ✅ Aplikasi web berfungsi penuh – [TaskEasy Preview](https://task-management-dusky-sigma.vercel.app/)
- ✅ Repositori Git dengan commit history dan setup CI – lihat file `.github/workflows`
- ✅ Dokumentasi lengkap: user stories, feedback, log harian
- ✅ Unit test dengan Jest untuk tiap komponen utama
- ✅ Siap untuk presentasi demo 5 menit di kelas

---

## 🧠 Lessons Learned

### 🔑 Sukses Utama:
Implementasi **pair programming** sangat membantu dalam menyeimbangkan kualitas kode dan produktivitas, terutama saat menghadapi debugging.

### 🚧 Tantangan:
Menjaga **kecepatan pengembangan dengan TDD** ternyata cukup menantang, namun sangat berguna untuk menghindari bug di tahap akhir.

---

> Dibuat dengan semangat kolaborasi, komunikasi terbuka, dan prinsip XP untuk membangun solusi nyata yang bisa digunakan oleh tim sungguhan.
