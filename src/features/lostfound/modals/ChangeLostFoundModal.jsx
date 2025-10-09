import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { showErrorDialog } from "../../../helpers/toolsHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncSetIsLostFoundChange,
  asyncSetLostFounds,
  setIsLostFoundChangeActionCreator,
  setIsLostFoundChangedActionCreator,
} from "../states/action";

function ChangeLostFoundModal({ show, onClose, lostFound }) {
  const dispatch = useDispatch();
  const isChange = useSelector((state) => state.isLostFoundChange);
  const isChanged = useSelector((state) => state.isLostFoundChanged);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(lostFound?.title || "");
  const [description, setDescription] = useState(lostFound?.description || "");
  const [status, setStatus] = useState(lostFound?.status || "lost");
  const [isCompleted, setIsCompleted] = useState(lostFound?.is_completed || 0);

  useEffect(() => {
    if (isChange || isChanged) {
      setLoading(false);
      dispatch(setIsLostFoundChangeActionCreator(false));
      if (isChanged) {
        dispatch(setIsLostFoundChangedActionCreator(false));
        dispatch(asyncSetLostFounds());
        onClose();
      }
    }
  }, [isChange, isChanged, dispatch, onClose]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  function handleSave() {
    if (!title) return showErrorDialog("Judul wajib diisi");
    if (!description) return showErrorDialog("Deskripsi wajib diisi");

    setLoading(true);
    dispatch(asyncSetIsLostFoundChange(lostFound.id, title, description, status, isCompleted));
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
                  <h1 className="modal-title fs-5">Edit Lost & Found</h1>
                  <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="lost">Lost</option>
                      <option value="found">Found</option>
                    </select>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isCompletedCheck"
                      checked={isCompleted === 1}
                      onChange={(e) => setIsCompleted(e.target.checked ? 1 : 0)}
                    />
                    <label className="form-check-label" htmlFor="isCompletedCheck">Tandai selesai</label>
                  </div>
                </div>
                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    <i className="bi bi-x-circle"></i> Batal
                  </button>
                  {loading ? (
                    <button className="btn btn-success" disabled>
                      <span className="spinner-border spinner-border-sm"></span> Menyimpan...
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={handleSave}>
                      <i className="bi bi-save"></i> Simpan Perubahan
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

export default ChangeLostFoundModal;
