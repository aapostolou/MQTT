import React from "react";
import { AlertTriangle, Server, ThumbUp } from "tabler-icons-react";

import "./ServerStatus.css";

const ServerStatus = ({ name, status }) => {
  return (
    <div className={`server-status is--${status ? "active" : "inactive"}`}>
      <div className="server-status__icon">
        <Server size={100} color={"#222"} />
        <div className="server-status__status-icons">
          <div className="server-status__active">
            <ThumbUp size={42} color={"green"} />
          </div>
          <div className="server-status__inactive">
            <AlertTriangle size={42} color={"red"} />
          </div>
        </div>
      </div>
      <div className="">{name}</div>
    </div>
  );
};

export default ServerStatus;
