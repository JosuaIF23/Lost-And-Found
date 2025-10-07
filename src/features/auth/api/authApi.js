import apiHelper from "../../../helpers/apiHelper";

// 🔹 Gunakan variabel global dari vite.config.js
// Pastikan di vite.config.js sudah ada:
// define: { DELCOM_BASEURL: JSON.stringify(env.VITE_DELCOM_BASEURL || ""), }
const authApi = (() => {
  // Base URL global untuk auth endpoints
  const BASE_URL = `${DELCOM_BASEURL}/auth`;

  // Fungsi untuk membentuk URL lengkap
  function _url(path) {
    return `${BASE_URL}${path}`;
  }

  // 🔹 Fungsi untuk melakukan pendaftaran pengguna baru
  async function postRegister(name, email, password) {
    const response = await apiHelper.fetchData(_url("/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const { success, message } = await response.json();
    if (!success) throw new Error(message);

    return message; // kembalikan pesan sukses dari server
  }

  // 🔹 Fungsi untuk melakukan login pengguna
  async function postLogin(email, password) {
    const response = await apiHelper.fetchData(_url("/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);

    return data; // biasanya berisi { token, user, ... }
  }

  // 🔹 Ekspos fungsi-fungsi publik modul ini
  return {
    postRegister,
    postLogin,
  };
})();

export default authApi;
