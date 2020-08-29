// GENERAL
export const ACTION = "ACTION";
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
export const INITIALIZE_SOCKET = "INITIALIZE_SOCKET";
export const HANDLE_SEND_ACTION = "HANDLE_SEND_ACTION";
export const HANDLE_ADMIN_PASSWORD = "HANDLE_ADMIN_PASSWORD";
export const ENABLE_ADMIN = "ENABLE_ADMIN";
export const HANDLE_ENABLE_ADMIN = "HANDLE_ENABLE_ADMIN";
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
export const handleInitializeSocket = (payload) => ({
  type: INITIALIZE_SOCKET,
  payload
});
export const handleSendAction = (action) => ({
  type: HANDLE_SEND_ACTION,
  action
});
export const handleAction = (payload) => ({
  type: payload.type || NO_ACTION,
  payload: payload.payload,
});
export const handleAdminPassword = (payload) => ({
  type: HANDLE_ADMIN_PASSWORD,
  payload
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
