import React from "react";

import { connect } from "react-redux";

import ControlPanelAuthenticate from "./ControlPanelAuthenticate";
import ControlPanelPublish from "./ControlPanelPublish";
import ControlPanelAddTopic from "./ControlPanelAddTopic";

import "./ControlPanelAdministration.css";

const ControlPanelAdministration = ({ server }) => {
  return (
    <div className="control-panel-administration hide-scrollbar">
      {!server["WEBSERVER"].isAdmin ? (
        <ControlPanelAuthenticate />
      ) : (
        <>
          <ControlPanelPublish />
          <ControlPanelAddTopic />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ server: state.server });

export default connect(mapStateToProps)(ControlPanelAdministration);
