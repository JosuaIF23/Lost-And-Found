import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../hooks/useInput";
import {
  asyncSetIsAuthRegister,
  setIsAuthRegisterActionCreator,
} from "../states/action";
import { useEffect, useState } from "react";

function RegisterPage() {
  const dispatch = useDispatch();
  const isAuthRegister = useSelector((state) => state.isAuthRegister);

  const [loading, setLoading] = useState(false);
  const [name, onChangeName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (isAuthRegister === true) {
      setLoading(false);
      dispatch(setIsAuthRegisterActionCreator(false));
    }
  }, [isAuthRegister, dispatch]);

  async function onSubmitHandler(event) {
    event.preventDefault();
    setLoading(true);
    dispatch(asyncSetIsAuthRegister(name, email, password));
  }

  return (
    <div className="p-4">
      <h3 className="text-center mb-4 fw-bold">Buat Akun Baru</h3>
      <form onSubmit={onSubmitHandler} method="POST">
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
          <label className="form-label fw-semibold">Alamat Email</label>
          <input
            type="email"
            onChange={onChangeEmail}
            className="form-control form-control-lg"
            placeholder="contoh@email.com"
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
              Sedang mendaftar...
            </button>
          ) : (
            <button type="submit" className="btn btn-success btn-lg">
              Daftar
            </button>
          )}
        </div>
        <p className="text-center mt-3 mb-0">
          Sudah punya akun?{" "}
          <a href="/auth/login" className="text-decoration-none fw-semibold">
            Masuk
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
