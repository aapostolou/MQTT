import React from "react";

import { connect } from "react-redux";

import { handleAuthenticateUser } from "models/server/actions";

import "./ControlPanelAuthenticate.css";

const ControlPanelAuthenticate = ({ socket, handleAuthenticateUser }) => {
  const handleChange = (e) => {
    handleAuthenticateUser(e.currentTarget.value);
  };

  return (
    <div className="control-panel__authentication">
      <input
        type="password"
        onChange={handleChange}
        placeholder="Password..."
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  socket: state.server["WEBSERVER"].socket,
});

const mapDispatchToProps = (dispatch) => ({
  handleAuthenticateUser: (payload) => {
    dispatch(handleAuthenticateUser(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanelAuthenticate);
