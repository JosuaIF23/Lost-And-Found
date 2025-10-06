import { NavLink } from "react-router-dom";

function NavbarComponent({ profile, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        {/* Logo / Brand */}
        <NavLink
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/"
        >
          <i className="bi bi-box-seam me-2"></i> Lost & Found
        </NavLink>

        {/* Burger for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <i className="bi bi-house-door me-1"></i> Beranda
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/lost-founds">
                <i className="bi bi-search me-1"></i> Lost & Founds
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/stats">
                <i className="bi bi-bar-chart me-1"></i> Statistik
              </NavLink>
            </li>

            {/* Dropdown Profile */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={profile?.photo
                    ? profile.photo.startsWith("http")
                      ? profile.photo
                      : `https://open-api.delcom.org/${profile.photo}`
                    : "/avatar.png"}
                  alt="profile"
                  width="28"
                  height="28"
                  className="rounded-circle me-2"
                />
                {profile?.name || "Profil"}
              </a>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <NavLink className="dropdown-item" to="/profile">
                    <i className="bi bi-gear me-2"></i> Pengaturan
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => {
                      if (window.confirm("Yakin ingin keluar?")) {
                        handleLogout();
                      }
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Keluar
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
