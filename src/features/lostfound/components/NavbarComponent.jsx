import { NavLink } from "react-router-dom";

function NavbarComponent({ profile, handleLogout }) {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: "linear-gradient(90deg, #f8fafc 0%, #e0f2fe 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 1050,
      }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <NavLink
          className="navbar-brand fw-bold d-flex align-items-center text-primary"
          to="/"
        >
          <i className="bi bi-box-seam me-2"></i> Lost & Found
        </NavLink>

        {/* Toggle mobile */}
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

        {/* Right section */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {[
              { to: "/", icon: "bi-house-door", label: "Beranda" },
              { to: "/lost-founds", icon: "bi-search", label: "Lost & Founds" },
              { to: "/stats", icon: "bi-bar-chart", label: "Statistik" },
            ].map(({ to, icon, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link fw-medium ${
                      isActive
                        ? "text-primary border-bottom border-2 border-primary"
                        : "text-secondary"
                    }`
                  }
                  to={to}
                >
                  <i className={`bi ${icon} me-1`}></i> {label}
                </NavLink>
              </li>
            ))}

            {/* Profile dropdown */}
            <li className="nav-item dropdown ms-3">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center text-dark"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={
                    profile?.photo
                      ? profile.photo.startsWith("http")
                        ? profile.photo
                        : `https://open-api.delcom.org/${profile.photo}`
                      : "/avatar.png"
                  }
                  alt="profile"
                  width="32"
                  height="32"
                  className="rounded-circle me-2 border"
                />
                {profile?.name || "Profil"}
              </a>

              <ul
                className="dropdown-menu dropdown-menu-end shadow-sm"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <NavLink className="dropdown-item" to="/profile">
                    <i className="bi bi-gear me-2"></i> Pengaturan
                  </NavLink>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
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
