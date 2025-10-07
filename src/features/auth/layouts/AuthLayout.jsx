import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import apiHelper from "../../../helpers/apiHelper";
import { asyncSetProfile, setIsProfile } from "../../users/states/action";
import "../resources/auth.css"; // ✅ gunakan background & style auth

function AuthLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const isProfile = useSelector((state) => state.isProfile);

  // 🔹 Cek token saat pertama kali dibuka
  useEffect(() => {
    const token = apiHelper.getAccessToken();
    if (token) {
      dispatch(asyncSetProfile());
    }
  }, [dispatch]);

  // 🔹 Jika profile sudah ada → redirect ke dashboard
  useEffect(() => {
    if (isProfile && profile) {
      dispatch(setIsProfile(false));
      navigate("/", { replace: true });
    }
  }, [isProfile, profile, dispatch, navigate]);

  return (
    <div className="auth-container">
      <Outlet /> {/* Halaman login / register akan muncul di sini */}
    </div>
  );
}

export default AuthLayout;
