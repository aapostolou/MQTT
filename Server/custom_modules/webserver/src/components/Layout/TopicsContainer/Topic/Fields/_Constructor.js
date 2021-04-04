import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { handleConstructorClose } from "models/general/actions";

import { TextFieldConstructor } from "./TextField";
import { JsonFieldConstructor } from "./JsonField";
import { ButtonFieldConstructor } from "./ButtonField";
import { SwitchFieldConstructor } from "./SwitchField";
import { ThermometerConstructor } from "./Thermometer";

import "./Fields.css";
import { SquareX } from "tabler-icons-react";

const fields = {
  text: <TextFieldConstructor />,
  json: <JsonFieldConstructor />,
  button: <ButtonFieldConstructor />,
  switch: <SwitchFieldConstructor />,
  thermometer: <ThermometerConstructor />,
};

const _Constructor = ({ isOpen, handleConstructorClose }) => {
  const selectRef = useRef();

  const [type, setType] = useState("text");

  const handleTypeSelect = () => {
    setType(selectRef.current.options[selectRef.current.selectedIndex].value);
  };

  const generateClasses = () => {
    let classes = ["topic-constructor__container"];

    if (isOpen) classes.push("is--active");

    return classes.join(" ");
  };

  const handleKeyUp = (e) => {
    if (isOpen) {
      if (e.code == "Escape") {
        handleConstructorClose();
      }
    }
  };

  const handleCloseClick = () => {
    handleConstructorClose();
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className={generateClasses()}>
      <div className="topic-constructor__block">
        <div className="topic-constructor__close" onClick={handleCloseClick}>
          <SquareX size={30} color={"#333"} />
        </div>
        Type :
        <select ref={selectRef} onChange={handleTypeSelect}>
          {Object.keys(fields).map((type, i) => (
            <option key={`type-${i}`} value={type}>
              {type}
            </option>
          ))}
        </select>
        {type && fields[type]}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.general.field_constructor.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  handleConstructorClose: () => {
    dispatch(handleConstructorClose());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(_Constructor);
