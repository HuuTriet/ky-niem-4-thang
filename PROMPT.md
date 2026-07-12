# 📜 PROMPT TỔNG — Web Kỉ Niệm "Đêm Sao Lung Linh"

> Đây là bản **prompt/ý tưởng đầy đủ** cho toàn bộ trang web (theo đúng yêu cầu của Triết).
> Có thể dán nguyên văn cho bất kỳ AI nào (Claude, GPT, v.v.) để **dựng lại, chỉnh sửa,
> hoặc mở rộng** trang này; hoặc dùng làm "bản thiết kế" để tự tay chỉnh. Copy phần trong
> khung `PROMPT` bên dưới là dùng được ngay.

---

## 🎯 PROMPT (copy nguyên phần này)

```
VAI TRÒ
Bạn là một lead front-end designer kiêm copywriter tiếng Việt, chuyên làm các trang web
quà tặng lãng mạn, tinh tế và "lung linh". Hãy tạo một trang web quà tặng kỉ niệm tình yêu
hoàn chỉnh, chạy được ngay, bằng HTML/CSS/JS thuần (không framework, không thư viện ngoài).

BỐI CẢNH CÂU CHUYỆN (lồng vào thật tự nhiên)
- Một cặp đôi trẻ, kỉ niệm TRÒN 4 THÁNG yêu nhau.
- Lần đầu gặp nhau ở CHIẾN DỊCH TÌNH NGUYỆN MÙA ĐÔNG tại ĐẠI HỌC KINH TẾ, vào THÁNG 12.
- Cảm xúc cốt lõi: giữa cái lạnh mùa đông và hàng trăm con người, hai đứa tìm thấy nhau.
- Xưng hô "anh" – "em". Dùng {{HER_NAME}} và {{HIS_NAME}} ở mọi chỗ cần tên.

CONCEPT CHỦ ĐẠO — "ĐÊM SAO LUNG LINH: BẦU TRỜI CỦA CHÚNG MÌNH"
Một ẩn dụ duy nhất xuyên suốt: CHÒM SAO. Ảnh, cột mốc, lý do... đều là những "ngôi sao",
và khi người xem cuộn trang, các đường vàng nối chúng lại — mối tình dần "hiện thành hình"
một chòm sao. Một metaphor rõ ràng thắng một trang chắp vá nhiều thứ.
(Ưu tiên ELEGANT trước, dễ-thương ẩn dưới — ấm áp, không sến.)

BẢNG MÀU
- Mực Đêm #0A0E27 · Chàm Sâu #141B44 · Tím Hoàng Hôn #2B2D6B · Xanh Tinh Vân #3D4C8F
- Vàng Sao #F4C64A (màu nhấn chính) · Champagne #F7E6B0
- Hồng Phấn #F5B8CE · Hồng Thạch Anh #FADCE7 · Ánh Trăng #EDEBFF (chữ body)
Nền là một bầu trời gradient chuyển từ mực đêm (trên) xuống tím hoàng hôn (dưới).

FONT (đều hỗ trợ tiếng Việt)
- Tiêu đề: "Playfair Display" (serif thanh lịch)
- Chữ viết tay / nhấn: "Dancing Script"
- Thân bài & UI: "Be Vietnam Pro"

CÁC PHẦN (theo thứ tự)
1. CỔNG MỞ QUÀ — màn hình chạm-để-mở (hộp quà / phong thư). Chạm → nhạc bắt đầu, hiệu ứng bung.
2. HERO + ĐẾM NGÀY YÊU — tên hai đứa, dòng "Kỉ niệm 4 tháng", đồng hồ real-time (ngày/giờ/phút/giây).
3. DÒNG THỜI GIAN — 6 mốc từ "chuyến tình nguyện Đông Xuân" → "hôm nay tròn 4 tháng"; đường sao vàng
   nối dần khi cuộn (SVG stroke-dashoffset + IntersectionObserver), card xen kẽ trái–phải.
4. ALBUM ẢNH — polaroid viền trắng nghiêng ngẫu nhiên, ảnh xám → bừng màu khi vào khung nhìn,
   chạm để phóng to (lightbox) + caption viết tay.
5. QUIZ "HIỂU NHAU TỚI ĐÂU" — từng câu một, chọn đáp án → tô vàng (đúng) + mưa tim; cuối có điểm.
6. THƯ TÌNH — phong thư mở ra bằng animation, lá thư 150–250 từ, chữ ký viết tay.
7. LÝ DO ANH THƯƠNG EM — 8 thẻ nhỏ.
8. THƯỚC PHIM CỦA MÌNH — video kỉ niệm phát trong khung "cuộn phim" (viền lỗ film),
   tự tạm dừng nhạc nền khi phát video và mở lại khi dừng.
9. CÂY THÔNG YÊU THƯƠNG (guestbook) — cây thông Noel CSS nhiều tầng, đèn nhấp nháy, sao trên đỉnh.
   Khách nhập tên + lời chúc → tên hoá thành quả châu treo trên cây; bấm quả châu mở modal đọc
   lời chúc. Lưu trữ 2 chế độ: Firebase Firestore (realtime, mọi máy đều thấy — rules chỉ cho
   read/create, giới hạn độ dài field) hoặc localStorage (không cần setup).
10. LỜI CUỐI + THẢ TIM — thông điệp lớn nhất, nút "thả tim", mưa sparkle vàng–hồng khép lại.

HIỆU ỨNG (chỉ animate transform/opacity để mượt 60fps)
- Canvas trời sao nhấp nháy + sao băng ngẫu nhiên để lại đuôi vàng.
- Mưa tim / cánh hoa / sparkle bay lên (canvas).
- Confetti + heart-burst khi trả lời đúng quiz / thả tim / mở thư.
- Vệt tim/sparkle theo con trỏ (chỉ desktop).
- Scroll-reveal bằng IntersectionObserver.
- Đường chòm sao tự vẽ; đồng hồ đếm setInterval 1000ms.
- Tôn trọng prefers-reduced-motion (tắt hiệu ứng nặng, chỉ crossfade nhẹ).

NHẠC NỀN
- HTML5 <audio> loop, BẮT ĐẦU khi người dùng chạm nút "Mở quà" (đúng chính sách autoplay).
- Nút bật/tắt nổi ở góc, icon đĩa nhạc xoay khi đang phát, fade-in âm lượng.

RÀNG BUỘC KỸ THUẬT
- HTML/CSS/JS thuần, không thư viện. Mã sạch, responsive (ưu tiên xem trên điện thoại).
- Tách 1 file config để người dùng chỉ sửa 1 chỗ: tên, ngày yêu, ảnh, nhạc, toàn bộ lời văn.
- Deploy được lên GitHub Pages (chỉ file tĩnh).
- Toàn bộ chữ hiển thị bằng tiếng Việt CÓ DẤU, giọng văn ngọt ngào – chân thành – không sến quá.

ĐẦU RA
Xuất đầy đủ index.html + style.css + các file JS + file config, kèm hướng dẫn cá nhân hoá.
```

