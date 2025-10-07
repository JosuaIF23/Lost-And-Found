import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetLostFounds } from "../states/action";
import { formatDate } from "../../../helpers/toolsHelper";

function BerandaPage() {
  const dispatch = useDispatch();
  const lostFounds = useSelector((state) => state.lostFounds);

  useEffect(() => {
    dispatch(asyncSetLostFounds());
  }, [dispatch]);

  return (
    <div className="container-fluid mt-3">
      <h2 className="fw-bold mb-3">Beranda</h2>
      <p className="text-muted mb-4">
        Berikut beberapa barang hilang dan ditemukan terbaru dari sistem Lost &
        Found DelCom.
      </p>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-center" style={{ width: "60px" }}>
                  ID
                </th>
                <th>Judul</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Dibuat</th>
              </tr>
            </thead>
            <tbody>
              {lostFounds.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-3">
                    Belum ada data Lost & Found.
                  </td>
                </tr>
              )}
              {lostFounds.slice(0, 10).map((item) => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "lost" ? "bg-danger" : "bg-info"
                      }`}
                    >
                      {item.status === "lost" ? "Hilang" : "Ditemukan"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item.is_completed
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {item.is_completed ? "Selesai" : "Proses"}
                    </span>
                  </td>
                  <td>{formatDate(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-3">
        <a href="/lost-founds" className="btn btn-primary btn-sm">
          Lihat Semua Data
        </a>
      </div>
    </div>
  );
}

export default BerandaPage;
