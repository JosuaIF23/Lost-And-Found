import { body } from "framer-motion/client";
import apiHelper from "../../../helpers/apiHelper";

const lostFoundApi = (() => {
  const BASE_URL = "https://open-api.delcom.org/api/v1";

  function _url(path) {
    return BASE_URL + path;
  }

  //POST Lost and Found
  async function postFLostFound(title, description, status) {
    const response = await apiHelper.fetchData(_url(""), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",

        //Kenapa tidak pakai JSON Stringfy??????????????????????
      },
      body: new URLSearchParams({
        title,
        description,
        status,
      }),
    });

    const { success, message, data } = response;
    if (!success) throw new Error(message);
    return data;
  }
})();
