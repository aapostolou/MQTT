import { map } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";

import { cookies, isTypeOf } from "helpers";

import {
  HANDLE_PUBLISH_TOPIC,
  HANDLE_TOPIC_ADD,
  HANDLE_TOPIC_UPDATE,
  HANDLE_CREATE_TOPIC,
  SENDING_CREATE_TOPIC_REQUEST_TO_SERVER,
} from "models/topic/actions";

import {
  AUTHENTICATE_USER,
  HANDLE_AUTHENTICATE_USER,
  HANDLE_AUTHENTICATION_REQUEST,
  SENDING_AUTHENTICATION_REQUEST_TO_SERVER,
  SENDING_PUBLISH_REQUEST_TO_SERVER,
  HANDLE_MQTT_CONNECTED,
  MQTT_CONNECTED,
  HANDLE_MQTT_DISCONNECTED,
  MQTT_DISCONNECTED,
  HANDLE_WEBSERVER_CONNECTED,
  WEBSERVER_CONNECTED,
  HANDLE_WEBSERVER_DISCONNECTED,
  WEBSERVER_DISCONNECTED,
  HANDLE_WEBSERVER_SOCKET_INIT,
  WEBSERVER_SOCKET_INIT,
  HANDLE_DISPATCH_ACTION,
  HANDLE_SEED,
  SEED,
} from "./actions";

const handleSeedEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_SEED),
    map((action) => {
      const { payload } = action;

      console.log(payload);

      if (payload == undefined) {
        throw `${HANDLE_SEED} ~ 'payload' is not set !`;
      }
      if (payload.seed == null) {
        throw `${HANDLE_SEED} ~ 'payload' is missing a 'seed' !`;
      }
      if (!isTypeOf(payload.name) === "string") {
        throw `${HANDLE_SEED} ~ 'payload.seed' must be a 'string' !`;
      }

      if (cookies.get(SEED) == payload.seed) window.location.reload();

      return {
        type: SEED,
      };
    })
  );

const handlePublishTopicEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_PUBLISH_TOPIC),
    map((action) => {
      const { payload } = action;
      const { socket } = state$.value.server["WEBSERVER"];

      if (payload == undefined) {
        throw `${HANDLE_PUBLISH_TOPIC} ~ 'payload' is not set !`;
      }
      if (payload.name == null) {
        throw `${HANDLE_PUBLISH_TOPIC} ~ 'payload' is missing a 'name' !`;
      }
      if (!isTypeOf(payload.name) === "string") {
        throw `${HANDLE_PUBLISH_TOPIC} ~ 'payload.name' must be a 'string' !`;
      }
      if (payload.value == null) {
        throw `${HANDLE_PUBLISH_TOPIC} ~ 'payload' is missing a 'value' !`;
      }

      socket.emit(HANDLE_PUBLISH_TOPIC, {
        topic: payload.name,
        message: payload.value,
      });

      return {
        type: SENDING_PUBLISH_REQUEST_TO_SERVER,
      };
    })
  );

const handleAuthenticationRequestEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_AUTHENTICATION_REQUEST),
    map((action) => {
      const { payload } = action;

      const { socket } = state$.value.server["WEBSERVER"];

      socket.emit(HANDLE_AUTHENTICATE_USER, { password: payload });

      return {
        type: SENDING_AUTHENTICATION_REQUEST_TO_SERVER,
      };
    })
  );
const handleAuthenticateUserEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_AUTHENTICATE_USER),
    map((action) => {
      return {
        type: AUTHENTICATE_USER,
      };
    })
  );

const handleMqttConnectEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_MQTT_CONNECTED),
    map((action) => {
      return {
        type: MQTT_CONNECTED,
      };
    })
  );
const handleMqttDisconnectEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_MQTT_DISCONNECTED),
    map((action) => {
      return {
        type: MQTT_DISCONNECTED,
      };
    })
  );

const handleWebserverSocketInitEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_WEBSERVER_SOCKET_INIT),
    map((action) => {
      let { payload } = action;

      if (payload == undefined) {
        throw `${HANDLE_WEBSERVER_SOCKET_INIT} ~ 'payload' is not set !`;
      }
      if (payload.socket == null) {
        throw `${HANDLE_WEBSERVER_SOCKET_INIT} ~ 'payload' is missing the 'socket' !`;
      }

      return {
        type: WEBSERVER_SOCKET_INIT,
        payload,
      };
    })
  );

const handleWebserverConnectEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_WEBSERVER_CONNECTED),
    map((action) => {
      return {
        type: WEBSERVER_CONNECTED,
      };
    })
  );
const handleWebserverDisconnectEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_WEBSERVER_DISCONNECTED),
    map((action) => {
      return {
        type: WEBSERVER_DISCONNECTED,
      };
    })
  );

const handleCreateTopicEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_CREATE_TOPIC),
    map((action) => {
      const { payload } = action;

      if (payload == undefined) {
        throw `${HANDLE_CREATE_TOPIC} ~ 'payload' is not set !`;
      }
      if (payload.name == null) {
        throw `${HANDLE_CREATE_TOPIC} ~ 'payload' is missing a 'name' !`;
      }
      if (!isTypeOf(payload.name) === "string") {
        throw `${HANDLE_CREATE_TOPIC} ~ 'payload.name' must be a 'string' !`;
      }
      if (payload.type == null) {
        throw `${HANDLE_CREATE_TOPIC} ~ 'payload' is missing a 'type' !`;
      }

      const { socket } = state$.value.server["WEBSERVER"];

      socket.emit(HANDLE_CREATE_TOPIC, payload);

      return {
        type: SENDING_CREATE_TOPIC_REQUEST_TO_SERVER,
      };
    })
  );

const handleDispatchActionEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_DISPATCH_ACTION),
    map((action) => {
      let { payload } = action;

      if (payload == undefined) {
        throw `${HANDLE_DISPATCH_ACTION} ~ 'payload' is not set !`;
      }

      return payload;
    })
  );

export const rootEpic = combineEpics(
  handleSeedEpic,
  handlePublishTopicEpic,
  handleAuthenticationRequestEpic,
  handleAuthenticateUserEpic,
  handleMqttConnectEpic,
  handleMqttDisconnectEpic,
  handleWebserverSocketInitEpic,
  handleWebserverConnectEpic,
  handleWebserverDisconnectEpic,
  handleCreateTopicEpic,
  handleDispatchActionEpic
);
