import apiHelper from "../../../helpers/apiHelper";

const userApi = (() => {
  // BASE URL langsung ke /users
  const BASE_URL = "https://open-api.delcom.org/api/v1/users";

  function _url(path = "") {
    return BASE_URL + path;
  }

  // GET /users
  async function getUsers() {
    const response = await apiHelper.fetchData(_url(), { method: "GET" });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.users || [];
  }

  // GET /users/:id
  async function getUserById(userId) {
    const response = await apiHelper.fetchData(_url(`/${userId}`), {
      method: "GET",
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.user;
  }

  // GET /users/me
  async function getProfile() {
    const response = await apiHelper.fetchData(_url("/me"), { method: "GET" });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.user;
  }

  // PUT /users/me
  async function putProfile(name, email) {
    const response = await apiHelper.fetchData(_url("/me"), {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ name, email }),
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.user;
  }

  // POST /users/photo
  async function postProfilePhoto(photo) {
    const formData = new FormData();
    formData.append("photo", photo, photo.name || "profile.png");
    const response = await apiHelper.fetchData(_url("/photo"), {
      method: "POST",
      body: formData,
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  // PUT /users/password
  async function putProfilePassword(password, new_password) {
    const response = await apiHelper.fetchData(_url("/password"), {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ password, new_password }),
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  return {
    getUsers,
    getUserById,
    getProfile,
    putProfile,
    postProfilePhoto,
    putProfilePassword,
  };
})();

export default userApi;
