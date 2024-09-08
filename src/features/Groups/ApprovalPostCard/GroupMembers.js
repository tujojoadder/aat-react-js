import React from "react";
import { useMediaQuery } from "react-responsive";
import "./GroupMembers.css";

export default function GroupMembers({ name, isCreator, image, identifier, isAdmin, isAuth }) {
  // Detect if the screen width is less than 400px
  const isSmallScreen = useMediaQuery({ query: '(max-width: 400px)' });

  // Function to truncate text if needed
  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  return (
    <div
      className={`friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm rounded`}
      style={{ maxWidth: '100%' }}
    >
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
        <p className="fw-bold mb-0 text-truncate d-flex align-items-center">
          {isSmallScreen ? truncateText(name, 12) : name}
          {isAdmin && (
            <span className="badge bg-primary ms-2" style={{ fontSize: '0.75rem' }}>
              Admin
            </span>
          )}
        </p>
        <p className="text-muted mb-0 text-truncate">
          {isSmallScreen ? truncateText(identifier, 12) : identifier}
        </p>
      </div>
     
      {(!isCreator && !isAuth) && (
        <div className="dropdown ms-auto">
          <button
            className="btn btn-link dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            {!isAdmin && <li><p className="dropdown-item " style={{cursor:'pointer'}}>Add as admin</p></li>}
            <li><p className="dropdown-item d-inline" href="#"  style={{cursor:'pointer'}}>Kick from group</p></li>
          </ul>
        </div>
      )}
    </div>
  );
}
