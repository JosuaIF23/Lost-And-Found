import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useInput from "../../../hooks/useInput";
import { showErrorDialog } from "../../../helpers/toolsHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncSetIsLostFoundAdd,
  asyncSetLostFounds,
  setIsLostFoundAddActionCreator,
  setIsLostFoundAddedActionCreator,
} from "../states/action";

function AddLostFoundModal({ show, onClose }) {
  const dispatch = useDispatch();
  const isAdd = useSelector((state) => state.isLostFoundAdd);
  const isAdded = useSelector((state) => state.isLostFoundAdded);

  const [loading, setLoading] = useState(false);

  const [title, changeTitle, resetTitle] = useInput("");
  const [description, changeDescription, resetDescription] = useInput("");
  const [status, setStatus] = useState("lost");

  useEffect(() => {
    if (isAdd || isAdded) {
      setLoading(false);
      dispatch(setIsLostFoundAddActionCreator(false));
      if (isAdded) {
        dispatch(setIsLostFoundAddedActionCreator(false));
        dispatch(asyncSetLostFounds());
        onClose();
        resetTitle();
        resetDescription();
        setStatus("lost");
      }
    }
  }, [isAdd, isAdded, dispatch, onClose]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  function handleSave() {
    if (!title) return showErrorDialog("Judul wajib diisi");
    if (!description) return showErrorDialog("Deskripsi wajib diisi");

    setLoading(true);
    dispatch(asyncSetIsLostFoundAdd(title, description, status));
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
                  <h1 className="modal-title fs-5">Tambah Lost & Found</h1>
                  <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input type="text" className="form-control" value={title} onChange={changeTitle} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea className="form-control" rows="3" value={description} onChange={changeDescription}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="lost">Lost</option>
                      <option value="found">Found</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    <i className="bi bi-x-circle"></i> Batal
                  </button>
                  {loading ? (
                    <button className="btn btn-primary" disabled>
                      <span className="spinner-border spinner-border-sm"></span> Menyimpan...
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={handleSave}>
                      <i className="bi bi-save"></i> Simpan
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

export default AddLostFoundModal;
