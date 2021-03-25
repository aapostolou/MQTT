import React, { useRef } from "react";

import { connect } from "react-redux";
import { handleCreateTopic, handlePublishTopic } from "models/topic/actions";
import { handleConstructorClose } from "models/general/actions";

const ButtonField = ({ name, value, attributes, handlePublishTopic }) => {
  const handleOnClick = () => {
    handlePublishTopic({ name, value: attributes.value || "BUTTON_CLICK" });
  };

  return <button onClick={handleOnClick}>{value}</button>;
};

const mapDispatchToProps = (dispatch) => ({
  handlePublishTopic: ({ name, value }) => {
    dispatch(handlePublishTopic({ name, value }));
  }
});

export default connect(null, mapDispatchToProps)(ButtonField);

/* Constructor */
const mapDispatchToProps2 = (dispatch) => ({
  handleCreateTopic: (payload) => {
    dispatch(handleCreateTopic(payload));
  },
  handleConstructorClose: (payload) => {
    dispatch(handleConstructorClose(payload));
  }
});

export const ButtonFieldConstructor = connect(
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

    if (
      valueRef.current.value.trim() == "" ||
      valueRef.current.value.trim().indexOf(" ") != -1
    )
      return;

    handleCreateTopic({
      name: nameRef.current.value,
      type: "button",
      attributes: { value: valueRef.current.value }
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
            <input
              ref={valueRef}
              type="text"
              placeholder="string"
              defaultValue="true"
            />
          </label>
        </div>
      </div>

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
});
