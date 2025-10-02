import lostFoundApi from "../api/lostFoundApi";
import {
  showErrorDialog,
  showSuccessDialog,
} from "../../../helpers/toolsHelper";

export const ActionType = {
  SET_LOSTFOUNDS: "SET_LOSTFOUNDS",
  SET_LOSTFOUND: "SET_LOSTFOUND",
  SET_IS_LOSTFOUND: "SET_IS_LOSTFOUND",
  SET_IS_LOSTFOUND_ADD: "SET_IS_LOSTFOUND_ADD",
  SET_IS_LOSTFOUND_ADDED: "SET_IS_LOSTFOUND_ADDED",
  SET_IS_LOSTFOUND_CHANGE: "SET_IS_LOSTFOUND_CHANGE",
  SET_IS_LOSTFOUND_CHANGED: "SET_IS_LOSTFOUND_CHANGED",
  SET_IS_LOSTFOUND_CHANGE_COVER: "SET_IS_LOSTFOUND_CHANGE_COVER",
  SET_IS_LOSTFOUND_CHANGED_COVER: "SET_IS_LOSTFOUND_CHANGED_COVER",
  SET_IS_LOSTFOUND_DELETE: "SET_IS_LOSTFOUND_DELETE",
  SET_IS_LOSTFOUND_DELETED: "SET_IS_LOSTFOUND_DELETED",
  SET_STATS_DAILY: "SET_STATS_DAILY",
  SET_STATS_MONTHLY: "SET_STATS_MONTHLY",
};

// ---------------- LIST ----------------
export function setLostFoundsActionCreator(lostFounds) {
  return { type: ActionType.SET_LOSTFOUNDS, payload: lostFounds };
}

export function asyncSetLostFounds(params = {}) {
  return async (dispatch) => {
    try {
      const lostFounds = await lostFoundApi.getLostFounds(params);
      dispatch(setLostFoundsActionCreator(lostFounds));
    } catch (error) {
      showErrorDialog(error.message);
      dispatch(setLostFoundsActionCreator([]));
    }
  };
}

// ---------------- DETAIL ----------------
export function setLostFoundActionCreator(lostFound) {
  return { type: ActionType.SET_LOSTFOUND, payload: lostFound };
}

export function setIsLostFoundActionCreator(status) {
  return { type: ActionType.SET_IS_LOSTFOUND, payload: status };
}

export function asyncSetLostFound(lostFoundId) {
  return async (dispatch) => {
    try {
      const lostFound = await lostFoundApi.getLostFoundById(lostFoundId);
      dispatch(setLostFoundActionCreator(lostFound));
    } catch (error) {
      showErrorDialog(error.message);
      dispatch(setLostFoundActionCreator(null));
    }
    dispatch(setIsLostFoundActionCreator(true));
  };
}

// ---------------- ADD ----------------
export function setIsLostFoundAddActionCreator(status) {
  return { type: ActionType.SET_IS_LOSTFOUND_ADD, payload: status };
}

export function setIsLostFoundAddedActionCreator(status) {
  return { type: ActionType.SET_IS_LOSTFOUND_ADDED, payload: status };
}

export function asyncSetIsLostFoundAdd(title, description, status) {
  return async (dispatch) => {
    try {
      await lostFoundApi.postLostFound(title, description, status);
      showSuccessDialog("Lost & Found berhasil ditambahkan");
      dispatch(setIsLostFoundAddedActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
      dispatch(setIsLostFoundAddedActionCreator(false));
    }
    dispatch(setIsLostFoundAddActionCreator(true));
  };
}

// ---------------- UPDATE ----------------
export function setIsLostFoundChangeActionCreator(status) {
  return { type: ActionType.SET_IS_LOSTFOUND_CHANGE, payload: status };
}

export function setIsLostFoundChangedActionCreator(status) {
  return { type: ActionType.SET_IS_LOSTFOUND_CHANGED, payload: status };
}

export function asyncSetIsLostFoundChange(
  lostFoundId,
  title,
  description,
  status,
  is_completed
) {
  return async (dispatch) => {
    try {
      const message = await lostFoundApi.putLostFound(
        lostFoundId,
        title,
        description,
        status,
        is_completed
      );
      showSuccessDialog(message);
      dispatch(setIsLostFoundChangedActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(setIsLostFoundChangeActionCreator(true));
  };
}

// ---------------- CHANGE COVER ----------------
export function setIsLostFoundChangeCoverActionCreator(status) {
  return { type: ActionType.SET_IS_LOSTFOUND_CHANGE_COVER, payload: status };
}

export function setIsLostFoundChangedCoverActionCreator(status) {
  return { type: ActionType.SET_IS_LOSTFOUND_CHANGED_COVER, payload: status };
}

export function asyncSetIsLostFoundChangeCover(lostFoundId, cover) {
  return async (dispatch) => {
    try {
      const message = await lostFoundApi.postLostFoundCover(lostFoundId, cover);
      showSuccessDialog(message);
      dispatch(setIsLostFoundChangedCoverActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(setIsLostFoundChangeCoverActionCreator(true));
  };
}

// ---------------- DELETE ----------------
export function setIsLostFoundDeleteActionCreator(status) {
  return { type: ActionType.SET_IS_LOSTFOUND_DELETE, payload: status };
}

export function setIsLostFoundDeletedActionCreator(status) {
  return { type: ActionType.SET_IS_LOSTFOUND_DELETED, payload: status };
}

export function asyncSetIsLostFoundDelete(lostFoundId) {
  return async (dispatch) => {
    try {
      const message = await lostFoundApi.deleteLostFound(lostFoundId);
      showSuccessDialog(message);
      dispatch(setIsLostFoundDeletedActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(setIsLostFoundDeleteActionCreator(true));
  };
}

export function setStatsDaily(daily) {
  return { type: ActionType.SET_STATS_DAILY, payload: daily };
}

export function setStatsMonthly(monthly) {
  return { type: ActionType.SET_STATS_MONTHLY, payload: monthly };
}

export function asyncSetStatsDaily(endDate, total) {
  return async (dispatch) => {
    try {
      const data = await lostFoundApi.getStatsDaily(endDate, total);
      dispatch(setStatsDaily(data));
    } catch (err) {
      console.error("Stats daily error", err);
      dispatch(setStatsDaily(null));
    }
  };
}

export function asyncSetStatsMonthly(endDate, total) {
  return async (dispatch) => {
    try {
      const data = await lostFoundApi.getStatsMonthly(endDate, total);
      dispatch(setStatsMonthly(data));
    } catch (err) {
      console.error("Stats monthly error", err);
      dispatch(setStatsMonthly(null));
    }
  };
}
