

import React from "react";
import "./MyRelativeIds.css";

import { NavLink } from "react-router-dom";

export default function MyRelativeIds({ name, handle, image, user_id }) {
  return (
    <div
      className={`friend-request-container p-2  d-flex align-items-center mt-2 py-2 shadow-sm rounded`}
      style={{ maxWidth: "100%" }}
    >
      <div className="profile-image me-2">
        <NavLink
          key={user_id}
          to={`/profile/${user_id}`}
          className="text-decoration-none"
        >
          <img
            className="rounded-circle"
            src={`http://127.0.0.1:8000/${image}`}
            alt="user"
            height="50px"
            width="50px"
          />
        </NavLink>
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">{name}</p>
        <p className="text-muted mb-0 text-truncate">{handle}</p>
      </div>


    </div>
  );
}
