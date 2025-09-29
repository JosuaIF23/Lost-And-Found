import apiHelper from "../../../helpers/apiHelper";

const lostFoundApi = (() => {
  const BASE_URL = "https://open-api.delcom.org/api/v1/lost-founds";

  function _url(path = "") {
    return BASE_URL + path;
  }

  // Add New Lost & Found
  async function postLostFound(title, description, status) {
    const response = await apiHelper.fetchData(_url(""), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ title, description, status }),
    });

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data; // { lost_found_id }
  }

  // Change Cover
  async function postLostFoundCover(lostFoundId, cover) {
    const formData = new FormData();
    formData.append("cover", cover, cover.name);

    const response = await apiHelper.fetchData(_url(`/${lostFoundId}/cover`), {
      method: "POST",
      body: formData,
    });

    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  // Update Lost & Found
  async function putLostFound(lostFoundId, title, description, status, is_completed) {
    const response = await apiHelper.fetchData(_url(`/${lostFoundId}`), {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ title, description, status, is_completed }),
    });

    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  // Get All Lost & Founds
  async function getLostFounds(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await apiHelper.fetchData(_url(query ? `?${query}` : ""), {
      method: "GET",
    });

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.lost_founds || [];
  }

  // Get Detail
  async function getLostFoundById(lostFoundId) {
    const response = await apiHelper.fetchData(_url(`/${lostFoundId}`), {
      method: "GET",
    });

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.lost_found;
  }

  // Delete Lost & Found
  async function deleteLostFound(lostFoundId) {
    const response = await apiHelper.fetchData(_url(`/${lostFoundId}`), {
      method: "DELETE",
    });

    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  // Get Stats Daily
  async function getStatsDaily(end_date, total_data) {
    const response = await apiHelper.fetchData(
      _url(`/stats/daily?end_date=${encodeURIComponent(end_date)}&total_data=${total_data}`),
      { method: "GET" }
    );

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }

  // Get Stats Monthly
  async function getStatsMonthly(end_date, total_data) {
    const response = await apiHelper.fetchData(
      _url(`/stats/monthly?end_date=${encodeURIComponent(end_date)}&total_data=${total_data}`),
      { method: "GET" }
    );

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }

  return {
    postLostFound,
    postLostFoundCover,
    putLostFound,
    getLostFounds,
    getLostFoundById,
    deleteLostFound,
    getStatsDaily,
    getStatsMonthly,
  };
})();

export default lostFoundApi;
