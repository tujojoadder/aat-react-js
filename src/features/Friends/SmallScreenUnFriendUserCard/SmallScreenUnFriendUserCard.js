import React from "react";
import "./SmallScreenUnFriendUserCard.css";

export default function SmallScreenUnFriendUserCard(props) {
  return (
    <div className="friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm bg-white rounded">
      <div className="profile-image me-2">
        <img
          className="rounded-circle"
          src={props.image}
          alt="user"
          height="55px"
          width="55px"
        />
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">{props.name}</p>
        <p className="text-muted mb-0 text-truncate">{props.handle}</p>
      </div>

      <div className="add-delete-button me-2">
        <button className="btn-delete-friend" type="button">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="add-friend-button">
        <button className="btn-add-friend p-2"  style={{borderRadius:'50px'}}>
          Confirm
        </button>
      </div>
    </div>
  );
}
