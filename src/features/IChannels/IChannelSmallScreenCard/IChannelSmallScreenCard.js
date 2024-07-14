
import React from "react";
import { NavLink } from "react-router-dom";

export default function IChannelSmallScreenCard(props) {
  return (
    <NavLink to={`/ichannel/${props.name}`} className="text-decoration-none">
      <div className="friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm rounded">
        <div className="profile-s me-2">
          <img src={props.image} alt="user" height="55px" width="55px" />
        </div>
        <div className="profile-info flex-grow-1">
          <p className="fw-bold mb-0 text-truncate">{props.name}</p>
          <p className="text-muted mb-0 text-truncate">{props.handle}</p>
        </div>
        <div className="add-friend-button">
          <button
          /* props.type == "discover" or "following" */
            className={`btn-add-friend btn-primary p-2 text-dark ${props.type == "discover" ? "pe-2" : ""}`}
            type="button"
            style={{
              backgroundColor: "#e4e6eb",
              outline: "none",
              boxShadow: "none",
              border: "none",
            }}
          >
            {props.type === "discover" ? (
              <b>Follow</b>
            ) : (
              <b>View</b>
            )}
          </button>
        </div>
      </div>
    </NavLink>
  );
}
