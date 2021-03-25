import React, { useRef } from "react";
import { connect } from "react-redux";

import { handleConstructorClose } from "models/general/actions";
import { handleCreateTopic } from "models/topic/actions";

const TextField = ({ value }) => {
  return <>{value}</>;
};

export default TextField;

/* Constructor */
const mapDispatchToProps = (dispatch) => ({
  handleCreateTopic: (payload) => {
    dispatch(handleCreateTopic(payload));
  },
  handleConstructorClose: (payload) => {
    dispatch(handleConstructorClose(payload));
  }
});

export const TextFieldConstructor = connect(
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

    handleCreateTopic({ name: nameRef.current.value, type: "text" });
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
