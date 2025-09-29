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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(asyncSetLostFounds(filter ? { status: filter } : {}));
  }, [filter]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(setIsLostFoundDeleteActionCreator(false));
      dispatch(asyncSetLostFounds());
    }
  }, [isDeleted]);

  if (!profile) return null;

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

  return (
    <>
      <div className="main-content">
        <div className="container-fluid mt-3">
          <h2>Lost & Found</h2>
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="input-group" style={{ maxWidth: "400px" }}>
              <span className="input-group-text">Filter Status</span>
              <select
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Semua</option>
                <option value="lost">Hilang</option>
                <option value="found">Ditemukan</option>
              </select>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <i className="bi bi-plus-circle"></i> Tambah Lost & Found
            </button>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">ID</th>
                    <th>Judul</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Dibuat</th>
                    <th>Diubah</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {lostFounds.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-3">
                        Belum ada data Lost & Found.
                      </td>
                    </tr>
                  )}
                  {lostFounds.map((item) => (
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
                            item.is_completed ? "bg-success" : "bg-warning text-dark"
                          }`}
                        >
                          {item.is_completed ? "Selesai" : "Proses"}
                        </span>
                      </td>
                      <td>{formatDate(item.created_at)}</td>
                      <td>{formatDate(item.updated_at)}</td>
                      <td>
                        <div className="d-flex gap-2">
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
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
