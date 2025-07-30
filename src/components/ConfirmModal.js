import React from "react";

function ConfirmModal({ isOpen, onClose, onConfirm, studentName }) {
  if (!isOpen) return null;
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title text-primary w-100 text-center">Xác nhận xóa</h5>
          </div>
          <div className="modal-body text-center">
            <p>Bạn có chắc chắn muốn xóa sinh viên <strong>{studentName}</strong> không?</p>
          </div>
          <div className="modal-footer border-0 justify-content-center gap-2">
            <button onClick={onConfirm} className="btn btn-primary">Đồng ý</button>
            <button onClick={onClose} className="btn btn-danger">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;