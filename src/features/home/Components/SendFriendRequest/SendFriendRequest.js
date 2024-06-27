import React from "react";
import image from "./logo.jpg";
import './SendFriendRequest.css'; // Import the custom CSS file

export default function SendFriendRequest(props) {
  return (
    <div className="friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm bg-white rounded">
      <div className="profile-image me-3">
        <img
          className="rounded-circle profile-picture"
          src={image}
          alt="user"
          height="50px"
          width="50px"
        />
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">Turjo Joadder</p>
        <p className="text-muted mb-0 text-truncate">@turjojoadder</p>
      </div>
      <div className="add-friend-button">
        <button className="btn btn-add-friend btn-primary" type="button">
          Add <i className="fa-solid fa-user-plus"></i>
        </button>
      </div>
    </div>
  );
}
