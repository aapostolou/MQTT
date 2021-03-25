export const SENDING_PUBLISH_REQUEST_TO_SERVER =
  "SENDING_PUBLISH_REQUEST_TO_SERVER";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const HANDLE_AUTHENTICATE_USER = "HANDLE_AUTHENTICATE_USER";

export const handleAuthenticateUser = (payload) => ({
  type: HANDLE_AUTHENTICATE_USER,
  payload,
});

export const SENDING_AUTHENTICATION_REQUEST_TO_SERVER =
  "SENDING_AUTHENTICATION_REQUEST_TO_SERVER";

export const WEBSERVER_CONNECTED = "WEBSERVER_CONNECTED";
export const HANDLE_WEBSERVER_CONNECTED = "HANDLE_WEBSERVER_CONNECTED";

export const handleWebserverConnected = () => ({
  type: HANDLE_WEBSERVER_CONNECTED,
});

export const WEBSERVER_DISCONNECTED = "WEBSERVER_DISCONNECTED";
export const HANDLE_WEBSERVER_DISCONNECTED = "HANDLE_WEBSERVER_DISCONNECTED";

export const handleWebserverDisconnected = () => ({
  type: HANDLE_WEBSERVER_DISCONNECTED,
});

export const MQTT_CONNECTED = "MQTT_CONNECTED";
export const HANDLE_MQTT_CONNECTED = "HANDLE_MQTT_CONNECTED";

export const handleMqttConnected = () => ({
  type: HANDLE_MQTT_CONNECTED,
});

export const MQTT_DISCONNECTED = "MQTT_DISCONNECTED";
export const HANDLE_MQTT_DISCONNECTED = "HANDLE_MQTT_DISCONNECTED";

export const handleMqttDiconnected = () => ({
  type: HANDLE_MQTT_DISCONNECTED,
});

export const HANDLE_DISPATCH_ACTION = "HANDLE_DISPATCH_ACTION";

export const handleDispatchAction = (payload) => ({
  type: HANDLE_DISPATCH_ACTION,
  payload,
});
