import React from "react";
import "./AllFriendList.css";
import { useDispatch, useSelector } from "react-redux";
import { setReceiverId } from "../../home/HomeSlice";

export default function AllFriendList({
  name,
  handle,
  image,
  isActive,
  user_id,
}) {
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.home.onlineUsers); // Access onlineUsers from Redux
  const reciverID = useSelector((state) => state.home.receiver_id); // Access onlineUsers from Redux
  const isOnline = onlineUsers.includes(user_id);

  const handleClick = () => {
    dispatch(setReceiverId(user_id)); // Dispatch action to set receiver_id
  };

  return (
    <div
      className={`friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm rounded ${
        isActive ? "active" : ""
      }`}
      style={{ maxWidth: "100%", cursor: "pointer" }} // Add cursor pointer for better UX
      onClick={handleClick} // Handle click to set receiver_id
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
        ></span>
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">{name} {reciverID}</p>
        <p className="text-muted mb-0 text-truncate">{handle}</p>
      </div>
    </div>
  );
}
