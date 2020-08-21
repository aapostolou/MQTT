// GENERAL
export const NO_ACTION = "NO_ACTION";

export const RESET = "RESET";
export const HANDLE_RESET = "RESET";

// Language
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const HANDLE_CHANGE_LANGUAGE = "HANDLE_CHANGE_LANGUAGE";

// Sidebar
export const OPEN_SIDEBAR = "OPEN_SIDEBAR";
export const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";
export const HANDLE_TOGGLE_SIDEBAR = "HANDLE_TOGGLE_SIDEBAR";

// Socket.io
export const HANDLE_CHANGE_SEED = "HANDLE_CHANGE_SEED";

// Swipe
export const HANDLE_SWIPE_LEFT = "HANDLE_SWIPE_LEFT";
export const HANDLE_SWIPE_RIGHT = "HANDLE_SWIPE_RIGHT";
export const HANDLE_SWIPE_UP = "HANDLE_SWIPE_UP";
export const HANDLE_SWIPE_DOWN = "HANDLE_SWIPE_DOWN";

/* ------------ */
/* - HANDLERS - */
/* ------------ */

// GENEREAL
export const handleReset = () => ({
  type: HANDLE_RESET,
});

// Language
export const handleChangeLanguage = (payload) => ({
  type: HANDLE_CHANGE_LANGUAGE,
  payload,
});

// Sidebar
export const handleToggleSidebar = () => ({
  type: HANDLE_TOGGLE_SIDEBAR,
});

// Socket.io Action Handler
export const handleAction = (payload) => ({
  type: payload.type || NO_ACTION,
  payload: payload.payload,
});

// Swipe
export const handleSwipeLeft = () => ({
  type: HANDLE_SWIPE_LEFT,
});
export const handleSwipeRight = () => ({
  type: HANDLE_SWIPE_RIGHT,
});
export const handleSwipeUp = () => ({
  type: HANDLE_SWIPE_UP,
});
export const handleSwipeDown = () => ({
  type: HANDLE_SWIPE_DOWN,
});
