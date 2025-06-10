<h1 align="center">🚀 TaskEasy – XP-Based Task Management App</h1>

<p align="center">
  <img src="https://github.com/user-attachments/assets/6017ec44-2d63-4cda-85f6-d52e4dab5c18" alt="TaskEasy Preview" width="80%" />
</p>

<p align="center">
  🔗 <a href="https://task-management-dusky-sigma.vercel.app/">🌐 Live Preview: task-management-dusky-sigma.vercel.app</a>
</p>

---

## 📝 Deskripsi Proyek

**TaskEasy** adalah aplikasi manajemen tugas berbasis web yang dikembangkan dalam waktu 1 minggu dengan mengikuti prinsip **Extreme Programming (XP)**. Aplikasi ini membantu tim mengelola tugas secara efisien dengan fitur-fitur dasar seperti CRUD tugas, filter, dan ringkasan status, sambil menerapkan praktik pengembangan perangkat lunak modern berbasis agile.

### 🎯 Fitur Utama:
- ✅ Tambah, edit, hapus tugas
- ✅ Atur prioritas: rendah, sedang, tinggi
- ✅ Lacak status: to-do, in-progress, done
- ✅ Ringkasan statistik tugas
- ✅ Filter cepat berdasarkan status/prioritas
- ✅ Persistensi data (local storage / JSON Server)

---

## 👥 Tim & Peran

| 👤 Nama        | 🎯 Peran                  | 🛠 Fokus Utama                                       |
|---------------|---------------------------|------------------------------------------------------|
| **Fikri Anwar** | Developer A (Driver)     | Formulir tugas (`TaskForm.tsx`)                     |
| **Nickolas**    | Developer B (Navigator)  | Kartu tugas (`TaskCard.tsx`)                        |
| **Mikael**      | Customer                 | Umpan balik, fitur prioritas (`StatsCards.tsx`, `QuickActions.tsx`) |
| **Ipaldi**      | XP Coach                 | Praktik XP, CI, dokumentasi, header (`Header.tsx`) |

---

## 🧰 Stack Teknologi

- **Frontend**: React.js + Tailwind CSS
- **Backend Opsional**: JSON Server
- **Testing**: Jest
- **CI/CD**: GitHub Actions
- **Version Control**: Git & GitHub
- **Deployment**: [Vercel](https://vercel.com/)

---

## 💡 Praktik XP yang Diterapkan

| Praktik XP | Implementasi |
|------------|--------------|
| ✅ Pair Programming | Dilakukan dengan rotasi driver/navigator. |
| ✅ TDD (Test-Driven Development) | Unit test dibuat sebelum implementasi fitur. |
| ✅ Continuous Integration | GitHub Actions dijalankan pada setiap commit untuk testing otomatis. |
| ✅ Small Releases | Fitur dirilis dan dideploy setiap hari. |
| ✅ Refactoring | Perbaikan struktur kode secara rutin tanpa ubah fungsionalitas. |
| ✅ Customer Collaboration | Mikael berperan sebagai product owner dengan review harian. |
| ✅ Planning Game | User story diprioritaskan dan diberi estimasi poin di awal proyek. |

---

## 📜 Daftar User Stories

| No | User Story | Estimasi Poin |
|----|------------|---------------|
| 1 | Sebagai user, saya bisa menambahkan tugas agar bisa mengatur pekerjaan saya. | 3 |
| 2 | Sebagai user, saya bisa melihat daftar tugas berdasarkan prioritas. | 2 |
| 3 | Sebagai user, saya bisa memperbarui status tugas agar bisa melacak progres. | 2 |
| 4 | Sebagai user, saya bisa menghapus tugas untuk membersihkan daftar. | 1 |
| 5 | Sebagai user, saya ingin memfilter tugas berdasarkan status dan prioritas. | 2 |
| 6 | Sebagai user, saya ingin melihat statistik jumlah tugas. | 1 |
| 7 | Sebagai user, saya ingin antarmuka yang simpel dan enak dilihat. | 1 |

**Total Story Point**: 12

---

## 💬 Feedback Harian dari Customer

| Hari | Feedback |
|------|----------|
| 🗓️ Day 1 | Validasi input kosong dibutuhkan di formulir tugas. |
| 🗓️ Day 2 | Warna status lebih menonjol akan bantu navigasi visual. |
| 🗓️ Day 3 | Ringkasan statistik tugas akan sangat berguna. |
| 🗓️ Day 4 | Tambahkan Quick Filter untuk mempercepat akses. |
| 🗓️ Day 5 | Fokus ke UI/UX dan polish final demo. Semua fitur penting sudah tersedia. |

---

## 📅 Log Standup Harian

### 📖 Day 1
- 🚧 Setup struktur awal project.
- ✅ TaskForm dasar selesai.
- 💬 Diskusi user story & estimasi poin.

### 📖 Day 2
- ✅ Validasi form & pengembangan TaskCard.
- 🔍 Review kode & testing awal.

### 📖 Day 3
- ✅ StatsCards & logika status selesai.
- 🔁 Refactor modularisasi fungsi.

### 📖 Day 4
- ✅ QuickActions dan penyempurnaan UI.
- 🧪 CI pipeline selesai dengan GitHub Actions.

### 📖 Day 5
- ✅ Finalisasi UI, testing akhir, polish untuk demo.

---

## ✅ Deliverables

- ✔️ Web app siap digunakan – [Live Preview](https://task-management-dusky-sigma.vercel.app/)
- ✔️ Repositori Git lengkap dengan commit history & CI
- ✔️ File dokumentasi: user stories, feedback harian, log standup
- ✔️ Unit test untuk komponen utama
- ✔️ Demo 5 menit siap dipresentasikan

---

## 📈 Hasil & Refleksi

### 🏆 Sukses Terbesar:
- Penerapan XP berjalan sangat baik: customer selalu dilibatkan, rilis kecil dilakukan tiap hari.

### ❗ Tantangan Utama:
- Menjaga ritme TDD dan deployment harian butuh disiplin dan koordinasi yang tinggi.

---

> Dibangun dengan kolaborasi, komunikasi efektif, dan semangat agile development. 💻✨
