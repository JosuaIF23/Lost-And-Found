import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import apiHelper from "../../../helpers/apiHelper";
import { asyncSetProfile, setIsProfile } from "../../users/states/action";

function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);
  const isProfile = useSelector((state) => state.isProfile);

  // 🔹 Cek token hanya sekali saat mount
  useEffect(() => {
    const token = apiHelper.getAccessToken();
    if (token) {
      dispatch(asyncSetProfile());
    }
  }, [dispatch]);

  // 🔹 Jika profile sudah ada → redirect ke home
  useEffect(() => {
    if (isProfile) {
      dispatch(setIsProfile(false));
      if (profile) {
        navigate("/", { replace: true });
      }
    }
  }, [isProfile, profile, dispatch, navigate]);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-6 col-sm-8">
          <div className="card mt-5">
            <div className="card-header text-center pb-0">
              <img
                src="/logo.png"
                alt="Logo"
                style={{ width: "64px", height: "64px" }}
              />
              <ul className="nav nav-tabs mt-2">
                <li className="nav-item">
                  <NavLink
                    to="/auth/login"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active" : "")
                    }
                  >
                    Masuk
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/auth/register"
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "active" : "")
                    }
                  >
                    Daftar
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
