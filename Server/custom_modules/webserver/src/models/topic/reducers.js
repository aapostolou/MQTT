import { combineReducers } from "redux";

import { RESET } from "models/general/actions";

import { TOPIC_INIT, TOPIC_ADD, TOPIC_REMOVE, TOPIC_UPDATE } from "./actions";

const initialTopicsState = [];

const topicsReducer = (state = initialTopicsState, action) => {
  const { payload } = action;

  switch (action.type) {
    case TOPIC_INIT:
      return payload;
    case TOPIC_ADD:
      return [...state, payload];
    case TOPIC_UPDATE:
      return state.map((topic) => {
        if (topic.name != payload.name) return topic;

        return { ...topic, value: payload.value };
      });
    case TOPIC_REMOVE:
      console.log(payload);
      return state.filter(
        (topic) =>
          !(topic.name === payload.name && payload.type
            ? topic.type === payload.type
            : false)
      );
    case RESET:
      return initialTopicsState;
    default:
      return state;
  }
};

export const rootReducer = topicsReducer;
