

import React from "react";
import image from "./logo.jpg";
import './ProfileFriend.css'; // Import the custom CSS file

export default function ProfileFriend(props) {
  return (
    <div style={{maxWidth:'100%'}}  className="px-3 friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm bg-white rounded">
      <div className="profile-image me-4">
        <img
          className="rounded-circle"
          src={image}
          alt="user"
          height="60px"
          width="60px"
        />
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">Turjo Joadder</p>
        <p className="text-muted mb-0 text-truncate">@turjojoadder</p>
      </div>
      <div className="add-friend-button">
        <button className="btn btn-add-friend btn-primary" type="button">
          <i className="fas fa-user-plus"></i> Add
        </button>
      </div>
    </div>
  );
}
