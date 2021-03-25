export const TOPIC_INIT = "TOPIC_INIT";
export const HANDLE_TOPIC_INIT = "HANDLE_TOPICS_INIT";

export const TOPIC_ADD = "TOPIC_ADD";
export const HANDLE_TOPIC_ADD = "HANDLE_TOPIC_ADD";
export const ABORT_TOPIC_ADD = "ABORT_TOPIC_ADD";

export const TOPIC_UPDATE = "TOPIC_UPDATE";
export const HANDLE_TOPIC_UPDATE = "HANDLE_TOPIC_UPDATE";
export const ABORT_TOPIC_UPDATE = "ABORT_TOPIC_UPDATE";

export const TOPIC_REMOVE = "TOPIC_REMOVE";
export const HANDLE_TOPIC_REMOVE = "HANDLE_TOPIC_REMOVE";
export const ABORT_TOPIC_REMOVE = "ABORT_TOPIC_REMOVE";

export const HANDLE_PUBLISH_TOPIC = "PUBLISH_TOPIC";
export const handlePublishTopic = (payload) => ({
  type: HANDLE_PUBLISH_TOPIC,
  payload
});

export const HANDLE_CREATE_TOPIC = "HANDLE_CREATE_TOPIC";
export const handleCreateTopic = (payload) => ({
  type: HANDLE_CREATE_TOPIC,
  payload
});

export const SENDING_CREATE_TOPIC_REQUEST_TO_SERVER =
  "SENDING_CREATE_TOPIC_REQUEST_TO_SERVER";
