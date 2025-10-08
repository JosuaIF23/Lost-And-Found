import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../resources/theme.css";
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

  useEffect(() => {
    if (lostFoundId) dispatch(asyncSetLostFound(lostFoundId));
  }, [lostFoundId]);

  useEffect(() => {
    if (isLostFound) {
      dispatch(setIsLostFoundActionCreator(false));
      if (!lostFound) navigate("/lost-founds");
    }
  }, [isLostFound]);

  if (!profile || !lostFound) return null;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h2>
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
          className="btn btn-outline-primary"
          onClick={() => setShowChangeCoverModal(true)}
        >
          <i className="bi bi-image"></i> Ubah Cover
        </button>
      </div>

      <div className="card shadow-sm mb-4">
        {lostFound.cover && (
          <img
            src={lostFound.cover}
            alt="Cover"
            className="card-img-top"
            style={{
              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        )}
        <div className="card-body">
          <p className="fs-5">{lostFound.description}</p>
          <hr />
          <p className="text-muted small mb-1">
            Dibuat: {formatDate(lostFound.created_at)} | Diubah:{" "}
            {formatDate(lostFound.updated_at)}
          </p>
          <p className="text-muted small">
            Oleh: <b>{lostFound.author?.name || "Tidak diketahui"}</b>
          </p>
        </div>
      </div>

      <ChangeLostFoundCoverModal
        show={showChangeCoverModal}
        onClose={() => setShowChangeCoverModal(false)}
        lostFoundId={lostFound.id}
      />
    </div>
  );
}

export default DetailLostFoundPage;
