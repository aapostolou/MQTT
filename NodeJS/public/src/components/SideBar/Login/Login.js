import React, { useRef } from "react";

import "./Login.css";

const Login = () => {
  const passRef = useRef(null);

  const handleKeyPress = () => {};

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

export default Login;
