import React from "react";
import { connect } from "react-redux";

import { handleConstructorOpen } from "models/general/actions";

import { Plus } from "tabler-icons-react";

import "./ControlPanelCreateTopic.css";

const ControlPanelCreateTopic = ({ handleConstructorOpen }) => {
  const handleClick = () => {
    handleConstructorOpen();
  };

  return (
    <>
      <div className="control-panel__add-btn add-btn" onClick={handleClick}>
        <div className="add-btn__text">Add Field</div>

        <div className="add-btn__icon">
          <Plus size={28} />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleConstructorOpen: () => {
    dispatch(handleConstructorOpen());
  }
});

export default connect(null, mapDispatchToProps)(ControlPanelCreateTopic);
