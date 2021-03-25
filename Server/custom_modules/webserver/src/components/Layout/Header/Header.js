import React from "react";
import { connect } from "react-redux";
import { AlertTriangle } from "tabler-icons-react";
import ControlPanelToggleButton from "../ControlPanel/ControlPanelToggleButton";

import "./Header.css";

const Header = ({ screen }) => (
  <div className="header">
    <div className="header__left">
      {screen.isMobile && <ControlPanelToggleButton type={"open"} />}
    </div>
    <div className="header__middle"></div>
    <div className="header__right">
      <AlertTriangle size={42} color={"#ddd"} />
    </div>
  </div>
);

const mapStateToProps = (state) => ({ screen: state.general });

export default connect(mapStateToProps)(Header);
