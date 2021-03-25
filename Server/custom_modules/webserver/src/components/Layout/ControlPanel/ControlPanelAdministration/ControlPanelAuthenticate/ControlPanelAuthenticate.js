import React from "react";

import { connect } from "react-redux";

import { handleAuthenticateUser } from "models/server/actions";

import "./ControlPanelAuthenticate.css";

const ControlPanelAuthenticate = ({ handleAuthenticateUser }) => {
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

const mapDispatchToProps = (dispatch) => ({
  handleAuthenticateUser: (payload) => {
    dispatch(handleAuthenticateUser(payload));
  }
});

export default connect(null, mapDispatchToProps)(ControlPanelAuthenticate);
