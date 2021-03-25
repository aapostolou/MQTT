import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { ShapesContainer } from "react-symmetrical-shapes-container";

import "./TopicsContainer.css";

import Topic from "./Topic";

const TopicsContainer = ({ topics }) => {
  const ref = useRef();
  const [weight, setWeight] = useState(4);

  const handleResize = () => {
    /* Weight */
    let width = ref.current.getBoundingClientRect().width;

    let extra = width / 250 - parseInt(width / 250) > 0.5 ? 1 : 0;
    let newWeight = parseInt(width / 250) + extra;

    setWeight(newWeight || 1);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const generateTopicsArray = () =>
    topics.map((topic, i) => ({
      component: <Topic key={`topic-${topic.name}-${i}`} {...topic} />,
    }));

  return (
    <div ref={ref} className="topics-container hide-scrollbar">
      <ShapesContainer
        shapes={generateTopicsArray()}
        weight={weight}
        spacing={5}
        debug={true}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({ topics: state.topics });

export default connect(mapStateToProps)(TopicsContainer);
