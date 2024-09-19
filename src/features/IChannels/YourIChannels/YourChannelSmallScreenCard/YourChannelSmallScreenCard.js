
import React from "react";
import { NavLink } from "react-router-dom";
export default function YourChannelSmallScreenCard({iaccountId,name,handle,image,type}) {
  return (
    <NavLink to={`/page/${iaccountId}`} className="text-decoration-none">
      <div className="friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm rounded">
        <div className="profile-s me-2">
          <img src={image} alt="user" height="55px" width="55px" />
        </div>
        <div className="profile-info flex-grow-1">
          <p className="fw-bold mb-0 text-truncate">{name}</p>
          <p className="text-muted mb-0 text-truncate">{handle}</p>
        </div>
        <div className="add-friend-button">
          <button
            className={`btn-add-friend btn-primary p-2 text-dark ${type == "discover" ? "pe-0" : ""}`}
            type="button"
            style={{
              backgroundColor: "#e4e6eb",
              outline: "none",
              boxShadow: "none",
              border: "none",
            }}
          >
            {type === "manage" ? (
              <b>manage</b>
            ) : (
              <b>View</b>
            )}
          </button>
        </div>
      </div>
    </NavLink>
  );
}
