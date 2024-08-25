
import React from "react";
import "./WhoLikeHadithDay.css";

export default function WhoLikeHadithDay({ name, handle, image, isActive }) {
  return (
    <div
      className={`WhoLikeHadithDay-container d-flex align-items-center mt-2 py-2 shadow-sm   rounded ${
        isActive ? "active" : ""
      }`}
    >
       
      <div className="profile-image me-2">
        <img
          
          src={`${image}`}
          alt="user"
          height="55px"
          width="55px"
        />
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">{name}</p>
        <p className="text-muted mb-0 text-truncate">{handle}</p>
      </div>
    </div>
  );
}
