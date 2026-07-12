# 💛 Bầu Trời Của Chúng Mình — Triết ♡ Quỳnh Trâm · Kỉ Niệm 4 Tháng

Một trang web quà tặng "đêm sao lung linh" kỉ niệm 4 tháng yêu nhau — nhạc nền,
album 23 tấm ảnh thật (Huế, Hội An…), thước phim, quiz hiểu nhau, thư tình mở ra,
đồng hồ đếm ngày yêu, mưa tim & sao băng, và **cây thông Noel gửi lời chúc** 🎄.

Câu chuyện được kể xuyên suốt như một **chòm sao đang được nối dần**: từ chuyến
tình nguyện Đông Xuân của Đại học Kinh tế → đến hôm nay, tròn 4 tháng (13/03 → 13/07).

---

## ✨ Cách cá nhân hoá (chỉ sửa 1 file)

Mở **`assets/js/config.js`** và chỉnh các mục có đánh dấu `// ⬅️ SỬA`:

| Cần làm | Ở đâu trong config.js |
|---|---|
| Tên nàng & tên mình | `herName`, `hisName` |
| Ngày bắt đầu yêu (để đếm ngày) | `startDate` |
| File nhạc nền | `musicFile` (+ bỏ file vào `assets/music/`) |
| Ảnh kỉ niệm | `photos` (+ bỏ ảnh vào `assets/photos/`) |
| Quiz, thư tình, timeline, lý do… | các mục tương ứng, sửa thoải mái |

> Trong lời văn cứ để `{{HER_NAME}}` / `{{HIS_NAME}}` — web tự thay bằng tên đã khai báo.

Vài câu quiz có đáp án "(của riêng em/mình)" — nhớ sửa lại cho đúng bí mật của hai đứa nha 😉

---

## 👀 Xem thử trên máy

Chỉ cần **mở file `index.html`** bằng trình duyệt (Chrome/Edge) là xem được.

> Nếu ảnh không hiện khi mở kiểu file:// , mở bằng một server tĩnh cho chắc:
> ```powershell
> # tại thư mục dự án
> python -m http.server 5500
> # rồi mở http://localhost:5500
> ```

---

## 🔗 Đưa lên GitHub Pages (có link gửi nàng)

```powershell
cd C:\Users\nhuut\ky-niem-4-thang
git init
git add .
git commit -m "Web ki niem 4 thang"
git branch -M main
git remote add origin https://github.com/<tài-khoản>/<tên-repo>.git
git push -u origin main
```

Rồi vào **Settings → Pages → Branch: `main` / root → Save**.
Vài phút sau có link dạng `https://<tài-khoản>.github.io/<tên-repo>/` để gửi cho nàng 💌

> Mẹo riêng tư: đặt tên repo khó đoán (vd `bautroi-cuachungminh-x7k`) để chỉ nàng mới mở được.

---

## 🎁 Trên web có gì

1. **Cổng mở quà** — chạm để mở, nhạc bắt đầu, sao băng bay.
2. **Hero + đếm ngày yêu** — đồng hồ chạy real-time từng giây (từ 13/03/2026).
3. **Dòng thời gian chuyện tình** — 6 mốc từ chuyến tình nguyện Đông Xuân → tròn 4 tháng.
4. **Album ảnh** — 23 tấm ảnh thật đã nén nhẹ, caption riêng từng tấm, chạm để phóng to.
5. **Quiz "hiểu nhau tới đâu"** — 10 câu về tụi mình, trả lời đúng có mưa tim & confetti.
6. **Thư tình** — phong thư mở ra, lá thư viết theo đúng tấm lòng của Triết.
7. **Lý do anh thương em** — 8 tấm thẻ nhỏ.
8. **Thước phim của mình 🎬** — 2 video phát ngay trong web (tự tạm dừng nhạc nền khi xem).
9. **Cây thông yêu thương 🎄** — ai cũng gửi được lời chúc; tên người gửi hoá thành
   quả châu treo trên cây, bấm vào châu để đọc lời chúc. Muốn lời chúc từ mọi máy
   đều hiển thị → làm theo [HUONG-DAN-FIREBASE.md](HUONG-DAN-FIREBASE.md) (~5 phút).
10. **Lời cuối + thả tim** — thông điệp lớn nhất, nút thả tim cho tụi mình.

Nền trời sao, mưa tim/cánh hoa, vệt tim theo con trỏ chạy xuyên suốt ✨

---

## 🛠️ Cấu trúc

```
ky-niem-4-thang/
├── index.html
├── README.md
├── PROMPT.md               ← bản prompt / ý tưởng đầy đủ (tái sử dụng được)
├── HUONG-DAN-FIREBASE.md   ← bật chế độ "ai gửi lời chúc cũng thấy" cho cây thông
└── assets/
    ├── css/style.css
    ├── js/config.js         ← ⭐ chỗ duy nhất cần sửa
    ├── js/effects.js        ← hiệu ứng canvas
    ├── js/app.js            ← logic
    ├── photos/              ← 23 ảnh đã nén sẵn (01.jpg → 23.jpg)
    ├── videos/              ← phim-1.mp4, phim-2.mp4
    └── music/               ← ⬅️ còn thiếu: bỏ file nhạc .mp3 vào đây
```

Made with 💛 — chúc hai đứa kỉ niệm 4 tháng thật hạnh phúc.
