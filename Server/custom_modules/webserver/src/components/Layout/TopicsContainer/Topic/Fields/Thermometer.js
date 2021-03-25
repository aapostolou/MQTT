import React, { useEffect, useRef } from "react";

import { isTypeOf } from "helpers";
import { connect } from "react-redux";
import { handleConstructorClose } from "models/general/actions";
import { handleCreateTopic } from "models/topic/actions";

const width = 500;
const height = 500;

const colors = {
  cold: { r: 51, g: 102, b: 204 },
  warm: { r: 193, g: 49, b: 49 },
  current({ value, min, max }) {
    let r = mapToValues(value, min, max, this.cold.r, this.warm.r);
    let g = mapToValues(value, min, max, this.cold.g, this.warm.g);
    let b = mapToValues(value, min, max, this.cold.b, this.warm.b);

    return `rgb(${r}, ${g}, ${b})`;
  }
};

const points = {
  outer: {
    top: width / 7,
    bottom:
      (height / 5) * 4 -
      (Math.sin(0.33 * Math.PI) * width) / 7 -
      (Math.sin(0.33 * Math.PI) * width) / 9 / 3,
    left: width / 2 - (Math.cos(0.33 * Math.PI) * width) / 7,
    right: width / 2 + (Math.cos(0.33 * Math.PI) * width) / 7
  },
  inner: {
    top: width / 7,
    bottom: (height / 5) * 4 - (Math.sin(0.37 * Math.PI) * width) / 9,
    left: width / 2 - (Math.cos(0.37 * Math.PI) * width) / 9,
    right: width / 2 + (Math.cos(0.37 * Math.PI) * width) / 9
  },
  temp: {
    x: width / 2,
    y: (height / 5) * 4
  }
};

const size = {
  min: points.inner.bottom - points.outer.bottom,
  max: points.inner.bottom - points.inner.top
};

