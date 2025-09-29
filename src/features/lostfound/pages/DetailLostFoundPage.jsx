import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../resources/custom.css";
import ChangeLostFoundCoverModal from "../modals/ChangeLostFoundCoverModal";
import {
  asyncSetLostFound,
  setIsLostFoundActionCreator,
} from "../states/action";
import { formatDate } from "../../../helpers/toolsHelper";

function DetailLostFoundPage() {
  const { lostFoundId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showChangeCoverModal, setShowChangeCoverModal] = useState(false);

  const profile = useSelector((state) => state.profile);
  const lostFound = useSelector((state) => state.lostFound);
  const isLostFound = useSelector((state) => state.isLostFound);

  // Ambil data detail
  useEffect(() => {
    if (lostFoundId) {
      dispatch(asyncSetLostFound(lostFoundId));
    }
  }, [lostFoundId]);

  // Periksa apakah data sudah di-load
  useEffect(() => {
    if (isLostFound) {
      dispatch(setIsLostFoundActionCreator(false));
      if (!lostFound) {
        navigate("/lost-founds");
      }
    }
  }, [isLostFound]);

  if (!profile || !lostFound) return null;

  return (
    <>
      <div className="main-content">
        <div className="container-fluid mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              {lostFound.title}
              {lostFound.is_completed ? (
                <span className="badge bg-success ms-2">Selesai</span>
              ) : (
                <span className="badge bg-warning text-dark ms-2">Proses</span>
              )}
              <span
                className={`badge ms-2 ${
                  lostFound.status === "lost" ? "bg-danger" : "bg-info"
                }`}
              >
                {lostFound.status === "lost" ? "Hilang" : "Ditemukan"}
              </span>
            </h2>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setShowChangeCoverModal(true)}
            >
              <i className="bi bi-image"></i> Ubah Cover
            </button>
          </div>
          <hr />

          <div className="card shadow-sm">
            {lostFound.cover && (
              <img
                src={lostFound.cover}
                alt="Cover"
                className="card-img-top"
                style={{ maxHeight: "350px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <p className="card-text">{lostFound.description}</p>
              <p className="text-muted small">
                Dibuat: {formatDate(lostFound.created_at)} | Diubah:{" "}
                {formatDate(lostFound.updated_at)}
              </p>
              <p className="text-muted small">
                Oleh: {lostFound.author?.name || "Tidak diketahui"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ChangeLostFoundCoverModal
        show={showChangeCoverModal}
        onClose={() => setShowChangeCoverModal(false)}
        lostFoundId={lostFound.id}
      />
    </>
  );
}

export default DetailLostFoundPage;
