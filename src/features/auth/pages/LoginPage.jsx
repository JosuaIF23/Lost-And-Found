import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../hooks/useInput";
import {
  asyncSetIsAuthLogin,
  setIsAuthLoginActionCreator,
} from "../states/action";
import { useEffect, useState } from "react";
import apiHelper from "../../../helpers/apiHelper";
import { asyncSetProfile, setIsProfile } from "../../users/states/action";

function LoginPage() {
  const dispatch = useDispatch();
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
    }
  }, [isProfile, dispatch]);

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoading(true);
    dispatch(asyncSetIsAuthLogin(email, password));
  }

  return (
    <div className="p-4">
      <h3 className="text-center mb-4 fw-bold">Masuk ke Akun Anda</h3>
      <form onSubmit={onSubmitHandler} method="POST">
        <div className="mb-3">
          <label className="form-label fw-semibold">Alamat Email</label>
          <input
            type="email"
            onChange={onEmailChange}
            className="form-control form-control-lg"
            placeholder="contoh@email.com"
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
              Sedang masuk...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary btn-lg">
              Masuk
            </button>
          )}
        </div>
        <p className="text-center mt-3 mb-0">
          Belum punya akun?{" "}
          <a href="/auth/register" className="text-decoration-none fw-semibold">
            Daftar
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
