import React from "react";

function StudentTable({ students, page, totalPages, onPageChange, selectedIds, onSelectAll, onSelectOne, onEdit, onDelete }) {
  // Hiển thị 5 bản ghi/trang
  const startIdx = (page - 1) * 5;
  const endIdx = startIdx + 5;
  const pageStudents = students.slice(startIdx, endIdx);
  return (
    <div className="card shadow-sm rounded-0 rounded-bottom">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              {/* Checkbox chọn hoặc bỏ chọn tất cả sinh viên */}
              <th scope="col">
                <input type="checkbox" checked={pageStudents.length > 0 && pageStudents.every(s => selectedIds.includes(s.id))} onChange={e => onSelectAll(e.target.checked)} />
              </th>
              
              <th scope="col">Họ tên</th>
              <th scope="col">SĐT</th>
              <th scope="col">Email</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Lớp</th>
              <th scope="col">Ngành</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {pageStudents.length === 0 ? (
              <tr><td colSpan={10} className="text-center text-secondary py-4">Không có sinh viên nào.</td></tr>
            ) : pageStudents.map(student => (
              <tr key={student.id}>
                <td>
                  <input type="checkbox" checked={selectedIds.includes(student.id)} onChange={e => onSelectOne(student.id, e.target.checked)} />
                </td>
                <td>{student.lastName} {student.firstName}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>{student.birthDate}</td>
                <td>{student.gender}</td>
                <td>{student.address}</td>
                <td>{student.class}</td>
                <td>{student.major}</td>
                <td>
                  <button onClick={() => onEdit(student)} className="btn btn-outline-secondary btn-sm me-1"><i className="bi bi-pencil-square"></i></button>
                  <button onClick={() => onDelete(student)} className="btn btn-outline-danger btn-sm"><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Phân trang và thông tin tổng số bản ghi */}
      <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-light border-top">
        <div className="small">Hiển thị {pageStudents.length} bản ghi trên {students.length} bản ghi</div>
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item${page === 1 ? ' disabled' : ''}`}> <button className="page-link" onClick={() => onPageChange(page - 1)} disabled={page === 1}>Previous</button> </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i+1} className={`page-item${page === i+1 ? ' active' : ''}`}> <button className="page-link" onClick={() => onPageChange(i+1)}>{i+1}</button> </li>
            ))}
            <li className={`page-item${page === totalPages ? ' disabled' : ''}`}> <button className="page-link" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>Next</button> </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default StudentTable;