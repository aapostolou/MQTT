import { combineReducers } from "redux";

import { RESET, CHANGE_LANGUAGE, OPEN_SIDEBAR, CLOSE_SIDEBAR, INITIALIZE_SOCKET, ENABLE_ADMIN } from "./actions";

//? Language Reducer
export const availableLanguages = ["EN", "GR"];

const languageReducer = (state = availableLanguages[0], action) => {
  switch (action.type) {
    case RESET:
      return availableLanguages[0];
    case CHANGE_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};

//? Sidebar
const initialSidebarState = {
  isOpen: false,
  isAdmin: false,
};

const sidebarReducer = (state = initialSidebarState, action) => {
  switch (action.type) {
    case RESET:
      return initialSidebarState;
    case OPEN_SIDEBAR:
      return { ...state, isOpen: true };
    case CLOSE_SIDEBAR:
      return { ...state, isOpen: false };
    case ENABLE_ADMIN:
      return { ...state, isAdmin: true };
    default:
      return state;
  }
};

// Socket.io
const initialSocketState = null;

const socketReducer = (state = initialSocketState, action) => {
  switch (action.type) {
    case RESET:
      return initialSocketState;
    case INITIALIZE_SOCKET:
      return state ? state : action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  language: languageReducer,
  sidebar: sidebarReducer,
  socket: socketReducer,
});

export default rootReducer;
