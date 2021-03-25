import { handleConstructorClose } from "models/general/actions";
import { handleCreateTopic } from "models/topic/actions";
import React, { useRef } from "react";
import { connect } from "react-redux";

const JsonField = ({ value }) => {
  const generateValue = () => {
    let result = JSON.stringify(value, null, 1);

    try {
      result = JSON.stringify(JSON.parse(value), null, 1);
    } catch (err) {}

    return result;
  };

  return <pre>{generateValue()}</pre>;
};

export default JsonField;

/* Constructor */
const mapDispatchToProps = (dispatch) => ({
  handleCreateTopic: (payload) => {
    dispatch(handleCreateTopic(payload));
  },
  handleConstructorClose: (payload) => {
    dispatch(handleConstructorClose(payload));
  }
});

export const JsonFieldConstructor = connect(
  null,
  mapDispatchToProps
)(({ handleCreateTopic, handleConstructorClose }) => {
  const nameRef = useRef();

  const handleSubmit = () => {
    if (
      nameRef.current.value.trim() == "" ||
      nameRef.current.value.trim().indexOf(" ") != -1
    )
      return;

    handleCreateTopic({ name: nameRef.current.value.trim(), type: "json" });
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

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
});
