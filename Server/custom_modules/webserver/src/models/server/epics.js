import { map } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";

import { isTypeOf } from "helpers";

import {
  HANDLE_PUBLISH_TOPIC,
  HANDLE_TOPIC_ADD,
  HANDLE_TOPIC_UPDATE,
  HANDLE_CREATE_TOPIC,
  SENDING_CREATE_TOPIC_REQUEST_TO_SERVER
} from "models/topic/actions";

import {
  AUTHENTICATE_USER,
  HANDLE_AUTHENTICATE_USER,
  SENDING_PUBLISH_REQUEST_TO_SERVER,
  SENDING_AUTHENTICATION_REQUEST_TO_SERVER,
  HANDLE_MQTT_CONNECTED,
  MQTT_CONNECTED,
  HANDLE_MQTT_DISCONNECTED,
  MQTT_DISCONNECTED,
  HANDLE_WEBSERVER_CONNECTED,
  WEBSERVER_CONNECTED,
  HANDLE_WEBSERVER_DISCONNECTED,
  WEBSERVER_DISCONNECTED
} from "./actions";

const handlePublishTopicEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_PUBLISH_TOPIC),
    map((action) => {
      const { payload } = action;

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

      /* DEV */
      return {
        type: HANDLE_TOPIC_UPDATE,
        payload
      };
      /* DEV */

      /* socket.emit(HANDLE_PUBLISH_TOPIC, payload) */

      return {
        type: SENDING_PUBLISH_REQUEST_TO_SERVER
      };
    })
  );

const handleAuthenticateUserEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_AUTHENTICATE_USER),
    map((action) => {
      const { payload } = action;

      if (payload == undefined) {
        throw `${HANDLE_AUTHENTICATE_USER} ~ 'payload' is not set !`;
      }

      /* DEV */
      if (payload == 3164975)
        return {
          type: AUTHENTICATE_USER,
          payload
        };
      /* DEV */

      /* socket.emit(HANDLE_AUTHENTICATE_USER, payload) */

      return {
        type: SENDING_AUTHENTICATION_REQUEST_TO_SERVER
      };
    })
  );

const handleMqttConnectEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_MQTT_CONNECTED),
    map((action) => {
      return {
        type: MQTT_CONNECTED
      };
    })
  );
const handleMqttDisconnectEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_MQTT_DISCONNECTED),
    map((action) => {
      return {
        type: MQTT_DISCONNECTED
      };
    })
  );

const handleWebserverConnectEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_WEBSERVER_CONNECTED),
    map((action) => {
      return {
        type: WEBSERVER_CONNECTED
      };
    })
  );
const handleWebserverDisconnectEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_WEBSERVER_DISCONNECTED),
    map((action) => {
      return {
        type: WEBSERVER_DISCONNECTED
      };
    })
  );

const handleCreateTopicEpic = (action$) =>
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

      /* DEV */
      return {
        type: HANDLE_TOPIC_ADD,
        payload
      };
      /* DEV */

      /* socket.emit(HANDLE_AUTHENTICATE_USER, payload) */

      return {
        type: SENDING_CREATE_TOPIC_REQUEST_TO_SERVER
      };
    })
  );

export const rootEpic = combineEpics(
  handlePublishTopicEpic,
  handleAuthenticateUserEpic,
  handleMqttConnectEpic,
  handleMqttDisconnectEpic,
  handleWebserverConnectEpic,
  handleWebserverDisconnectEpic,
  handleCreateTopicEpic
);
