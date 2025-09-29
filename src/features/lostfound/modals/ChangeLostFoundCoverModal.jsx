import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { showErrorDialog } from "../../../helpers/toolsHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncSetIsLostFoundChangeCover,
  asyncSetLostFounds,
  setIsLostFoundChangeCoverActionCreator,
  setIsLostFoundChangedCoverActionCreator,
} from "../states/action";

function ChangeLostFoundCoverModal({ show, onClose, lostFoundId }) {
  const dispatch = useDispatch();
  const isChangeCover = useSelector((state) => state.isLostFoundChangeCover);
  const isChangedCover = useSelector((state) => state.isLostFoundChangedCover);

  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    if (isChangeCover) {
      setLoading(false);
      dispatch(setIsLostFoundChangeCoverActionCreator(false));
      if (isChangedCover) {
        dispatch(setIsLostFoundChangedCoverActionCreator(false));
        dispatch(asyncSetLostFounds());
        onClose();
      }
    }
  }, [isChangeCover]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  function handleSave() {
    if (!cover) return showErrorDialog("Pilih file cover dulu");

    setLoading(true);
    dispatch(asyncSetIsLostFoundChangeCover(lostFoundId, cover));
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="modal-backdrop"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="modal"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-light">
                  <h1 className="modal-title fs-5">Ubah Cover</h1>
                  <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                  <input type="file" className="form-control" accept="image/*" onChange={(e) => setCover(e.target.files[0])} />
                </div>
                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    <i className="bi bi-x-circle"></i> Batal
                  </button>
                  {loading ? (
                    <button className="btn btn-warning" disabled>
                      <span className="spinner-border spinner-border-sm"></span> Mengunggah...
                    </button>
                  ) : (
                    <button className="btn btn-warning" onClick={handleSave}>
                      <i className="bi bi-upload"></i> Simpan
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ChangeLostFoundCoverModal;
