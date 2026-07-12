# 🎄 Hướng dẫn bật Firebase cho Cây Thông Lời Chúc (≈5 phút)

Khi bật Firebase, lời chúc từ **mọi người, mọi máy** đều hiện trên cây thông,
và Triết đọc được tất cả. Chưa bật thì web vẫn chạy bình thường (lời chúc chỉ
lưu trên máy của từng người gửi).

## Bước 1 — Tạo project Firebase (miễn phí)

1. Mở https://console.firebase.google.com và đăng nhập Google.
2. Bấm **Create a project** (Tạo dự án) → đặt tên, ví dụ: `cay-thong-triet-tram`.
3. Tắt Google Analytics (không cần) → **Create project** → chờ vài giây → **Continue**.

## Bước 2 — Tạo Firestore Database

1. Menu trái → **Databases & Storage** (giao diện cũ gọi là "Build") → **Firestore Database** → **Create database**.
   (Chọn đúng **Firestore Database**, đừng nhầm "Realtime Database".)
2. Chọn location `asia-southeast1 (Singapore)` cho gần Việt Nam → Next.
3. Chọn **Start in production mode** → **Create**.

## Bước 3 — Cài luật bảo mật (quan trọng!)

Vào tab **Rules** của Firestore, xoá hết và dán đoạn này rồi bấm **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wishes/{wish} {
      // Ai cũng đọc được và gửi được lời chúc,
      // nhưng không ai sửa/xoá được lời chúc của người khác.
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['name', 'msg', 't'])
                    && request.resource.data.name is string
                    && request.resource.data.name.size() > 0
                    && request.resource.data.name.size() <= 24
                    && request.resource.data.msg is string
                    && request.resource.data.msg.size() > 0
                    && request.resource.data.msg.size() <= 500
                    && request.resource.data.t is number;
      allow update, delete: if false;
    }
  }
}
```

## Bước 4 — Lấy config và dán vào web

1. Bấm biểu tượng ⚙️ (Project settings) → kéo xuống **Your apps** → bấm biểu tượng **</>** (Web).
2. Đặt tên app (vd `web`) → **Register app** (KHÔNG cần chọn hosting).
3. Firebase hiện ra một đoạn `const firebaseConfig = { ... }` — copy các giá trị đó.
4. Mở file **`assets/js/config.js`**, tìm mục `wishtree.firebase` và điền vào:

```js
firebase: {
  apiKey: "AIzaSy...",
  authDomain: "cay-thong-triet-tram.firebaseapp.com",
  projectId: "cay-thong-triet-tram",
  storageBucket: "cay-thong-triet-tram.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123",
},
```

## Bước 5 — Xong! 🎉

Đẩy code lên GitHub Pages như bình thường. Giờ:
- Ai mở link cũng gửi được lời chúc → tên hiện thành **quả châu** trên cây thông.
- Triết (và mọi người) bấm vào quả châu là **đọc được lời chúc**.
- Lời chúc cập nhật **realtime** — ai vừa gửi là cây nở thêm châu liền ✨

> 💡 Lưu ý: `apiKey` của Firebase web KHÔNG phải mật khẩu bí mật — nó chỉ định danh
> project, an toàn khi để public. Bảo mật thật sự nằm ở Rules bước 3.

## Muốn xoá một lời chúc?

Vào **Firestore Database → Data → collection `wishes`** → bấm vào document tương ứng → Delete.
