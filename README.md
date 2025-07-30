# Quản Lý Sinh Viên - ReactJS

## 1. Hướng dẫn chạy dự án

### Yêu cầu:
- Đã cài đặt Node.js và npm

### Các bước chạy dự án:
1. Mở terminal tại thư mục gốc dự án (nơi có file package.json)
2. Cài đặt thư viện:
   ```bash
   npm install
   ```
3. Chạy dự án:
   ```bash
   npm start
   ```
4. Truy cập trình duyệt tại địa chỉ: [http://localhost:3000](http://localhost:3000)

> **Lưu ý:**
> - Dự án sử dụng Bootstrap và Bootstrap Icons local, không cần internet.
> - Dữ liệu sinh viên mẫu nằm ở file `public/data.json`.

---

## 2. Giải thích cấu trúc dự án

### **File chính:**
- `src/App.js`: Là file gốc, quản lý toàn bộ luồng dữ liệu, trạng thái và hiển thị các component con.

### **Các component chính:**

#### 1. `src/components/Header.js`
- **Vị trí:** Thanh trên cùng (header) của trang.
- **Chức năng:**
  - Hiển thị logo, tên hệ thống, các liên kết điều hướng.
  - Ô tìm kiếm sinh viên theo tên (search box).

#### 2. `src/components/InfoBar.js`
- **Vị trí:** Thanh màu xanh ngay dưới header, phía trên bảng sinh viên.
- **Chức năng:**
  - Hiển thị tiêu đề "Quản lý sinh viên".
  - Nút "Xóa" (xóa nhiều sinh viên đã chọn).
  - Nút "Thêm sinh viên" (mở form thêm mới).

#### 3. `src/components/StudentTable.js`
- **Vị trí:** Bảng lớn ở giữa trang.
- **Chức năng:**
  - Hiển thị danh sách sinh viên (dữ liệu từ `data.json`).
  - Checkbox chọn từng sinh viên hoặc chọn tất cả trên trang hiện tại.
  - Nút sửa, xóa từng sinh viên.
  - Phân trang (5 bản ghi/trang).

#### 4. `src/components/StudentForm.js`
- **Vị trí:** Hiện ra dưới dạng modal khi thêm/sửa sinh viên.
- **Chức năng:**
  - Form nhập thông tin sinh viên (họ tên, SĐT, email, ngày sinh, giới tính, địa chỉ, lớp, ngành).
  - Kiểm tra hợp lệ dữ liệu trước khi lưu.
  - Nút "Lưu" hoặc "Thêm sinh viên", nút "Hủy".

#### 5. `src/components/ConfirmModal.js`
- **Vị trí:** Hiện ra dưới dạng modal xác nhận khi xóa sinh viên.
- **Chức năng:**
  - Xác nhận xóa sinh viên (hiển thị tên sinh viên).
  - Nút "Đồng ý" và "Hủy".

---

## 3. Hướng dẫn sửa giao diện

### **Sửa giao diện từng phần, bạn chỉnh các file sau:**

- **Tiêu đề của web ("Quản lý sinh viên"):**
  - `public/index.html`
- **Header (logo, thanh tìm kiếm, menu):**
  - `src/components/Header.js`
- **Thanh chức năng (nút Thêm/Xóa, tiêu đề):**
  - `src/components/InfoBar.js`
- **Bảng danh sách sinh viên, phân trang, nút sửa/xóa:**
  - `src/components/StudentTable.js`
- **Form thêm/sửa sinh viên (modal):**
  - `src/components/StudentForm.js`
- **Modal xác nhận xóa:**
  - `src/components/ConfirmModal.js`
- **Toàn bộ bố cục, luồng xử lý dữ liệu, trạng thái:**
  - `src/App.js`


### **Dữ liệu mẫu sinh viên:**
- `public/data.json` (sửa/thêm/xóa sinh viên mẫu ban đầu)

---

## **Tóm tắt cấu trúc thư mục quan trọng**

```
public/
  ├─ index.html
  ├─ data.json
  ├─ bootstrap.min.css
  ├─ bootstrap-icons.css
  └─ fonts/
      ├─ bootstrap-icons.woff2
      └─ bootstrap-icons.woff
src/
  ├─ App.js
  ├─ index.js
  ├─ index.css
  └─ components/
      ├─ Header.js
      ├─ InfoBar.js
      ├─ StudentTable.js
      ├─ StudentForm.js
      └─ ConfirmModal.js
```

---

**Nếu cần sửa giao diện phần nào, chỉ cần tìm đúng file component tương ứng trong `src/components/` để chỉnh sửa.**