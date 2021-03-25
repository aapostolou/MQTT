import { combineReducers } from "redux";

import { TOPIC_INIT, TOPIC_ADD, TOPIC_REMOVE, TOPIC_UPDATE } from "./actions";

const initialTopicsState = [];

const topicsReducer = (state = initialTopicsState, action) => {
  switch (action.type) {
    case TOPIC_INIT:
      return action.payload;
    case TOPIC_ADD:
      return [...state, action.payload];
    case TOPIC_UPDATE:
      return state.map((topic) => {
        const { payload } = action;

        if (topic.name != payload.name) return topic;

        return { ...topic, value: payload.value };
      });
    case TOPIC_REMOVE:
      const { payload } = action;

      return state.filter((topic) =>
        topic.name !== payload.name && payload.type
          ? topic.type !== payload.type
          : true
      );
    default:
      return state;
  }
};

export const rootReducer = topicsReducer;
