import {
  HANDLE_TOPIC_ADD,
  HANDLE_TOPIC_INIT,
  HANDLE_TOPIC_UPDATE
} from "models/topic/actions";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./Debug.css";

let text = "start " + [...new Array(100)].map((_) => "test").join(" ");

const Debug = ({ temp, handleDispatch, handleUpdateTemp }) => {
  /* Resize */
  const [width, setWidth] = useState(0);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  /* INIT Topics */
  const initTopics = () => {
    handleDispatch({
      type: HANDLE_TOPIC_INIT,
      payload: [
        { name: "text", value: text, type: "text" },
        { name: "json", value: { test: "test" }, type: "json" },
        {
          name: "switch",
          value: "0",
          type: "switch",
          attributes: { values: ["0", "1"] }
        },
        {
          name: "button",
          value: "test",
          type: "button",
          attributes: { value: "1" }
        },
        {
          name: "temperature",
          value: "10",
          type: "thermometer",
          attributes: { min: -20, max: 50 }
        }
      ]
    });

    setTimeout(() => {
      handleDispatch({
        type: HANDLE_TOPIC_ADD,
        payload: { name: "text", value: text, type: "text" }
      });
    }, 2000);
  };

  useEffect(initTopics, []);

  /* Update Temperature */
  const updateTemperature = () => {
    if (!temp || temp.value == null) return;

    handleUpdateTemp({
      name: "temperature",
      value: temp.value + (Math.random() * 10 - 5)
    });
  };
  useEffect(() => {
    let interval = setInterval(() => {
      updateTemperature();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="debug-block">{width}</div>;
};

const mapStateToProps = (state) => ({
  temp: state.topics.find(
    (topic) => topic.name == "temperature" && topic.type == "thermometer"
  )
});
const mapDispatchToProps = (dispatch) => ({
  handleDispatch: (payload) => {
    dispatch(payload);
  },
  handleUpdateTemp: (payload) => {
    dispatch({ type: HANDLE_TOPIC_UPDATE, payload });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Debug);
