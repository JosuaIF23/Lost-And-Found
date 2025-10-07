import apiHelper from "../../../helpers/apiHelper";
import dayjs from "dayjs";

const lostFoundApi = (() => {

  const BASE_URL = `${DELCOM_BASEURL}/lost-founds`;

  // Fungsi untuk membentuk URL lengkap
  function _url(path = "") {
    return `${BASE_URL}${path}`;
  }

  // ---------------- ADD ----------------
  async function postLostFound(title, description, status) {
    const response = await apiHelper.fetchData(_url(""), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ title, description, status }),
    });

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.lost_found_id;
  }

  // ---------------- COVER ----------------
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

  // ---------------- UPDATE ----------------
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

  // ---------------- LIST ----------------
  async function getLostFounds(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await apiHelper.fetchData(_url(query ? `?${query}` : ""), {
      method: "GET",
    });

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.lost_founds || [];
  }

  // ---------------- DETAIL ----------------
  async function getLostFoundById(lostFoundId) {
    const response = await apiHelper.fetchData(_url(`/${lostFoundId}`), {
      method: "GET",
    });

    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.lost_found;
  }

  // ---------------- DELETE ----------------
  async function deleteLostFound(lostFoundId) {
    const response = await apiHelper.fetchData(_url(`/${lostFoundId}`), {
      method: "DELETE",
    });

    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  // ---------------- STATS DAILY ----------------
  async function getStatsDaily(end_date, total_data) {
    const formatted = dayjs(end_date).format("YYYY-MM-DD HH:mm:ss");

    const response = await apiHelper.fetchData(
      _url(`/stats/daily?end_date=${formatted}&total_data=${total_data}`),
      { method: "GET" }
    );

    const text = await response.text();
    try {
      const { success, message, data } = JSON.parse(text);
      if (!success) throw new Error(message);
      return data;
    } catch (e) {
      throw new Error("Invalid JSON from API: " + text);
    }
  }

  // ---------------- STATS MONTHLY ----------------
  async function getStatsMonthly(end_date, total_data) {
    const formatted = dayjs(end_date).format("YYYY-MM-DD HH:mm:ss");

    const response = await apiHelper.fetchData(
      _url(`/stats/monthly?end_date=${formatted}&total_data=${total_data}`),
      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    const text = await response.text();
    try {
      const { success, message, data } = JSON.parse(text);
      if (!success) throw new Error(message);
      return data;
    } catch (e) {
      throw new Error("Invalid JSON from API: " + text);
    }
  }

  // ---------------- Exports ----------------
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
