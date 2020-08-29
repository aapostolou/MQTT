import React, { useRef, useState } from "react";

import { connect } from "react-redux";

import { handleToggleSidebar } from "models/actions";

import Login from "./Login/";
import Admin from "./Admin/Admin";

import "./Sidebar.css";

import gearIcon from "assets/images/gear";
import arrowIcon from "assets/images/caret-right";

const SideBar = ({ isAdmin, isOpen, handleOpenSettings, handleToggleSidebar }) => {
    return (<div className={
        "sidebar" + (
            isOpen ? " active" : ""
        )
    }>
        <div className="sidebar__header">
            {/* <div className="sidebar__header__gear" onClick={handleOpenSettings}> {gearIcon} </div> */}
            <div className="sidebar__header__arrow" onClick={handleToggleSidebar}> {arrowIcon}</div>
        </div>
        {
            !isAdmin ?
                <Login />
                :
                <Admin />
        } </div>);
};

const mapStateToProps = (state) => ({
    isAdmin: state.sidebar.isAdmin,
    isOpen: state.sidebar.isOpen
});
const mapDispatchToProps = (dispatch) => ({
    handleToggleSidebar: () => dispatch(handleToggleSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
