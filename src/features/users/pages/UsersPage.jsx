import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import "../resources/theme.css";

function UsersPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await userApi.getUsers();
        setAllUsers(data.reverse());
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function handleSearchById(e) {
    e.preventDefault();
    if (!searchId) return;
    try {
      const user = await userApi.getUserById(searchId);
      setAllUsers([user]);
    } catch {
      setError("User tidak ditemukan");
      setAllUsers([]);
    }
  }

  function handleReset() {
    setSearch("");
    setSearchId("");
    setError(null);
    setCurrentPage(1);
    setLoading(true);
    userApi.getUsers().then((data) => {
      setAllUsers(data.reverse());
      setLoading(false);
    });
  }

  const filtered = allUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const users = filtered.slice(start, start + itemsPerPage);

  if (loading)
    return <p className="text-center mt-5 text-muted fs-5">Memuat data...</p>;
  if (error)
    return <p className="text-danger text-center mt-4 fw-medium">{error}</p>;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h2 className="fw-bold">Daftar Pengguna</h2>
      </div>

      {/* 🔍 Search Bar */}
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Cari berdasarkan nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "280px" }}
        />

        <form className="d-flex gap-2" onSubmit={handleSearchById}>
          <input
            type="number"
            className="form-control shadow-sm"
            placeholder="Cari ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ width: "120px" }}
          />
          <button className="btn btn-primary rounded-pill px-3 shadow-sm">
            Cari
          </button>
        </form>

        <button
          className="btn btn-outline-primary rounded-pill px-3 shadow-sm"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {/* 🧾 Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead
              style={{
                backgroundColor: "#e0f2fe",
                color: "#1e293b",
                fontWeight: 600,
              }}
            >
              <tr>
                <th style={{ width: "70px" }}>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th style={{ width: "90px" }}>Foto</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-3 text-muted">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="table-row">
                    <td className="fw-medium">{user.id}</td>
                    <td>{user.name}</td>
                    <td className="text-muted small">{user.email}</td>
                    <td className="text-center">
                      <img
                        src={
                          user.photo
                            ? user.photo.startsWith("http")
                              ? user.photo
                              : `https://open-api.delcom.org/${user.photo}`
                            : "/avatar.png"
                        }
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-circle border shadow-sm"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination pagination-sm">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link rounded-pill"
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                ‹
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link rounded-pill"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link rounded-pill"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                ›
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default UsersPage;
