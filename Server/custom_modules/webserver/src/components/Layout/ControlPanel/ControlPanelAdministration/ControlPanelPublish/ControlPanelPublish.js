import React, { useRef } from "react";
import { connect } from "react-redux";

import { handlePublishTopic } from "models/topic/actions";

import "./ControlPanelPublish.css";

const ControlPanelPublish = ({ handlePublishTopic }) => {
  const titleRef = useRef();
  const messageRef = useRef();

  const handleTitleChange = (e) => {
    e.currentTarget.value = e.currentTarget.value.trim();
  };

  const handleMessageChange = (e) => {
    let current = e.currentTarget.value;

    try {
      let ugly = JSON.parse(current);

      e.currentTarget.value = JSON.stringify(ugly, null, 2);
    } catch (err) {}
  };

  const handleSubmit = () => {
    let value = messageRef.current.value;

    try {
      value = JSON.stringify(JSON.parse(messageRef.current.value));
    } catch (err) {}

    handlePublishTopic({
      name: titleRef.current.value,
      value
    });
  };

  return (
    <div className="control-panel-publish">
      <input
        ref={titleRef}
        className="control-panel-publish__topic"
        placeholder="Topic..."
        onChange={handleTitleChange}
      />
      <textarea
        ref={messageRef}
        className="control-panel-publish__message"
        placeholder="Message..."
        onChange={handleMessageChange}
      />
      <button className="control-panel-publish__submit" onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handlePublishTopic: (payload) => {
    dispatch(handlePublishTopic(payload));
  }
});

export default connect(null, mapDispatchToProps)(ControlPanelPublish);
