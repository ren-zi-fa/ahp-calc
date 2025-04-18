# Panduan Kontribusi untuk `ahp-calc`

Terima kasih sudah tertarik untuk berkontribusi pada library `ahp-calc`! Panduan ini menjelaskan bagaimana kamu bisa berkontribusi secara efektif dan konsisten.

---

## 📌 Persiapan Awal

1. **Fork** repositori ini ke akun GitHub kamu.
2. **Clone** hasil fork ke lokal:
   ```bash
   git clone https://github.com/<username-kamu>/ahp-calc.git
   ```

🛠️ Cara Berkontribusi

1. **Buat Branch Baru**

Selalu mulai dari branch _main_, lalu buat branch baru:

```bash
git checkout main
git pull origin main
git checkout -b feat/nama-fitur-anda

```

Penamaan branch yang disarankan:

- feat/ untuk fitur baru

- fix/ untuk bugfix

- docs/ untuk dokumentasi

- refactor/ untuk perubahan kode non-fungsional

- test/ untuk penambahan atau perbaikan testing

Contoh:

- feat/add-subkriteria-calc

- fix/matrix-normalization

- docs/update-readme

2. **Menulis Commit**
   Gunakan format commit yang jelas dan konsisten:

```bash
git commit -m "feat: menambahkan validasi jumlah kriteria"

```

Template commit:

```bash
<type>: <deskripsi singkat>

type:

- feat
- fix
- docs
- style
- refactor
- test
```

3. Testing
   Sebelum push, pastikan kamu:

Menjalankan seluruh test:

```bash
pnpm test

```

4. Push dan Pull Request
   Setelah semuanya beres, push dan buat pull request ke branch main:

```bash
git push origin feat/nama-fitur-anda


```

Lalu buka pull request via GitHub.

✅ Review & Merge
- PR akan direview dalam 1-3 hari

- Jika perlu perubahan, silakan perbarui di branch yang sama

- Setelah approve, PR akan digabung ke main

❗ Hal yang Perlu Diperhatikan
- Semua kontribusi harus menggunakan TypeScript

- Tulis dokumentasi/comment kalau perlu

- Tetap jaga struktur folder dan file tetap rapi
