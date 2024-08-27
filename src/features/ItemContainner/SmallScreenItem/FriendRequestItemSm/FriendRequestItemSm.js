
import React from "react";
import "./FriendRequestItemSm.css";
import { NavLink } from "react-router-dom";

export default function FriendRequestItemSm({
  name,
  handle,
  image,
  isActive,
  user_id
}) {
  return (
    <div
      className={`friend-request-container px-3  d-flex align-items-center mt-2 py-2  shadow-sm rounded ${
        isActive ? "active" : ""
      }`}
      style={{maxWidth:'100%',overflowX:'hidden'}}
    >
      <div className="profile-image me-2">

      <NavLink
            key={user_id}
            to={`/friends/requests/${user_id}`}
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

     
        <>
          <div className="add-delete-button me-2">
            <button className="btn-delete-friend" type="button">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="add-friend-button">
            <button
              className="btn-add-friend btn-primary"
              type="button"
              style={{
                backgroundColor: "#0d8de5",
                outline: "none",
                boxShadow: "none",
                border: "none",
              }}
            >
              Confirm
            </button>
          </div>
        </>
      <>
      <div className="add-friend-button">
        
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
      </>
    </div>
  );
}
