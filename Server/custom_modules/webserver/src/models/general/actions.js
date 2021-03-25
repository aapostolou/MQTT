/* Screen */
export const SCREEN_UPDATE_TO_MOBILE = "SCREEN_UPDATE_TO_MOBILE";
export const HANDLE_SCREEN_UPDATE_TO_MOBILE = "HANDLE_SCREEN_UPDATE_TO_MOBILE";

export const handleScreenToMobile = () => ({
  type: HANDLE_SCREEN_UPDATE_TO_MOBILE
});

export const SCREEN_UPDATE_TO_DESKTOP = "SCREEN_UPDATE_TO_DESKTOP";
export const HANDLE_SCREEN_UPDATE_TO_DESKTOP =
  "HANDLE_SCREEN_UPDATE_TO_DESKTOP";

export const handleScreenToDesktop = () => ({
  type: HANDLE_SCREEN_UPDATE_TO_DESKTOP
});

/* Control Panel */
export const CONTROL_PANEL_OPEN = "CONTROL_PANEL_OPEN";
export const HANDLE_CONTROL_PANEL_OPEN = "HANDLE_CONTROL_PANEL_OPEN";

export const handleControlPanelOpen = () => ({
  type: HANDLE_CONTROL_PANEL_OPEN
});

export const CONTROL_PANEL_CLOSE = "CONTROL_PANEL_CLOSE";
export const HANDLE_CONTROL_PANEL_CLOSE = "HANDLE_CONTROL_PANEL_CLOSE";

export const handleControlPanelClose = () => ({
  type: HANDLE_CONTROL_PANEL_CLOSE
});

/* Constructor */
export const CONSTRUCTOR_OPEN = "CONSTRUCTOR_OPEN";
export const HANDLE_CONSTRUCTOR_OPEN = "HANDLE_CONSTRUCTOR_OPEN";

export const handleConstructorOpen = () => ({
  type: HANDLE_CONSTRUCTOR_OPEN
});

export const CONSTRUCTOR_CLOSE = "CONSTRUCTOR_CLOSE";
export const HANDLE_CONSTRUCTOR_CLOSE = "HANDLE_CONSTRUCTOR_CLOSE";

export const handleConstructorClose = () => ({
  type: HANDLE_CONSTRUCTOR_CLOSE
});
