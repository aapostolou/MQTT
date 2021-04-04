import { map, mergeMap } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";

import {
  TOPIC_INIT,
  HANDLE_TOPIC_INIT,
  TOPIC_ADD,
  HANDLE_TOPIC_ADD,
  ABORT_TOPIC_ADD,
  TOPIC_REMOVE,
  HANDLE_TOPIC_REMOVE,
  HANDLE_TOPIC_UPDATE,
  TOPIC_UPDATE,
  SENDING_DELETE_TOPIC_REQUEST_TO_SERVER,
  HANDLE_DELETE_TOPIC,
} from "./actions";

import { isTypeOf } from "helpers";

const isTopicObject = (obj) => {
  if (obj.name == null) {
    return `Topic is missing a 'name'`;
  }
  if (isTypeOf(obj.name) !== "string") {
    return `Topic 'name' is not a 'string'`;
  }

  // if (obj.value == null) {
  //   return `Topic is missing a 'value'`;
  // }

  if (!obj.type == null) {
    return `Topic is missing a 'type'`;
  }

  return true;
};

/* INIT */
const handleTopicsInitEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_TOPIC_INIT),
    map((action) => {
      const { payload } = action;

      if (payload == undefined) {
        throw `${HANDLE_TOPIC_INIT} ~ 'payload' is not set !`;
      }
      if (!isTypeOf(payload) == "array") {
        throw `${HANDLE_TOPIC_INIT} ~ 'payload' must be an 'array' of 'Topic' objects !`;
      }

      payload.forEach((topic) => {
        if (isTopicObject(topic) !== true) {
          throw `${HANDLE_TOPIC_INIT} ~ ${isTopicObject(topic)}`;
        }
      });

      return {
        type: TOPIC_INIT,
        payload,
      };
    })
  );
/* ADD */
const handleTopicsAddEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_TOPIC_ADD),
    map((action) => {
      const { payload } = action;

      if (payload == undefined) {
        throw `${HANDLE_TOPIC_ADD} ~ 'payload' is not set !`;
      }
      if (!isTypeOf(payload) == "object") {
        throw `${HANDLE_TOPIC_ADD} ~ 'payload' must be a 'Topic' object !`;
      }
      if (isTopicObject(payload) !== true) {
        throw `${HANDLE_TOPIC_ADD} ~ ${isTopicObject(payload)}`;
      }

      const { topics } = state$.value;

      if (
        topics.find(
          (topic) => topic.name === payload.name && topic.type === payload.type
        )
      ) {
        return {
          type: ABORT_TOPIC_ADD,
          payload: { response: "Topic already exists." },
        };
      }

      return {
        type: TOPIC_ADD,
        payload,
      };
    })
  );
/* UPDATE */
const handleTopicsUpdateEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_TOPIC_UPDATE),
    map((action) => {
      const { payload } = action;

      if (payload == undefined) {
        throw `${HANDLE_TOPIC_UPDATE} ~ 'payload' is not set !`;
      }
      if (!isTypeOf(payload) === "object") {
        throw `${HANDLE_TOPIC_UPDATE} ~ 'payload' must be a 'Topic' object !`;
      }
      if (payload.name == null) {
        throw `${HANDLE_TOPIC_UPDATE} ~ 'payload' is missing a 'name' !`;
      }
      if (!isTypeOf(payload.name) === "string") {
        throw `${HANDLE_TOPIC_UPDATE} ~ 'payload.name' must be a 'string' !`;
      }
      if (payload.value == null) {
        throw `${HANDLE_TOPIC_UPDATE} ~ 'payload' is missing a 'value' !`;
      }

      let { name, value } = payload;

      return {
        type: TOPIC_UPDATE,
        payload: { name, value },
      };
    })
  );
/* REMOVE */
const handleTopicsRemoveEpic = (action$) =>
  action$.pipe(
    ofType(HANDLE_TOPIC_REMOVE),
    map((action) => {
      const { payload } = action;

      if (payload == undefined) {
        throw `${HANDLE_TOPIC_REMOVE} ~ 'payload' is not set !`;
      }
      if (payload.name == null) {
        throw `${HANDLE_TOPIC_REMOVE} ~ 'payload' is missing a 'name' !`;
      }
      if (!isTypeOf(payload.name) === "string") {
        throw `${HANDLE_TOPIC_REMOVE} ~ 'payload.name' must be a 'string' !`;
      }
      if (payload.type && !isTypeOf(payload.type) === "string") {
        throw `${HANDLE_TOPIC_REMOVE} ~ 'payload.type' must be a 'string' !`;
      }

      return {
        type: TOPIC_REMOVE,
        payload,
      };
    })
  );

/* REMOVE */
const handleDeleteTopicEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_DELETE_TOPIC),
    map((action) => {
      const { payload } = action;

      if (payload == undefined) {
        throw `${HANDLE_DELETE_TOPIC} ~ 'payload' is not set !`;
      }
      if (payload.name == null) {
        throw `${HANDLE_DELETE_TOPIC} ~ 'payload' is missing a 'name' !`;
      }
      if (!isTypeOf(payload.name) === "string") {
        throw `${HANDLE_DELETE_TOPIC} ~ 'payload.name' must be a 'string' !`;
      }
      if (payload.type == null) {
        throw `${HANDLE_DELETE_TOPIC} ~ 'payload' is missing a 'type' !`;
      }
      if (!isTypeOf(payload.type) === "string") {
        throw `${HANDLE_DELETE_TOPIC} ~ 'payload.type' must be a 'string' !`;
      }

      const { socket } = state$.value.server["WEBSERVER"];

      socket.emit(HANDLE_DELETE_TOPIC, payload);

      return {
        type: SENDING_DELETE_TOPIC_REQUEST_TO_SERVER,
      };
    })
  );

export const rootEpic = combineEpics(
  handleTopicsInitEpic,
  handleTopicsAddEpic,
  handleTopicsUpdateEpic,
  handleDeleteTopicEpic,
  handleTopicsRemoveEpic
);
