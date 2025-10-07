import { NavLink } from "react-router-dom";

function SidebarComponent({ profile, handleLogout }) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light border-end position-fixed"
      style={{
        width: "250px",
        height: "100vh",
        top: 0,
        left: 0,
      }}
    >
      {/* Header Logo */}
      <NavLink
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <i className="bi bi-box-seam fs-4 me-2 text-primary"></i>
        <span className="fs-5 fw-bold">Lost & Found</span>
      </NavLink>

      <hr />

      {/* Menu Navigasi */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-dark" end>
            <i className="bi bi-house-door me-2"></i> Beranda
          </NavLink>
        </li>
        <li>
          <NavLink to="/lost-founds" className="nav-link text-dark">
            <i className="bi bi-search me-2"></i> Lost & Founds
          </NavLink>
        </li>
        <li>
          <NavLink to="/stats" className="nav-link text-dark">
            <i className="bi bi-bar-chart me-2"></i> Statistik
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="nav-link text-dark">
            <i className="bi bi-people me-2"></i> Pengguna
          </NavLink>
        </li>
      </ul>

      {/* Dropdown User */}
      <div className="dropdown mt-auto">
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
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>{profile?.name || "Tidak Dikenal"}</strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser"
        >
          <li>
            <NavLink className="dropdown-item" to="/profile">
              <i className="bi bi-gear me-2"></i> Pengaturan
            </NavLink>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            {/* langsung logout tanpa konfirmasi */}
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
