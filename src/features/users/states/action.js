import { showErrorDialog } from "../../../helpers/toolsHelper";
import userApi from "../api/userApi";

//kalau nilainya boolean tambahkan IS kalau lebih dari boolean tidak perlu IS
export const ActionType = {
  SET_USERS: "SET_USERS",
  SET_USER: "SET_USER",
  SET_PROFILE: "SET_PROFILE",
  SET_IS_PROFILE: "SET_IS_PROFILE",
  SET_IS_CHANGE_PROFILE: "SET_IS_CHANGE_PROFILE",
  SET_IS_CHANGE_PROFILE_PHOTO: "SET_IS_CHANGE_PROFILE_PHOTO",
  SET_IS_CHANGE_PROFILE_PASSWORD: "SET_IS_CHANGE_PROFILE_PASSWORD",
};

//get all users
export function setUsersActionCreator(users) {
  return {
    type: ActionType.SET_USERS,
    payload: users,
  };
}

export function asyncSetUsers() {
  return async (dispatch) => {
    try {
      const users = await userApi.getUser();
      dispatch(setUsersActionCreator([]));
    } catch (error) {
      dispatch(setUsersActionCreator([]));
    }
  };
}

//get user by id

export function setUserActionCreator(user) {
  return {
    type: ActionType.SET_USER,
    payload: user,
  };
}

export function asyncSetUserById(userId) {
  return async (dispatch) => {
    try {
      const user = await userApi.getUserById(userId);
      dispatch(setUserActionCreator(user));
    } catch (error) {
      dispatch(setUserActionCreator);
    }
  };
}

//get user profile

export function setProfileActionCreator(profile) {
  return {
    type: ActionType.SET_PROFILE,
    payload: profile,
  };
}

export function setIsProfile(isProfile) {
  return {
    type: ActionType.SET_IS_PROFILE,
    payload: isProfile,
  };
}

export function asyncSetProfile() {
  return async (dispatch) => {
    try {
      const profile = await userApi.getProfile();
      dispatch(setProfileActionCreator(profile));
    } catch (error) {
      dispatch(setProfileActionCreator(null));
    }
    dispatch(setIsProfile(true));
  };
}

// put profile

export function setIsChangeProfileActionCreator(isChage) {
  return {
    type: ActionType.SET_IS_CHANGE_PROFILE,
    payload: isChage,
  };
}

export function asyncPutProfile(name, email) {
  return async (dispatch) => {
    try {
      const profile = await userApi.putProfile(name, email);
      dispatch(setProfileActionCreator(profile));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(setIsChangeProfileActionCreator(true));
  };
}

// Post profile photo
export function setIsChangeProfilePhotoActionCreator(isChange) {
  return {
    type: ActionType.SET_IS_CHANGE_PROFILE_PHOTO,
    payload: isChange,
  };
}

export function asyncPostProfilePhoto(photo) {
  return async (dispatch) => {
    try {
      await userApi.postProfilePhoto(photo);
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(setIsChangeProfilePhotoActionCreator(true));
  };
}

//gamti password
export function setIsChangeProfilePasswordActionCreator(isChage) {
  return {
    type: ActionType.SET_IS_CHANGE_PROFILE_PASSWORD,
    payload: isChage,
  };
}

export function asyncPutProfilePassword(oldPassword, newPassword) {
  return async (dispatch) => {
    try {
      await userApi.putProfilePassword(oldPassword, newPassword);
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(setIsChangeProfilePasswordActionCreator(true));
  };
}
