import React from "react";
import { connect } from "react-redux";

import "./ControlPanel.css";

import ControlPanelToggleButton from "./ControlPanelToggleButton";
import ControlPanelStatus from "./ControlPanelStatus";
import ControlPanelAdministration from "./ControlPanelAdministration";

const ControlPanel = ({ controlPanel, screen }) => {
  const generateClassName = () => {
    let classes = ["control-panel", "hide-scrollbar"];

    if (controlPanel.isOpen) classes.push("is--active");

    return classes.join(" ");
  };

  return (
    <div className={generateClassName()}>
      <div className="control-panel__header">
        {screen.isMobile && (
          <ControlPanelToggleButton type={"close"} color={"#333"} />
        )}
      </div>

      <ControlPanelStatus />

      <ControlPanelAdministration />
    </div>
  );
};

const mapStateToProps = (state) => ({
  controlPanel: state.general.controlPanel,
  screen: state.general.screen,
});

export default connect(mapStateToProps)(ControlPanel);
