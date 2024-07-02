import React from "react";
import { NavLink } from "react-router-dom";

export default function SmallScreenCard(props) {
  const buttonText = props.type === "suggestions" ? "Join" : "View";

  return (
    <NavLink to={`/groups/${props.name}`} className="text-decoration-none">
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
            className="btn-add-friend btn-primary px-3"
            type="button"
            style={{
              backgroundColor: "#0d8de5",
              outline: "none",
              boxShadow: "none",
              border: "none",
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </NavLink>
  );
}
