import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { p } from "framer-motion/client";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await userApi.getUsers();
        setUsers(users.reverse()); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading users...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-4"> {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Users</h1>
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
