import React from "react";

import ServerStatus from "./ServerStatus";

import "./ControlPanelStatus.css";
import { connect } from "react-redux";

const ControlPanelStatus = ({ server }) => {
  return (
    <div className="control-panel-status">
      <ServerStatus name={"MQTT"} status={server["MQTT"].isConnected} />
      <ServerStatus
        name={"WEBSERVER"}
        status={server["WEBSERVER"].isConnected}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({ server: state.server });

export default connect(mapStateToProps)(ControlPanelStatus);
