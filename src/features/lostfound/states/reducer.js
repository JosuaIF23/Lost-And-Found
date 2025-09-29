import { ActionType } from "./action";

export function lostFoundsReducer(state = [], action) {
  switch (action.type) {
    case ActionType.SET_LOSTFOUNDS:
      return action.payload;
    default:
      return state;
  }
}

export function lostFoundReducer(state = null, action) {
  switch (action.type) {
    case ActionType.SET_LOSTFOUND:
      return action.payload;
    default:
      return state;
  }
}

export function isLostFoundReducer(state = false, action) {
  switch (action.type) {
    case ActionType.SET_IS_LOSTFOUND:
      return action.payload;
    default:
      return state;
  }
}

export function isLostFoundAddReducer(state = false, action) {
  switch (action.type) {
    case ActionType.SET_IS_LOSTFOUND_ADD:
      return action.payload;
    default:
      return state;
  }
}

export function isLostFoundAddedReducer(state = false, action) {
  switch (action.type) {
    case ActionType.SET_IS_LOSTFOUND_ADDED:
      return action.payload;
    default:
      return state;
  }
}

export function isLostFoundChangeReducer(state = false, action) {
  switch (action.type) {
    case ActionType.SET_IS_LOSTFOUND_CHANGE:
      return action.payload;
    default:
      return state;
  }
}

export function isLostFoundChangedReducer(state = false, action) {
  switch (action.type) {
    case ActionType.SET_IS_LOSTFOUND_CHANGED:
      return action.payload;
    default:
      return state;
  }
}

export function isLostFoundChangeCoverReducer(state = false, action) {
  switch (action.type) {
    case ActionType.SET_IS_LOSTFOUND_CHANGE_COVER:
      return action.payload;
    default:
      return state;
  }
}

export function isLostFoundChangedCoverReducer(state = false, action) {
  switch (action.type) {
    case ActionType.SET_IS_LOSTFOUND_CHANGED_COVER:
      return action.payload;
    default:
      return state;
  }
}

export function isLostFoundDeleteReducer(state = false, action) {
  switch (action.type) {
    case ActionType.SET_IS_LOSTFOUND_DELETE:
      return action.payload;
    default:
      return state;
  }
}

export function isLostFoundDeletedReducer(state = false, action) {
  switch (action.type) {
    case ActionType.SET_IS_LOSTFOUND_DELETED:
      return action.payload;
    default:
      return state;
  }
}
