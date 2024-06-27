import React from 'react'
import './AllFriendList.css'
export default function AllFriendList(props) {
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
        <p className="fw-bold mb-0 text-truncate">Turjo Joadder</p>
        <p className="text-muted mb-0 text-truncate">@turjojoadder</p>
      </div>
      <div className="add-friend-button">

      
      </div>
    </div>
  )
}
