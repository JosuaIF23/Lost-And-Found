import { body } from "framer-motion/client";
import apiHelper from "../../../helpers/apiHelper";

const userApi = (() => {
  const BASE_URL = "https://open-api.delcom.org/api/v1";

  function _url(path) {
    return BASE_URL + path;
  }

  async function getUsers() {
    const response = await apiHelper.fetchData(_url("/"), {
      method: "GET",
    });

    const { success, message, data } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    return data.users || [];
  }

  async function getUserById(useId) {
    const response = await apiHelper.fetchData(_url(`/${useId}`), {
      method: "GET",
    });

    const { success, message, data } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    return data.user;
  }

  async function getProfile() {
    const response = await apiHelper.fetchData(_url("/me"), {
      method: "GET",
    });

    const { success, message, data } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    return data.user;
  }

  async function putProfile(name, email) {
    const response = await apiHelper.fetchData(_url("/me"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    const { success, message, data } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    return data.user;
  }

  async function postProfilePhoto(photo) {
    const formData = new FormData();
    formData.append("photo", photo, "profile.png");
    const response = await apiHelper.fetchData(_url("/photo"), {
      method: "POST",
      body: formData,
    });

    const { success, message } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    return message;
  }

  async function putProfilePassword(password, new_password) {
    const response = await apiHelper.fetchData(_url("/password"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        new_password,
      }),
    });

    const { success, message } = await response.json();
    if (!success) {
      throw new Error(message);
    }

    return message;
  }

  return {
    getProfile,
    getUserById,
    getUsers,
    postProfilePhoto,
    putProfilePassword,
    putProfile,
  };
})();

export default userApi;
