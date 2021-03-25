import { combineReducers } from "redux";

import {
  SCREEN_UPDATE_TO_MOBILE,
  SCREEN_UPDATE_TO_DESKTOP,
  CONTROL_PANEL_CLOSE,
  CONTROL_PANEL_OPEN,
  CONSTRUCTOR_OPEN,
  CONSTRUCTOR_CLOSE
} from "./actions";

/* SCREEN */
const initialScreenState = {
  isMobile: null
};

const screenReducer = (state = initialScreenState, action) => {
  switch (action.type) {
    case SCREEN_UPDATE_TO_MOBILE:
      return { ...state, isMobile: true };
    case SCREEN_UPDATE_TO_DESKTOP:
      return { ...state, isMobile: false };
    default:
      return state;
  }
};

/* CONTROL PANEL */
const initialControlPanelState = {
  isOpen: false
};

const controlPanelReducer = (state = initialControlPanelState, action) => {
  switch (action.type) {
    case CONTROL_PANEL_OPEN:
      return { ...state, isOpen: true };
    case CONTROL_PANEL_CLOSE:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

/* Constructor */
const initialConstructorState = {
  isOpen: false
};

const constructorReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_OPEN:
      return { ...state, isOpen: true };
    case CONSTRUCTOR_CLOSE:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  screen: screenReducer,
  controlPanel: controlPanelReducer,
  field_constructor: constructorReducer
});
