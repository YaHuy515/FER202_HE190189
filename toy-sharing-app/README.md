# 🧸 ToyShare - Hệ Thống Quản Lý & Chia Sẻ Đồ Chơi Trẻ Em

Dự án môn học **FER202 (Front-End Web Development với React)** tại Đại học FPT.

---

## 🚀 Tính Năng Chính
- 🔐 **Hệ thống xác thực & phân quyền**: Đăng nhập, Đăng ký (với ô xác nhận mật khẩu), phân quyền Admin / Member.
- 🧩 **Quản lý đồ chơi**: Xem danh sách, tìm kiếm, lọc theo thể loại / độ tuổi / trạng thái; Đăng ký thêm đồ chơi mới (duyệt tự động/admin), chỉnh sửa và xóa đồ chơi.
- 📦 **Mượn & Trả đồ chơi**: Quy trình mượn đồ chơi, tính hạn trả, trả đồ kèm đánh giá tình trạng đồ chơi (hỏng hóc/trả muộn).
- 🌟 **Hệ thống Điểm Uy Tín (Reputation)**: Phân hạng thành viên (VVIP, Vàng, Bạc, Đồng, Khóa), tự động cộng điểm khi trả đúng hạn/bảo quản tốt và trừ điểm khi trả muộn/làm hỏng.
- 📊 **Thống kê (Stats Dashboard)**: Tổng quan số lượng đồ chơi, lượt mượn đang diễn ra, tổng số thành viên và điểm uy tín trung bình.
- 🌓 **Giao diện đa chế độ (Theme)**: Chuyển đổi linh hoạt giữa giao diện Sáng (Light) và Tối (Dark).

---

## 🛠️ Công Nghệ Sử Dụng
- **React 19** + **Vite 8**
- **JSON-Server** (Mock RESTful API tại port `9999`)
- **Axios** (Gọi API)
- **Concurrently** (Chạy song song cả Web và API Server)
- **CSS Modules & Glassmorphism UI**

---

## ⚙️ Cài Đặt & Chạy Ứng Dụng

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Khởi chạy đồng thời cả API Server và Giao diện Web:
```bash
npm run start
```
> Hoặc chạy riêng biệt:
> - Backend JSON-Server: `npm run server` (Port 9999)
> - Frontend Vite: `npm run dev`

### 3. Build & Lint:
```bash
npm run build
npm run lint
```