---

## 🧩 Phụ lục — Thư viện lời văn (đã viết sẵn trong `assets/js/config.js`)

- **Thư tình** (150–250 từ), **8 lý do anh thương em**, **10 câu quiz** kèm phản hồi ngọt,
  **6 mốc dòng thời gian**, **lời cuối** — tất cả đã có sẵn, chỉ việc thay tên & vài chi tiết riêng.
- Vài câu quiz để đáp án "(của riêng em/mình)" như chỗ trống dành cho bí mật thật của hai đứa.

## 🎵 Gợi ý nhạc nền
Đông Kiếm Em – Vũ. · Lạ Lùng – Vũ. · Thương Em Là Điều Tốt Nhất Anh Làm Được – Vũ. ·
Nàng Thơ – Hoàng Dũng · Phía Sau Một Cô Gái – Soobin · Em Dạo Này – Ngọt.

## 💡 Ý tưởng nâng cấp (nếu muốn làm "khủng" hơn)
- **Khoá tới 00:00 ngày kỉ niệm**: phần Lời Cuối hiện đếm ngược, đúng nửa đêm mới mở khoá.
- **Cổng câu hỏi bí mật**: thay nút mở quà bằng câu "Mình gặp nhau lần đầu ở đâu?" — chỉ nàng trả lời đúng mới vào được (cảm giác "két sắt riêng tư").
- **Hái sao lý do**: thay vì liệt kê, cho nàng chạm từng ngôi sao để "hái" ra một lý do.
- **Guestbook**: ô nhỏ để hai đứa để lại lời nhắn (lưu localStorage).
- **Thư đánh máy live**: lá thư tự gõ từng chữ như đang được viết dưới trời sao.

> Nói mình một câu là mình thêm bất kỳ ý nào ở trên vào nhé 💛
