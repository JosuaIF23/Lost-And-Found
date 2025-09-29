import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiHelper from "../../../helpers/apiHelper";
import { asyncSetProfile, setIsProfile } from "../../users/states/action";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";

function LostFoundLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const isProfile = useSelector((state) => state.isProfile);

  // 1. Jalankan sekali untuk mengecek apakah pengguna sudah login
  useEffect(() => {
    const authToken = apiHelper.getAccessToken();
    if (authToken) {
      dispatch(asyncSetProfile());
    } else {
      navigate("/auth/login");
    }
  }, [dispatch, navigate]);

  // 2. Jika pengguna sudah login tapi profile gagal di-load → logout
  useEffect(() => {
    if (isProfile) {
      dispatch(setIsProfile(false));
      if (!profile) {
        apiHelper.putAccessToken("");
        navigate("/auth/login");
      }
    }
  }, [isProfile, profile, dispatch, navigate]);

  // Fungsi logout
  function handleLogout() {
    apiHelper.putAccessToken("");
    navigate("/auth/login");
  }

  if (!profile) return null;

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main content */}
      <div className="flex-grow-1">
        <NavbarComponent profile={profile} handleLogout={handleLogout} />

        <main className="container-fluid py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default LostFoundLayout;
