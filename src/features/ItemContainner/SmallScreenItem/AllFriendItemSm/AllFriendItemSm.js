import React from 'react';
import { NavLink } from 'react-router-dom';
import './AllFriendItemSm.css'; // Assuming you want to keep styles

export default function AllFriendItemSm({
  name,
  handle,
  image,
  isActive,
  user_id
}) {
  return (
    <div
      className={`friend-request-container px-3 d-flex align-items-center mt-2 py-2 shadow-sm rounded ${
        isActive ? 'active' : ''
      }`}
      style={{ maxWidth: '100%', overflowX: 'hidden' }}
    >
      <div className="profile-image me-2">
        <NavLink
          key={user_id}
          to={`/friends/all-friends/${user_id}`}
          className="text-decoration-none"
        >
          <img
            className="rounded-circle"
            src={image}
            alt="user"
            height="55px"
            width="55px"
          />
        </NavLink>
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">{name}</p>
        <p className="text-muted mb-0 text-truncate">{handle}</p>
      </div>
    </div>
  );
}
