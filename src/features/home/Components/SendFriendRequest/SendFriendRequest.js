import React from "react";
import image from "./logo.jpg";
import './SendFriendRequest.css'; // Import the custom CSS file

export default function SendFriendRequest(props) {
  return (
    <div className="friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm bg-white rounded">
      <div className="profile-image me-2">
        <img
          className="rounded-circle"
          src={image}
          alt="user"
          height="55px"
          width="55px"
        />
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">Turjo Joadder</p>
        <p className="text-muted mb-0 text-truncate">@turjojoadder</p>
      </div>
      <div className="add-friend-button">

      {/* //When you have requested */}
      <button className=" btn-add-friend btn-primary" type="button"  style={{
                backgroundColor: '#e4e6eb',
                color:'black',
                outline: 'none',
                boxShadow: 'none',
                border:'none',
                fontSize:'14px',minWidth:'126px'
              }}>
         Cancel request
        </button>

      {/* //When you have not requested */}
        {/* <button className=" btn-add-friend btn-primary" type="button"  style={{
                backgroundColor: '#0d8de5',
                outline: 'none',
                boxShadow: 'none',
                border:'none'
              }}>
          <i className="fas fa-user-plus"></i> Add
        </button> */}
      </div>
    </div>
  );
}

