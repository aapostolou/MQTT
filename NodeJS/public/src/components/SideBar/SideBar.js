import React, { useRef, useState } from "react";

import { connect } from "react-redux";

import Login from "./Login/";

import "./Sidebar.css";

import { handleToggleSidebar } from "models/actions";

import arrowIcon from "assets/images/caret-right";

const SideBar = ({ isAdmin, isOpen, handleToggleSidebar }) => {
  return (
    <div className={"sidebar" + (isOpen ? " active" : "")}>
      <div className="sidebar__header">
        <span onClick={handleToggleSidebar}>{arrowIcon}</span>
      </div>
      {!isAdmin ? <Login /> : <></>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAdmin: state.isAdmin,
  isOpen: state.sidebar.isOpen,
});
const mapDispatchToProps = (dispatch) => ({
  handleToggleSidebar: () => dispatch(handleToggleSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
