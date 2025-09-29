import { configureStore } from "@reduxjs/toolkit";

// Auth reducers
import {
  isAuthLoginReducer,
  isAuthRegisterReducer,
} from "./features/auth/states/reducer";

// Users reducers
import {
  usersReducer,
  userReducer,
  profileReducer,
  isProfileReducer,
  isChangeProfileReducer,
  isChangeProfilePhotoReducer,
  isChangeProfilePasswordReducer,
} from "./features/users/states/reducer";

// Lost & Found reducers
import * as lostFoundReducer from "./features/lostfound/states/reducer";

const store = configureStore({
  reducer: {
    // Auth
    isAuthLogin: isAuthLoginReducer,
    isAuthRegister: isAuthRegisterReducer,

    // Users
    users: usersReducer,
    user: userReducer,
    profile: profileReducer,
    isProfile: isProfileReducer,
    isChangeProfile: isChangeProfileReducer,
    isChangeProfilePhoto: isChangeProfilePhotoReducer,
    isChangeProfilePassword: isChangeProfilePasswordReducer,

    // Lost & Found
    lostFounds: lostFoundReducer.lostFoundsReducer,
    lostFound: lostFoundReducer.lostFoundReducer,
    isLostFound: lostFoundReducer.isLostFoundReducer,
    isLostFoundAdd: lostFoundReducer.isLostFoundAddReducer,
    isLostFoundAdded: lostFoundReducer.isLostFoundAddedReducer,
    isLostFoundChange: lostFoundReducer.isLostFoundChangeReducer,
    isLostFoundChanged: lostFoundReducer.isLostFoundChangedReducer,
    isLostFoundChangeCover: lostFoundReducer.isLostFoundChangeCoverReducer,
    isLostFoundChangedCover: lostFoundReducer.isLostFoundChangedCoverReducer,
    isLostFoundDelete: lostFoundReducer.isLostFoundDeleteReducer,
    isLostFoundDeleted: lostFoundReducer.isLostFoundDeletedReducer,
  },
});

export default store;
