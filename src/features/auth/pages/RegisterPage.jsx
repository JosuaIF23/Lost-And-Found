import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ tambahkan ini
import useInput from "../../../hooks/useInput";
import {
  asyncSetIsAuthRegister,
  setIsAuthRegisterActionCreator,
} from "../states/action";
import "../resources/auth.css"; // ✅ gunakan CSS auth

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ inisialisasi navigate
  const isAuthRegister = useSelector((state) => state.isAuthRegister);

  const [loading, setLoading] = useState(false);
  const [name, onChangeName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (isAuthRegister === true) {
      setLoading(false);
      dispatch(setIsAuthRegisterActionCreator(false));
      navigate("/auth/login"); // ✅ langsung arahkan ke login setelah sukses
    }
  }, [isAuthRegister, dispatch, navigate]);

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoading(true);
    dispatch(asyncSetIsAuthRegister(name, email, password));
  }

  return (
    <div className="auth-card shadow-lg rounded-4 p-4 animate-fadein">
      <div className="text-center mb-4">
        <img src="/logo.png" alt="Logo" width="70" className="mb-3" />
        <h3 className="fw-bold text-success">Buat Akun Baru</h3>
        <p className="text-muted small">
          Buat akun untuk mulai menggunakan sistem Lost & Found DelCom.
        </p>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Nama Lengkap</label>
          <input
            type="text"
            onChange={onChangeName}
            className="form-control form-control-lg"
            placeholder="Nama lengkap Anda"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            onChange={onChangeEmail}
            className="form-control form-control-lg"
            placeholder="contoh@delcom.org"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Kata Sandi</label>
          <input
            type="password"
            onChange={onChangePassword}
            className="form-control form-control-lg"
            placeholder="Minimal 6 karakter"
            required
          />
        </div>

        <div className="d-grid mt-4">
          {loading ? (
            <button className="btn btn-success btn-lg" disabled>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Sedang Mendaftar...
            </button>
          ) : (
            <button type="submit" className="btn btn-success btn-lg">
              Daftar Sekarang
            </button>
          )}
        </div>

        <p className="text-center mt-4">
          Sudah punya akun?{" "}
          <a
            href="/auth/login"
            className="fw-semibold text-decoration-none text-success"
          >
            Masuk di sini
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
