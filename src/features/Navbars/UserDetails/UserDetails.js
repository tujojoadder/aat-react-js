import React, { useState } from "react";
import "./UserDetails.css";

export default function UserDetails({ user_name, user_email, image }) {
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div style={{backgroundColor:'#ffffff'}} className="user-details-container d-flex  align-items-center mt-3 py-2">
      <div className="profile-image me-2">
        <img src={image} alt="user" height="45px" width="45px" />
      </div>
      <div className="profile-info flex-grow-1 d-none d-lg-block">
        <p className="user-details-user-name fw-bold mb-0 text-truncate">
          {user_name}
        </p>
        <p className="text-muted mb-0 text-truncate">{user_email}</p>
      </div>
      <div style={{}} className="logout-icon ms-auto position-relative ">
        <i
        
          className="fas fa-ellipsis-v p-1 mx-1"
          onClick={toggleLogout}
          style={{ cursor: "pointer",color:'black' }}
        ></i>
        {showLogout && (
          <div className="logout-option position-absolute bg-white border p-1  d-flex align-items-center">
            <button style={{textDecoration:'none',color:'black'}} className="btn btn-link" onClick={() => alert("Logged Out")}>
            <i style={{color:'black'}} class="fa-solid fa-right-from-bracket"></i> <span className="text-dark d-none d-lg-inline">Log out</span> 
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
