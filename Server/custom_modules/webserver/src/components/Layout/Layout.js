import React, { useEffect } from "react";

import { connect } from "react-redux";
import {
  handleScreenToDesktop,
  handleScreenToMobile,
} from "models/general/actions";

import Header from "./Header";
import ControlPanel from "./ControlPanel/";
import TopicsContainer from "./TopicsContainer/";

import Constructor from "components/Layout/TopicsContainer/Topic/Fields/_Constructor";

import "./Layout.css";

const Layout = ({
  screen,
  field_constructor,
  handleScreenToMobile,
  handleScreenToDesktop,
}) => {
  const handleResize = () => {
    if (screen.isMobile === null) {
      window.innerWidth > 767
        ? handleScreenToDesktop()
        : handleScreenToMobile();
    }

    if (screen.isMobile) {
      if (window.innerWidth > 767) {
        handleScreenToDesktop();
      }
    }
    if (!screen.isMobile) {
      if (window.innerWidth < 768) {
        handleScreenToMobile();
      }
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const generateClasses = () => {
    let classes = ["layout"];

    if (field_constructor.isOpen)
      classes.push(...["hide-overflow", "is--constructor-open"]);

    return classes.join(" ");
  };

  return (
    <div className={generateClasses()}>
      <Header />
      <ControlPanel />
      <TopicsContainer />

      <Constructor />
    </div>
  );
};

const mapStateToProps = (state) => ({
  screen: state.general.screen,
  field_constructor: state.general.field_constructor,
});

const mapDispatchToProps = (dispatch) => ({
  handleScreenToMobile: () => {
    dispatch(handleScreenToMobile());
  },
  handleScreenToDesktop: () => {
    dispatch(handleScreenToDesktop());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
