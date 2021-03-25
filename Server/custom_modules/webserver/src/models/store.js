import { rootReducer as topics, rootEpic as topicEpic } from "./topic";
import { rootReducer as server, rootEpic as serverEpic } from "./server";
import { rootReducer as general, rootEpic as generalEpic } from "./general";
import { rootReducer as fields } from "./field";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineEpics, createEpicMiddleware } from "redux-observable";

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({ topics, server, general, fields });
const rootEpic = combineEpics(topicEpic, serverEpic, generalEpic);

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);
