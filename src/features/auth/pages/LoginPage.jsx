import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import apiHelper from "../../../helpers/apiHelper";
import { asyncSetProfile, setIsProfile } from "../../users/states/action";
import {
  asyncSetIsAuthLogin,
  setIsAuthLoginActionCreator,
} from "../states/action";
import "../resources/auth.css"; // ✅ gunakan CSS auth

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthLogin = useSelector((state) => state.isAuthLogin);
  const isProfile = useSelector((state) => state.isProfile);

  const [loading, setLoading] = useState(false);
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  useEffect(() => {
    if (isAuthLogin === true) {
      const authToken = apiHelper.getAccessToken();
      if (authToken) {
        dispatch(asyncSetProfile());
      } else {
        setLoading(false);
        dispatch(setIsAuthLoginActionCreator(false));
      }
    }
  }, [isAuthLogin, dispatch]);

  useEffect(() => {
    if (isProfile) {
      setLoading(false);
      dispatch(setIsAuthLoginActionCreator(false));
      dispatch(setIsProfile(false));
      navigate("/"); // ✅ Pindah ke home setelah login sukses
    }
  }, [isProfile, dispatch, navigate]);

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoading(true);
    dispatch(asyncSetIsAuthLogin(email, password));
  }

  return (
    <div className="auth-card shadow-lg rounded-4 p-4 animate-fadein">
      <div className="text-center mb-4">
        <img src="/logo.png" alt="Logo" width="70" className="mb-3" />
        <h3 className="fw-bold text-primary">Masuk ke DelCom Lost & Found</h3>
        <p className="text-muted small">
          Temukan atau laporkan barang hilang Anda dengan mudah.
        </p>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            onChange={onEmailChange}
            className="form-control form-control-lg"
            placeholder="contoh@delcom.org"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Kata Sandi</label>
          <input
            type="password"
            onChange={onPasswordChange}
            className="form-control form-control-lg"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="d-grid mt-4">
          {loading ? (
            <button className="btn btn-primary btn-lg" disabled>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Sedang Masuk...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary btn-lg">
              Masuk Sekarang
            </button>
          )}
        </div>

        <p className="text-center mt-4">
          Belum punya akun?{" "}
          <a
            href="/auth/register"
            className="fw-semibold text-decoration-none text-primary"
          >
            Daftar Sekarang
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
