import { combineReducers } from "redux";

import { RESET } from "models/general/actions";

import {
  AUTHENTICATE_USER,
  WEBSERVER_CONNECTED,
  WEBSERVER_DISCONNECTED,
  MQTT_CONNECTED,
  MQTT_DISCONNECTED,
  WEBSERVER_SOCKET_INIT,
} from "./actions";

/* - MQTT - */
const initialMqttServerState = {
  isConnected: false,
};

const mqttServerReducer = (state = initialMqttServerState, action) => {
  switch (action.type) {
    case MQTT_CONNECTED:
      return { ...state, isConnected: true };
    case MQTT_DISCONNECTED:
      return { ...state, isConnected: false };
    default:
      return state;
  }
};

/* - WEBSERVER - */
const initialWebserverServerState = {
  isConnected: false,
  isAdmin: false,
  socket: null,
};

const webserverServerReducer = (
  state = initialWebserverServerState,
  action
) => {
  switch (action.type) {
    case WEBSERVER_SOCKET_INIT:
      return { ...state, socket: action.payload.socket };
    case WEBSERVER_CONNECTED:
      return { ...state, isConnected: true };
    case WEBSERVER_DISCONNECTED:
      return { ...state, isConnected: false };
    case AUTHENTICATE_USER:
      return { ...state, isAdmin: true };
    case RESET:
      return {
        ...state,
        isAdmin: false,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  MQTT: mqttServerReducer,
  WEBSERVER: webserverServerReducer,
});
