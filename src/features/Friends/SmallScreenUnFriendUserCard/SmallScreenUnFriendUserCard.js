import React from "react";
import "./SmallScreenUnFriendUserCard.css";

export default function SmallScreenUnFriendUserCard({
  name,
  handle,
  image,
  isActive,
  type,
}) {
  return (
    <div
      className={`friend-request-container  d-flex align-items-center mt-2 py-2  shadow-sm rounded ${
        isActive ? "active" : ""
      }`}
      style={{maxWidth:'100%',overflowX:'hidden'}}
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

      {type === 'friend_request' ?(
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
      ):(<>
      <div className="add-friend-button">
        {/* //When you have requested */}
        <button
          className="btn-add-friend btn-primary"
          type="button"
          style={{
            backgroundColor: "#e4e6eb",
            color: "black",
            outline: "none",
            boxShadow: "none",
            border: "none",
            fontSize: "14px",
            minWidth: "126px",
          }}
        >
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
      </>)}
    </div>
  );
}
