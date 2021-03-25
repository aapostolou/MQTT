import { map } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";

import { isTypeOf } from "helpers";

import {
  CONSTRUCTOR_OPEN,
  CONSTRUCTOR_CLOSE,
  CONTROL_PANEL_CLOSE,
  CONTROL_PANEL_OPEN,
  HANDLE_CONSTRUCTOR_CLOSE,
  HANDLE_CONSTRUCTOR_OPEN,
  HANDLE_CONTROL_PANEL_CLOSE,
  HANDLE_CONTROL_PANEL_OPEN,
  HANDLE_SCREEN_UPDATE_TO_DESKTOP,
  HANDLE_SCREEN_UPDATE_TO_MOBILE,
  SCREEN_UPDATE_TO_DESKTOP,
  SCREEN_UPDATE_TO_MOBILE
} from "models/general/actions";

/* SCREEN */
const handleScreenToDesktopEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_SCREEN_UPDATE_TO_DESKTOP),
    map((action) => {
      return {
        type: SCREEN_UPDATE_TO_DESKTOP
      };
    })
  );

const handleScreenToMobileEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_SCREEN_UPDATE_TO_MOBILE),
    map((action) => {
      return {
        type: SCREEN_UPDATE_TO_MOBILE
      };
    })
  );

/* CONTROL PANEL */
const handleControlPanelOpenEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_CONTROL_PANEL_OPEN),
    map((action) => {
      return {
        type: CONTROL_PANEL_OPEN
      };
    })
  );

const handleControlPanelCloseEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_CONTROL_PANEL_CLOSE),
    map((action) => {
      return {
        type: CONTROL_PANEL_CLOSE
      };
    })
  );

/* CONSTRUCTOR */
const handleConstructorOpenEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_CONSTRUCTOR_OPEN),
    map((action) => {
      return {
        type: CONSTRUCTOR_OPEN
      };
    })
  );

const handleConstructorCloseEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_CONSTRUCTOR_CLOSE),
    map((action) => {
      return {
        type: CONSTRUCTOR_CLOSE
      };
    })
  );

export const rootEpic = combineEpics(
  handleScreenToDesktopEpic,
  handleScreenToMobileEpic,
  handleControlPanelOpenEpic,
  handleControlPanelCloseEpic,
  handleConstructorOpenEpic,
  handleConstructorCloseEpic
);
