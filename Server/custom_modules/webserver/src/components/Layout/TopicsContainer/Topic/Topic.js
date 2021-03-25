import React from "react";

import "./Topic.css";

import {
  TextField,
  JsonField,
  SwitchField,
  ButtonField,
  Thermometer
} from "./Fields";

const Topic = ({ name, value, type, attributes }) => {
  return (
    <div className={`topic topic--${type}`}>
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

export default Topic;
