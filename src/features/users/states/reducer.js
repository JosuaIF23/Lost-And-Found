import { act } from "react";
import { ActionType } from "./action";

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case ActionType.SET_USERS:
      return action.payload;
    default:
      return state;
  }
};

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return action.payload;
    default:
      return state;
  }
};
