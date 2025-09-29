import apiHelper from "../../../helpers/apiHelper";

const authApi = (() => {
  const BASE_URL = "https://open-api.delcom.org/api/v1";

  function _url(path) {
    return BASE_URL + path;
  }

  async function postRegister(name, email, password) {
    const response = await apiHelper.fetchData(_url("/auth/register"), {   // ✅ fix endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  async function postLogin(email, password) {
    const response = await apiHelper.fetchData(_url("/auth/login"), {      // ✅ fix endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);

    return data; // { token, user, ... }
  }

  return {
    postRegister,
    postLogin,
  };
})();

export default authApi;
