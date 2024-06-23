import React from 'react'

export default function SmallScreenCard(props) {
  return (
    <div style={{minWidth:'300px',margin:'0 auto'}} className="friend-request-container d-flex align-items-center py-2 shadow-sm bg-white rounded">
      <div className="profile-image me-2">
        <img
          className="rounded-circle"
          src={props.image}
          alt="user"
          height="50px"
          width="50px"
        />
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">{props.name}</p>
        <p className="text-muted mb-0 text-truncate">{props.handle}</p>
      </div>
 
        <button className="btn-sm btn-primary " type="button">
        Confirm
        </button>
        <button className="btn " type="button">
           Delete
        </button>
    
    </div>
  )
}
