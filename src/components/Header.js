import React from "react";

function Header({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <header className="bg-white shadow-sm border-bottom px-3 py-2 mb-3 sticky-top">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-4">
          <div className="fs-4 fw-bold text-dark">TLU</div>
          <nav className="d-flex align-items-center gap-3">
            <a href="#" className="text-dark text-decoration-none">Trang chủ</a>
            <a href="#" className="text-dark fw-bold text-decoration-none">Quản lý sinh viên</a>
          </nav>
        </div>

        {/* Tìm kiếm */}
        <form className="d-flex align-items-center gap-2" onSubmit={e => { e.preventDefault(); onSearch(); }}>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-2 text-secondary"><i className="bi bi-search"></i></span>
            <input
              type="text"
              placeholder="Nhập tên sinh viên..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-control form-control-sm bg-white text-dark ps-5"
              style={{ minWidth: 220 }}
            />
          </div>
          <button type="submit" className="btn btn-dark btn-sm fw-bold">Search</button>
        </form>
        
      </div>
    </header>
  );
}

export default Header;