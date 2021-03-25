import {
  handleControlPanelClose,
  handleControlPanelOpen,
} from "models/general/actions";
import React from "react";
import { connect } from "react-redux";

import { ChevronsLeft, Settings } from "tabler-icons-react";

import "./ControlPanelToggleButton.css";

const ControlPanelToggleButton = ({
  type = "open",
  color,
  size = 42,
  isOpen,
  handleControlPanelOpen,
  handleControlPanelClose,
}) => {
  const handleOnClick = () => {
    if (type == "open") handleControlPanelOpen();
    if (type == "close") handleControlPanelClose();
    if (type == "toggle") {
      isOpen ? handleControlPanelClose() : handleControlPanelOpen();
    }
  };

  return (
    <div
      className={`control-panel__button btn--${type}`}
      style={{ width: size, height: size }}
      onClick={handleOnClick}
    >
      {type == "open" && (
        <Settings size={size} color={color || "var(--color-blue)"} />
      )}
      {type == "close" && <ChevronsLeft size={42} color={color || "#222"} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.general.controlPanel.isOpen,
});
const mapDispatchToProps = (dispatch) => ({
  handleControlPanelOpen: () => {
    dispatch(handleControlPanelOpen());
  },
  handleControlPanelClose: () => {
    dispatch(handleControlPanelClose());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanelToggleButton);
