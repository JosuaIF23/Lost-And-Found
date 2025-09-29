import apiHelper from "../../../helpers/apiHelper";
import { showErrorDialog, showSuccessDialog } from "../../../helpers/toolsHelper";
import authApi from "../api/authApi";

export const ActionType = {
  SET_IS_AUTH_LOGIN: "SET_IS_AUTH_LOGIN",
  SET_IS_AUTH_REGISTER: "SET_IS_AUTH_REGISTER",
};

// ✅ Login
export function setIsAuthLoginActionCreator(isAuthLogin) {
  return {
    type: ActionType.SET_IS_AUTH_LOGIN,
    payload: isAuthLogin,
  };
}

export function asyncSetIsAuthLogin(email, password) {
  return async (dispatch) => {
    try {
      const data = await authApi.postLogin(email, password);
      apiHelper.putAccessToken(data.token);
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(setIsAuthLoginActionCreator(true));
  };
}

// ✅ Register
export function setIsAuthRegisterActionCreator(isAuthRegister) {
  return {
    type: ActionType.SET_IS_AUTH_REGISTER,
    payload: isAuthRegister,
  };
}

export function asyncSetIsAuthRegister(name, email, password) {
  return async (dispatch) => {
    try {
      const message = await authApi.postRegister(name, email, password);
      showSuccessDialog(message);
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(setIsAuthRegisterActionCreator(true));
  };
}