const Thermometer = ({ value = 0, attributes = { min: -20, max: 50 } }) => {
  const canvas = useRef(null);

  const initializeCanvas = () => {
    canvas.current.width = width;
    canvas.current.height = height;
  };

  const printOutline = () => {
    let ctx = canvas.current.getContext("2d");

    let radius = width / 7;

    let x = Math.cos(0.33 * Math.PI) * radius;
    let y = Math.sin(0.33 * Math.PI) * radius;

    let x2 = Math.cos(1.33 * Math.PI) * radius;

    ctx.save();

    ctx.lineWidth = 3;

    ctx.beginPath();
    /* Bottom Circle */
    ctx.arc(
      width / 2,
      (height / 5) * 4,
      radius,
      -0.33 * Math.PI,
      1.33 * Math.PI
    );
    /* Left Line */
    ctx.lineTo(width / 2 - x, y);
    ctx.stroke();

    /* Top Circle */
    ctx.beginPath();
    ctx.arc(width / 2, y, x, 1 * Math.PI, 2 * Math.PI);
    /* Right Line */
    ctx.lineTo(width / 2 - x2, (height / 5) * 4 - y);
    ctx.stroke();
  };
  const printInnerLines = () => {
    let ctx = canvas.current.getContext("2d");

    let radius = width / 9;

    let x = Math.cos(0.37 * Math.PI) * radius;
    let y = Math.sin(0.37 * Math.PI) * radius;

    let x2 = Math.cos(1.37 * Math.PI) * radius;

    ctx.beginPath();
    ctx.arc(
      width / 2,
      (height / 5) * 4,
      radius,
      -0.37 * Math.PI,
      1.37 * Math.PI
    );
    ctx.lineTo(width / 2 - x, width / 7);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(width / 2, width / 7, x, 1 * Math.PI, 2 * Math.PI);
    ctx.lineTo(width / 2 - x2, (height / 5) * 4 - y);
    ctx.stroke();

    ctx.restore();
  };

  const printInner = () => {
    let ctx = canvas.current.getContext("2d");

    let radius = width / 9;

    ctx.save();

    ctx.fillStyle = colors.current({
      value,
      min: attributes.min,
      max: attributes.max
    });

    ctx.lineWidth = 3;

    /* Bottom Circle */
    ctx.beginPath();
    ctx.arc(
      width / 2,
      (height / 5) * 4,
      radius,
      -0.37 * Math.PI,
      1.37 * Math.PI
    );
    ctx.fill();

    let thermometerHeight = mapToValues(
      value,
      attributes.min,
      attributes.max,
      size.min,
      size.max
    );

    if (thermometerHeight > size.max) thermometerHeight = size.max;

    ctx.fillRect(
      points.inner.left,
      points.inner.bottom,
      points.inner.right - points.inner.left,
      -thermometerHeight
    );

    ctx.restore();
  };

  const printMetrics = () => {
    let ctx = canvas.current.getContext("2d");

    let steps = (Math.abs(attributes.min) + Math.abs(attributes.max)) / 10;

    for (let i = 0; i <= steps; i++) {
      let celsius = mapToValues(
        attributes.min + 10 * i,
        attributes.min,
        attributes.max,
        points.outer.bottom,
        points.outer.top
      );
      let farenheit = celsiusToFarenheit(attributes.min + 10 * i);

      /* Lines */
      ctx.fillRect(points.outer.right - 5, celsius, 10, 1);
      ctx.fillRect(points.outer.left - 5, celsius, 10, 1);

      ctx.save();

      /* Temperatures */
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "20px Arial";
      ctx.fillText(
        attributes.min + 10 * i + " C",
        points.outer.right + 40,
        celsius
      );
      ctx.fillText(farenheit + " F", points.outer.left - 40, celsius);

      ctx.restore();
    }

    ctx.fillRect(points.outer.left - 5, points.outer.top, 10, 1);

    ctx.fillRect(points.outer.left - 5, points.outer.bottom, 10, 1);
  };

  const printData = () => {
    let ctx = canvas.current.getContext("2d");

    ctx.save();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(Math.round(value), points.temp.x, points.temp.y);

    ctx.restore();
  };

  const draw = () => {
    let ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    printOutline();
    printInner();
    printInnerLines();
    printMetrics();
    printData();
  };

  useEffect(() => {
    try {
      if (isTypeOf(parseInt(value)) != "number") return;

      draw();
    } catch (err) {}
  }, [value, attributes]);

  useEffect(() => {
    initializeCanvas();

    draw();
  }, [canvas]);

  return <canvas ref={canvas} className="thermometer"></canvas>;
};

export default Thermometer;

/* Helpers */
const mapToValues = (current, min, max, targetMin = 0, targetMax = 100) =>
  ((current - min) * (targetMax - targetMin)) / (max - min) + targetMin;

/* Celsius - Farenheit */
const celsiusToFarenheit = (value) => value * 1.8 + 32;
const farenheitToCelsius = (value) => (value - 32) / 1.8;

/* Constructor */
const mapDispatchToProps = (dispatch) => ({
  handleCreateTopic: (payload) => {
    dispatch(handleCreateTopic(payload));
  },
  handleConstructorClose: (payload) => {
    dispatch(handleConstructorClose(payload));
  }
});

export const ThermometerConstructor = connect(
  null,
  mapDispatchToProps
)(({ handleCreateTopic, handleConstructorClose }) => {
  const nameRef = useRef();
  const minRef = useRef();
  const maxRef = useRef();

  const handleSubmit = () => {
    if (
      nameRef.current.value.trim() == "" ||
      nameRef.current.value.trim().indexOf(" ") != -1
    )
      return;

    if (
      minRef.current.value.indexOf(" ") != -1 ||
      maxRef.current.value.indexOf(" ") != -1
    )
      return;

    handleCreateTopic({
      name: nameRef.current.value,
      type: "thermometer",
      attributes: { min: minRef.current.value, max: maxRef.current.value }
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
            <span>Min : </span>
            <input
              ref={minRef}
              type="number"
              placeholder="number"
              defaultValue="-20"
            />
          </label>
        </div>
        <div className="_max" data-type="number">
          <label>
            <span>Max : </span>
            <input
              ref={maxRef}
              type="number"
              placeholder="number"
              defaultValue="50"
            />
          </label>
        </div>
      </div>

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
});
