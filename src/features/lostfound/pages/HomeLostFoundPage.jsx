import { useSelector, useDispatch } from "react-redux";
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
import "../resources/theme.css";

function HomeLostFoundPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const lostFounds = useSelector((state) => state.lostFounds);
  const isDeleted = useSelector((state) => state.isLostFoundDeleted);

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const itemsPerPage = 8;

  // Ambil data awal
  useEffect(() => {
    dispatch(asyncSetLostFounds(filter ? { status: filter } : {}));
  }, [filter, dispatch]);

  // Refresh jika delete
  useEffect(() => {
    if (isDeleted) {
      dispatch(setIsLostFoundDeleteActionCreator(false));
      dispatch(asyncSetLostFounds());
    }
  }, [isDeleted, dispatch]);

  // Filter dan Search
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
      <div className="page-wrapper">
        {/* === Header === */}
        <div className="page-header">
          <h2>Lost & Found Items</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bi bi-plus-circle"></i> Tambah
          </button>
        </div>

        {/* === Filter Section === */}
        <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Cari judul..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

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

        {/* === Table Section === */}
        <div className="card p-2">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Judul</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Dibuat</th>
                  <th>Diubah</th>
                  <th className="text-center">Aksi</th>
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
                    <tr key={item.id}>
                      <td>{item.id}</td>
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
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => navigate(`/lost-founds/${item.id}`)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => {
                              setSelectedId(item.id);
                              setShowChangeModal(true);
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                              const confirmDelete = showConfirmDialog(
                                "Yakin hapus item ini?"
                              );
                              confirmDelete.then((res) => {
                                if (res.isConfirmed)
                                  dispatch(asyncSetIsLostFoundDelete(item.id));
                              });
                            }}
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

        {/* === Pagination === */}
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

      {/* === MODALS (diletakkan di luar wrapper agar tidak tersembunyi) === */}
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
