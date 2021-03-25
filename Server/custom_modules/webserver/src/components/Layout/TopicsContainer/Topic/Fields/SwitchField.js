import React, { useRef } from "react";

import { connect } from "react-redux";
import { handleCreateTopic, handlePublishTopic } from "models/topic/actions";
import { handleConstructorClose } from "models/general/actions";

const SwitchField = ({ name, value, attributes, handlePublishTopic }) => {
  const handleOnClick = () => {
    let newValue =
      attributes.values[
        (attributes.values.indexOf(`${value}`) + 1) % attributes.values.length
      ];

    handlePublishTopic({ name, value: newValue });
  };

  return <button onClick={handleOnClick}>{value}</button>;
};

const mapDispatchToProps = (dispatch) => ({
  handlePublishTopic: ({ name, value }) => {
    dispatch(handlePublishTopic({ name, value }));
  }
});

export default connect(null, mapDispatchToProps)(SwitchField);

/* Constructor */
const mapDispatchToProps2 = (dispatch) => ({
  handleCreateTopic: (payload) => {
    dispatch(handleCreateTopic(payload));
  },
  handleConstructorClose: (payload) => {
    dispatch(handleConstructorClose(payload));
  }
});

export const SwitchFieldConstructor = connect(
  null,
  mapDispatchToProps2
)(({ handleCreateTopic, handleConstructorClose }) => {
  const nameRef = useRef();
  const valueRef = useRef();

  const handleSubmit = () => {
    if (
      nameRef.current.value.trim() == "" ||
      nameRef.current.value.trim().indexOf(" ") != -1
    )
      return;

    if (valueRef.current.value.trim() == "") return;

    console.log(valueRef.current.value.split(","));

    handleCreateTopic({
      name: nameRef.current.value,
      type: "switch",
      attributes: { values: valueRef.current.value.split(",") }
    });
    handleConstructorClose();

    nameRef.current.value = "";
  };

  return (
    <div className="topic-constructor">
      <div className="_name" data-type="string">
        <label>
          <span>Topic Name : </span>
          <input ref={nameRef} type="text" placeholder="string" />
        </label>
      </div>
      <div className="_attribute" data-type="object">
        Attributes
        <div className="_min" data-type="number">
          <label>
            <span>Click Value : </span>
            <input ref={valueRef} type="text" placeholder="array" />
          </label>
        </div>
      </div>

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
});
