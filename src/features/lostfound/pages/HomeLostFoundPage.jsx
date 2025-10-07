import { useSelector, useDispatch } from "react-redux";
import "../resources/custom.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddLostFoundModal from "../modals/AddLostFoundModal";
import ChangeLostFoundModal from "../modals/ChangeLostFoundModal";
import {
  asyncSetIsLostFoundDelete,
  asyncSetLostFounds,
  setIsLostFoundDeleteActionCreator,
} from "../states/action";
import { formatDate, showConfirmDialog } from "../../../helpers/toolsHelper";

function HomeLostFoundPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const lostFounds = useSelector((state) => state.lostFounds);
  const isDeleted = useSelector((state) => state.isLostFoundDeleted);

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Ambil data Lost & Found dari API
  useEffect(() => {
    dispatch(asyncSetLostFounds(filter ? { status: filter } : {}));
  }, [filter, dispatch]);

  // Refresh jika ada penghapusan data
  useEffect(() => {
    if (isDeleted) {
      dispatch(setIsLostFoundDeleteActionCreator(false));
      dispatch(asyncSetLostFounds());
    }
  }, [isDeleted, dispatch]);

  if (!profile) return null;

  // Hapus data
  function handleDelete(id) {
    const confirmDelete = showConfirmDialog(
      "Apakah Anda yakin ingin menghapus data Lost & Found ini?"
    );
    confirmDelete.then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncSetIsLostFoundDelete(id));
      }
    });
  }

  // Filter + Search
  const filteredData = lostFounds.filter((item) => {
    const matchStatus = filter ? item.status === filter : true;
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="container-fluid">
        {/* Header dan Tools */}
        <div className="mt-2 mb-3">
          <h2 className="fw-bold mb-3">Lost & Found Items</h2>

          {/* Baris: Search, Filter, Tambah */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            {/* Search dan Filter di kiri */}
            <div className="d-flex flex-wrap gap-2 align-items-center">
              {/* Search bar */}
              <div className="input-group" style={{ maxWidth: "300px" }}>
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari berdasarkan judul..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Filter status */}
              <div className="input-group" style={{ maxWidth: "200px" }}>
                <span className="input-group-text">Status</span>
                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Semua</option>
                  <option value="lost">Hilang</option>
                  <option value="found">Ditemukan</option>
                </select>
              </div>
            </div>

            {/* Tombol Tambah di kanan */}
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <i className="bi bi-plus-circle"></i> Tambah
            </button>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center" style={{ width: "60px" }}>ID</th>
                  <th>Judul</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Dibuat</th>
                  <th>Diubah</th>
                  <th className="text-center" style={{ width: "150px" }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-3">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                ) : (
                  currentData.map((item) => (
                    <tr key={`lostfound-${item.id}`}>
                      <td className="text-center">{item.id}</td>
                      <td>{item.title}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "lost" ? "bg-danger" : "bg-info"
                          }`}
                        >
                          {item.status === "lost" ? "Hilang" : "Ditemukan"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item.is_completed
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {item.is_completed ? "Selesai" : "Proses"}
                        </span>
                      </td>
                      <td>{formatDate(item.created_at)}</td>
                      <td>{formatDate(item.updated_at)}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => navigate(`/lost-founds/${item.id}`)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => {
                              setSelectedId(item.id);
                              setShowChangeModal(true);
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  «
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  »
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Modal Tambah & Ubah */}
      <AddLostFoundModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <ChangeLostFoundModal
        show={showChangeModal}
        onClose={() => setShowChangeModal(false)}
        lostFound={lostFounds.find((lf) => lf.id === selectedId)}
      />
    </>
  );
}

export default HomeLostFoundPage;
