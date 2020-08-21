import { map, debounceTime } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";

import {
  NO_ACTION,
  RESET,
  HANDLE_RESET,
  CHANGE_LANGUAGE,
  HANDLE_CHANGE_LANGUAGE,
  HANDLE_TOGGLE_SIDEBAR,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  HANDLE_SWIPE_LEFT,
  HANDLE_SWIPE_RIGHT,
  HANDLE_SWIPE_UP,
  HANDLE_SWIPE_DOWN,
  HANDLE_CHANGE_SEED,
} from "./actions";

import { availableLanguages } from "./reducers";
import { getCookie, setCookie } from "utils/cookies";

//? GENERAL
const handleResetEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_RESET),
    map((action) => {
      return {
        type: RESET,
      };
    })
  );

// Language
const handleChangeLanguageEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_CHANGE_LANGUAGE),
    map((action) => {
      const { payload } = action;

      if (availableLanguages.contains(payload)) {
        return {
          type: CHANGE_LANGUAGE,
          payload,
        };
      }
    })
  );

// Sidebar
const handleToggleSidebarEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_TOGGLE_SIDEBAR),
    map((action) => {
      return {
        type: state$.value.sidebar.isOpen ? CLOSE_SIDEBAR : OPEN_SIDEBAR,
      };
    })
  );

// Swipe
const handleSwipeLeftEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_SWIPE_LEFT),
    map((action) => {
      const { sidebar } = state$.value;

      if (sidebar.isOpen) return { type: CLOSE_SIDEBAR };
      else return { type: NO_ACTION };
    })
  );
const handleSwipeRightEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_SWIPE_RIGHT),
    map((action) => {
      const { sidebar } = state$.value;

      if (!sidebar.isOpen) return { type: OPEN_SIDEBAR };
      else return { type: NO_ACTION };
    })
  );
const handleSwipeUpEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_SWIPE_UP),
    map((action) => {
      return { type: NO_ACTION };
    })
  );
const handleSwipeDownEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_SWIPE_DOWN),
    map((action) => {
      return { type: NO_ACTION };
    })
  );

// Socket.io
const handleChangeSeedEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_CHANGE_SEED),
    map((action) => {
      const seed = action.payload;

      if (getCookie("seed") !== seed) {
        setCookie("seed", seed);
        window.location.reload(true);
      }
      return { type: NO_ACTION };
    })
  );

const rootEpic = combineEpics(
  handleResetEpic,
  handleChangeLanguageEpic,
  handleToggleSidebarEpic,
  handleSwipeLeftEpic,
  handleSwipeRightEpic,
  handleSwipeUpEpic,
  handleSwipeDownEpic,
  handleChangeSeedEpic
);

export default rootEpic;
