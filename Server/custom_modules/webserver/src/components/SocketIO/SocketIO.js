import React, { useEffect } from "react";

import "./SocketIO.css";

/* Imports */
import { connect } from "react-redux";

import {
  handleDispatchAction,
  handleWebserverSocketInit,
  handleWebserverConnected,
  handleWebserverDisconnected,
  HANDLE_DISPATCH_ACTION,
} from "models/server/actions";

import { io } from "socket.io-client";
const ENDPOINT = "http://192.168.1.202:1994";
// const ENDPOINT = "http://localhost:1994";

const SocketIO = ({
  handleWebserverSocketInit,
  handleWebserverConnected,
  handleWebserverDiconnected,
  handleDispatchAction,
}) => {
  useEffect(() => {
    const socket = io(ENDPOINT);

    handleWebserverSocketInit({ socket });

    socket.on("connect", handleWebserverConnected);
    socket.on("disconnect", handleWebserverDiconnected);

    socket.on(HANDLE_DISPATCH_ACTION, (payload) => {
      handleDispatchAction(payload);
    });
  }, []);

  return null;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  handleWebserverSocketInit: (payload) => {
    dispatch(handleWebserverSocketInit(payload));
  },
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
