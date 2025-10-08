import { NavLink } from "react-router-dom";

function SidebarComponent({ profile, handleLogout }) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 position-fixed"
      style={{
        width: "250px",
        height: "100vh",
        top: 0,
        left: 0,
        backgroundColor: "#f8fafc",
        borderRight: "1px solid #e2e8f0",
        boxShadow: "2px 0 10px rgba(0,0,0,0.03)",
        padding: "1.5rem 1rem",
      }}
    >
      {/* Header */}
      <NavLink
        to="/"
        className="d-flex align-items-center mb-4 text-decoration-none"
      >
        <i className="bi bi-box-seam fs-4 text-primary me-2"></i>
        <span className="fs-5 fw-bold text-dark">Lost & Found</span>
      </NavLink>

      {/* Menu */}
      <ul className="nav nav-pills flex-column mb-auto">
        {[
          { to: "/", icon: "bi-house-door", label: "Beranda" },
          { to: "/lost-founds", icon: "bi-search", label: "Lost & Founds" },
          { to: "/stats", icon: "bi-bar-chart", label: "Statistik" },
          { to: "/users", icon: "bi-people", label: "Pengguna" },
        ].map(({ to, icon, label }) => (
          <li className="nav-item mb-1" key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center rounded-3 fw-medium ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-dark hover-bg"
                }`
              }
            >
              <i className={`bi ${icon} me-2`}></i> {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User Dropdown */}
      <div className="dropdown mt-auto pt-3 border-top">
        <a
          href="#"
          className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
          id="dropdownUser"
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
            alt="user"
            width="36"
            height="36"
            className="rounded-circle me-2 border"
          />
          <strong>{profile?.name || "Tidak Dikenal"}</strong>
        </a>
        <ul
          className="dropdown-menu shadow-sm text-small"
          aria-labelledby="dropdownUser"
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
      </div>
    </div>
  );
}

export default SidebarComponent;
