import React from "react";

import { connect } from "react-redux";

import io from "socket.io-client";

import { ACTION, handleAction, handleInitializeSocket } from "models/actions";

const socket = io("http://localhost:1994");

const Socket = ({ handleAction, handleInitializeSocket }) => {
  socket.on("connect", () => { handleInitializeSocket(socket) })

  socket.on(ACTION, (payload) => handleAction(payload));

  return null;
};

const mapDispatchToProps = (dispatch) => ({
  handleInitializeSocket: (payload) => dispatch(handleInitializeSocket(payload)),
  handleAction: (payload) => dispatch(handleAction(payload)),
});

export default connect(null, mapDispatchToProps)(Socket);