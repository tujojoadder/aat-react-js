import React from "react";
import "./SendFriendRequest.css";
import myImage from "./logo.jpg"; // Adjust the path as needed
import { NavLink } from "react-router-dom";

export default function SendFriendRequest({ name, handle, image, isActive,user_id }) {
  return (
    
    <div
      className={`friend-request-container p-2  d-flex align-items-center mt-2 py-2 shadow-sm rounded ${
        isActive ? "active" : ""
      }`}
      style={{ maxWidth: "100%" }}
    >
      <div className="profile-image me-2 ">
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
      <div className="add-friend-button">
        {/* //When you have requested */}
        {/* <button
          className="btn-add-friend btn-primary"
          type="button"
          style={{
            backgroundColor: "#e4e6eb",
            color: "black",
            outline: "none",
            boxShadow: "none",
            border: "none",
            fontSize: "14px",
            minWidth: "126px",
          }}
        >
          Cancel request
        </button> */}
        {/* //When you have not requested */}
        <button
          className=" btn-add-friend btn-primary"
          type="button"
          style={{
            backgroundColor: "#274a65",
            outline: "none",
            boxShadow: "none",
            border: "none",
          }}
        >
          <i className="fas fa-user-plus"></i> Add
        </button>
      </div>
    </div>
  );
}
