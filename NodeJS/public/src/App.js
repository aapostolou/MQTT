import React from "react";

// Packages
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

import { Swipeable } from "react-swipeable";

import rootReducer from "./models/reducers";
import rootEpic from "./models/epics";

import { handleSwipeLeft, handleSwipeRight } from "./models/actions";

// Components
import Socket from "components/Socket.io/Socket.io";
import SideBar from "components/SideBar/SideBar";

// CSS
import "./App.css";
import "assets/fonts/BankGothic.css";

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

const onSwipeLeft = () => {
  store.dispatch(handleSwipeLeft());
};
const onSwipeRight = () => {
  store.dispatch(handleSwipeRight());
};

const swipeableConfig = {
  delta: (window.innerWidth / 5) * 2, // min distance(px) before a swipe starts
  preventDefaultTouchmoveEvent: false, // preventDefault on touchmove, *See Details*
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
};

const App = () => (
  <Swipeable
    onSwipedLeft={onSwipeLeft}
    onSwipedRight={onSwipeRight}
    {...swipeableConfig}
  >
    <Provider store={store}>
      <Socket />
      <SideBar />
    </Provider>
  </Swipeable>
);

export default App;
