import React from "react";

import { Provider } from "react-redux";
import { store } from "models";

import "./styles.css";

import Layout from "components/Layout";
import SocketIO from "components/SocketIO";
import Debug from "components/Debug";

const App = () => (
  <Provider store={store}>
    {false &&
      (!process.env.NODE_ENV || process.env.NODE_ENV === "development") && (
        <Debug />
      )}

    <Layout />
    <SocketIO />
  </Provider>
);

export default App;
