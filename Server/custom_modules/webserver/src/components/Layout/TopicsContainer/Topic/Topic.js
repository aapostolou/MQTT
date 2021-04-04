import React from "react";
import { connect } from "react-redux";

import "./Topic.css";

import { handleDeleteTopic } from "models/topic/actions";

import {
  TextField,
  JsonField,
  SwitchField,
  ButtonField,
  Thermometer,
} from "./Fields";

import { Trash } from "tabler-icons-react";

const Topic = ({ name, value, type, attributes, handleDeleteTopic }) => {
  const handleDeleteClick = () => {
    if (window.confirm(`Delete topic '${name}' of type '${type}'`)) {
      handleDeleteTopic({ name, type });
    }
  };

  return (
    <div className={`topic topic--${type}`}>
      <div className="topic__delete" onClick={handleDeleteClick}>
        <Trash size={20} color={"#dd6c75"} />
      </div>

      <div className="topic__content hide-scrollbar">
        {type === "text" && <TextField value={value} />}
        {type === "json" && <JsonField value={value} />}
        {type === "switch" && (
          <SwitchField name={name} value={value} attributes={attributes} />
        )}
        {type === "button" && (
          <ButtonField name={name} value={value} attributes={attributes} />
        )}
        {type === "thermometer" && (
          <Thermometer name={name} value={value} attributes={attributes} />
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleDeleteTopic: (payload) => {
    dispatch(handleDeleteTopic(payload));
  },
});

export default connect(null, mapDispatchToProps)(Topic);
