import React from "react";
import Header from "./components/Header";
import InfoBar from "./components/InfoBar";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const [students, setStudents] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const [editingStudent, setEditingStudent] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState({ isOpen: false, student: null });
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [showFormModal, setShowFormModal] = React.useState(false);

  // Đọc dữ liệu từ file data.json khi component mount
  React.useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);
  const sortedStudents = [...students].sort((a, b) => b.id - a.id);
  // Lọc theo searchTerm
  const filteredStudents = sortedStudents.filter((student) =>
    (`${student.lastName} ${student.firstName}`.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredStudents.length / 5) || 1;
  // Khi đổi trang, bỏ chọn tất cả
  React.useEffect(() => { setSelectedIds([]); }, [page, searchTerm]);

  const handleAddStudent = (studentData) => {
    const newId = Math.max(...students.map((s) => s.id), 0) + 1;
    const newStudent = { ...studentData, id: newId };
    setStudents([newStudent, ...students]);
  };
  const handleEditStudent = (studentData) => {
    const updatedStudents = students.map((student) => (student.id === studentData.id ? studentData : student));
    setStudents(updatedStudents);
    setEditingStudent(null);
  };
  const handleDeleteStudent = (student) => {
    setDeleteModal({ isOpen: true, student });
  };
  // Xóa nhiều bản ghi
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} sinh viên đã chọn?`)) {
      setStudents(students.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    }
  };
  const confirmDelete = () => {
    if (deleteModal.student) {
      const updatedStudents = students.filter((student) => student.id !== deleteModal.student.id);
      setStudents(updatedStudents);
    }
    setDeleteModal({ isOpen: false, student: null });
  };
  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, student: null });
  };
  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      handleEditStudent(studentData);
    } else {
      handleAddStudent(studentData);
    }
  };
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };
  // Khi nhấn nút Search trên header
  const handleHeaderSearch = () => {
    setSearchTerm(searchInput);
    setPage(1);
  };
  // Chọn tất cả trên trang hiện tại
  const handleSelectAll = (checked) => {
    const startIdx = (page - 1) * 5;
    const endIdx = startIdx + 5;
    const pageStudents = filteredStudents.slice(startIdx, endIdx);
    if (checked) {
      setSelectedIds([
        ...selectedIds,
        ...pageStudents.map(s => s.id).filter(id => !selectedIds.includes(id))
      ]);
    } else {
      setSelectedIds(selectedIds.filter(id => !pageStudents.map(s => s.id).includes(id)));
    }
  };
  // Chọn từng dòng
  const handleSelectOne = (id, checked) => {
    if (checked) setSelectedIds([...selectedIds, id]);
    else setSelectedIds(selectedIds.filter(i => i !== id));
  };
  // Đổi trang
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };
  // Khi bấm Thêm sinh viên
  const handleShowAddForm = () => {
    setEditingStudent(null);
    setShowFormModal(true);
  };
  // Khi bấm Sửa
  const handleShowEditForm = (student) => {
    setEditingStudent(student);
    setShowFormModal(true);
  };
  // Khi lưu form
  const handleSaveStudentModal = (studentData) => {
    if (editingStudent) {
      handleEditStudent(studentData);
    } else {
      handleAddStudent(studentData);
    }
    setShowFormModal(false);
  };
  // Khi hủy form
  const handleCancelFormModal = () => {
    setShowFormModal(false);
    setEditingStudent(null);
  };
  return (
    <div className="bg-light min-vh-100">
      <Header searchTerm={searchInput} setSearchTerm={setSearchInput} onSearch={handleHeaderSearch} />
      <div className="container py-4">
        <InfoBar
          onDeleteSelected={handleDeleteSelected}
          onAddStudent={handleShowAddForm}
          disableDelete={selectedIds.length === 0}
        />
        <StudentTable
          students={filteredStudents}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onEdit={handleShowEditForm}
          onDelete={handleDeleteStudent}
        />
        {/* Modal Thêm/Sửa sinh viên */}
        {showFormModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <StudentForm
                    student={editingStudent}
                    onSave={handleSaveStudentModal}
                    onCancel={handleCancelFormModal}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        studentName={deleteModal.student ? `${deleteModal.student.lastName} ${deleteModal.student.firstName}` : ""}
      />
    </div>
  );
}

export default App;
