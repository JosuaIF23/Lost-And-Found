import { useEffect, useState } from "react";
import userApi from "../api/userApi";

function UsersPage() {
  const [allUsers, setAllUsers] = useState([]); // semua data user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState(""); // cari nama
  const [searchId, setSearchId] = useState(""); // cari ID

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // jumlah user per halaman

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetched = await userApi.getUsers();
        const reversed = fetched.reverse();
        setAllUsers(reversed);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // 🔍 Cari user by ID
  async function handleSearchById(e) {
    e.preventDefault();
    if (!searchId) return;

    try {
      const user = await userApi.getUserById(searchId);
      setAllUsers([user]);
      setCurrentPage(1);
    } catch (e) {
      setError("User tidak ditemukan");
      setAllUsers([]);
    }
  }

  // 🔁 Reset data
  function handleReset() {
    setSearch("");
    setSearchId("");
    setError(null);
    setCurrentPage(1);
    // reload data dari API
    setLoading(true);
    userApi.getUsers().then((data) => {
      setAllUsers(data.reverse());
      setLoading(false);
    });
  }

  // 🔎 Filter nama
  const filteredUsers = allUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Hitung index data untuk pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <p className="text-center mt-4">Loading users...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-3">Daftar Pengguna</h1>

      {/* 🔍 Search Form */}
      <div className="mb-3 d-flex flex-wrap gap-3 align-items-center">
        <input
          type="text"
          className="form-control"
          style={{ flex: 1 }}
          placeholder="Cari berdasarkan nama..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <form className="d-flex gap-2" onSubmit={handleSearchById}>
          <input
            type="number"
            className="form-control"
            placeholder="Cari ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Cari
          </button>
        </form>

        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Tabel Users */}
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-light">
          <tr>
            <th style={{ width: "70px" }}>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th style={{ width: "80px" }}>Foto</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
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
                    className="rounded-circle"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                «
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
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
                className="page-link"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                »
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default UsersPage;
