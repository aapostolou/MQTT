import React from "react";

import { connect } from "react-redux";

import io from "socket.io-client";

import { handleAction } from "models/actions";

const socket = io("http://localhost:1994");

const Socket = ({ handleAction }) => {
  socket.on("action", (payload) => handleAction(payload));

  return null;
};

const mapDispatchToProps = (dispatch) => ({
  handleAction: (payload) => dispatch(handleAction(payload)),
});

export default connect(null, mapDispatchToProps)(Socket);
