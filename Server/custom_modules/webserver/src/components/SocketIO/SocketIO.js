import React, { useEffect } from "react";

import "./SocketIO.css";

/* Imports */
import { connect } from "react-redux";

import {
  handleDispatchAction,
  handleWebserverConnected,
  handleWebserverDisconnected,
  HANDLE_DISPATCH_ACTION,
} from "models/server/actions";

import { io } from "socket.io-client";
// const ENDPOINT = "192.168.1.202:1994";
const ENDPOINT = "http://localhost:1994";

const SocketIO = ({
  handleWebserverConnected,
  handleWebserverDiconnected,
  handleDispatchAction,
}) => {
  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("connect", handleWebserverConnected);
    socket.on("disconnect", handleWebserverDiconnected);

    socket.on(HANDLE_DISPATCH_ACTION, handleDispatchAction);
  }, []);

  return null;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  handleWebserverConnected: () => {
    dispatch(handleWebserverConnected());
  },
  handleWebserverDiconnected: () => {
    dispatch(handleWebserverDisconnected());
  },
  handleDispatchAction: (payload) => {
    dispatch(handleDispatchAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketIO);
