import { useEffect, useState } from "react";
import userApi from "../api/userApi";

function UsersPage() {
  const [allUsers, setAllUsers] = useState([]); // simpan semua data
  const [users, setUsers] = useState([]); // data yang ditampilkan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState(""); // input pencarian nama
  const [searchId, setSearchId] = useState(""); // input ID

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetched = await userApi.getUsers();
        const reversed = fetched.reverse();
        setAllUsers(reversed);
        setUsers(reversed);
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
    if (!searchId) {
      setUsers(allUsers); // reset kalau kosong
      return;
    }

    try {
      const user = await userApi.getUserById(searchId);
      setUsers([user]);
    } catch (e) {
      setError("User tidak ditemukan");
      setUsers([]); // kosongkan tabel
    }
  }

  // 🔁 Tombol reset (balik ke semua user)
  function handleReset() {
    setUsers(allUsers);
    setSearch("");
    setSearchId("");
    setError(null);
  }

  // 🔍 Filter by name (client-side)
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center mt-4">Loading users...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <h1>Users</h1>

      {/* 🔍 Search Form */}
      <div className="mb-3 d-flex flex-wrap gap-3">
        {/* Search by name */}
        <input
          type="text"
          className="form-control"
          style={{ flex: 1 }}
          placeholder="Cari berdasarkan nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Search by ID */}
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

      {/* Table Users */}
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user.photo}
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
              <td colSpan="4" className="text-center">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
