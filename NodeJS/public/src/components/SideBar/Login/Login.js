import React, { useRef } from "react";

import { connect } from "react-redux";
import { handleAdminPassword } from "models/actions";

import "./Login.css";

const Login = ({ handleAdminPassword }) => {
  const passRef = useRef(null);

  const handleKeyPress = (e) => {
    handleAdminPassword(e.target.value);
  };

  return (
    <form className="login" autoComplete="off">
      <input
        ref={passRef}
        type="password"
        placeholder="Password"
        onChange={handleKeyPress}
        autoComplete="off"
      />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleAdminPassword: (payload) => dispatch(handleAdminPassword(payload))
})

export default connect(null, mapDispatchToProps)(Login);
