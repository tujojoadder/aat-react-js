import React from "react";
import "./AllFriendList.css";
import { useSelector } from "react-redux";

export default function AllFriendList({
  name,
  handle,
  image,
  isActive,
  user_id,
}) {

  const onlineUsers = useSelector((state) => state.home.onlineUsers); // Access onlineUsers from Redux
  const isOnline = onlineUsers.includes(user_id);

  return (
    <div
      className={`friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm rounded ${
        isActive ? "active" : ""
      }`}
      style={{ maxWidth: "100%" }}
    >
      <div className="profile-image me-2 position-relative">
        <img
          className="rounded-circle"
          src={image}
          alt="user"
          height="55px"
          width="55px"
        />
        {/* Online/Offline indicator */}
        <span
          id={`${user_id}-status`}
          className={`status-indicator position-absolute rounded-circle ${
            isOnline ? "online-status" : "offline-status"
          }`}
          style={{

           
          }}
        ></span>
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">{name}</p>
        <p className="text-muted mb-0 text-truncate">{handle}</p>
      </div>
    </div>
  );
}
