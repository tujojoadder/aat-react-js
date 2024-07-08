
import React from "react";
import "./MakePageAdmin.css";

export default function MakePageAdmin({ name, handle, image, isActive }) {
  return (
    <div
      className={`friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm rounded ${isActive ? "active" : ""}`}
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
        <p className="fw-bold mb-0 text-truncate">{name}</p>
        <p className="text-muted mb-0 text-truncate">{handle}</p>
      </div>
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
          <li><a className="dropdown-item" href="#">Add as admin</a></li>
          <li><a className="dropdown-item" href="#">Remove from admins</a></li>
        </ul>
      </div>
    </div>
  );
}
