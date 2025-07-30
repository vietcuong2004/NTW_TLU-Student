import React from "react";

function InfoBar({ onDeleteSelected, onAddStudent, disableDelete }) {
  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-3 rounded-top" style={{background: '#0d6efd'}}>
      <div className="fw-bold text-white fs-5">Quản lý sinh viên</div>
      <div className="d-flex gap-2">

        {/* Nút xóa */}
        <button
          className="btn btn-danger d-flex align-items-center gap-2"
          onClick={onDeleteSelected}
          disabled={disableDelete}
        >
          <span className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{width: 22, height: 22}}>
            <i className="bi bi-dash text-danger"></i>
          </span>
          Xóa
        </button>

        {/* Nút thêm */}
        <button
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={onAddStudent}
        >
          <span className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{width: 22, height: 22}}>
            <i className="bi bi-plus text-success"></i>
          </span>
          Thêm sinh viên
        </button>

        
      </div>
    </div>
  );
}

export default InfoBar;