import { combineReducers } from "redux";

import { RESET, CHANGE_LANGUAGE, OPEN_SIDEBAR, CLOSE_SIDEBAR } from "./actions";

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
};

const sidebarReducer = (state = initialSidebarState, action) => {
  switch (action.type) {
    case RESET:
      return initialSidebarState;
    case OPEN_SIDEBAR:
      return { ...state, isOpen: true };
    case CLOSE_SIDEBAR:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  language: languageReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
