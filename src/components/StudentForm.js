import React from "react";

function StudentForm({ student, onSave, onCancel }) {
  // Danh sách ngành và giới tính mẫu
  const majors = ["CNTT", "HTTT", "KTPM", "TTNT", "ANM"];
  const genders = ["Nam", "Nữ", "Khác"];

  // State lưu dữ liệu form
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: genders[0],
    address: "",
    class: "",
    major: majors[0],
  });

  // State lưu lỗi hợp lệ của từng trường
  const [errors, setErrors] = React.useState({});

  // Khi props.student thay đổi, cập nhật lại form
  React.useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        birthDate: "",
        gender: genders[0],
        address: "",
        class: "",
        major: majors[0],
      });
    }
    setErrors({});
  }, [student]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi khi người dùng nhập lại
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Kiểm tra hợp lệ dữ liệu form
  const validateForm = () => {
    const newErrors = {};
    // Kiểm tra từng trường
    if (!formData.firstName.trim()) newErrors.firstName = "Tên không được để trống";
    if (!formData.lastName.trim()) newErrors.lastName = "Họ không được để trống";

    if (!formData.phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
    else if (formData.phone.trim().length !== 10) newErrors.phone = "Số điện thoại phải đủ 10 ký tự";
    else if (!/^0\d{9}$/.test(formData.phone.trim())) newErrors.phone = "Số điện thoại phải bắt đầu từ 0";

    if (!formData.email.trim()) newErrors.email = "Email không được để trống";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) newErrors.email = "Email không đúng định dạng";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Ngày sinh không được để trống";
    }

    if (!formData.address.trim()) newErrors.address = "Địa chỉ không được để trống";

    if (!formData.class.trim()) newErrors.class = "Lớp không được để trống";
    setErrors(newErrors);
    // Trả về true nếu không có lỗi
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Làm sạch dữ liệu trước khi lưu
      const cleanedData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        class: formData.class.trim(),
      };
      onSave(cleanedData);
      // Nếu là thêm mới, reset form sau khi lưu
      if (!student) {
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          address: "",
          class: "",
          major: majors[0],
          gender: genders[0],
          birthDate: "",
        });
        setErrors({});
      }
    }
  };

  // Xử lý nút Hủy: reset form và gọi callback nếu có
  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      class: "",
      major: majors[0],
      gender: genders[0],
      birthDate: "",
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  // =======================
  // Render giao diện form
  // =======================
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">{student ? "Sửa Sinh Viên" : "Thêm Sinh Viên Mới"}</h5>
        <form onSubmit={handleSubmit}>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Tên <span className="text-danger">*</span></label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}/>
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Họ <span className="text-danger">*</span></label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}/>
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Số Điện Thoại <span className="text-danger">*</span></label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={`form-control ${errors.phone ? 'is-invalid' : ''}`}/>
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email <span className="text-danger">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Ngày Sinh <span className="text-danger">*</span></label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
            />
            {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Giới Tính</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
              {genders.map((gender) => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Địa Chỉ <span className="text-danger">*</span></label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className={`form-control ${errors.address ? 'is-invalid' : ''}`}/>
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Lớp <span className="text-danger">*</span></label>
            <input type="text" name="class" value={formData.class} onChange={handleChange} className={`form-control ${errors.class ? 'is-invalid' : ''}`}/>
            {errors.class && <div className="invalid-feedback">{errors.class}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Ngành</label>
            <select name="major" value={formData.major} onChange={handleChange} className="form-select">
              {majors.map((major) => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>
          </div>

          {/* Nút lưu và hủy */}
          <div className="d-flex justify-content-end gap-2 pt-2">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-check-lg"></i> {student ? "Lưu" : "Thêm sinh viên"}
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-danger">
              <i className="bi bi-x-lg"></i> Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;