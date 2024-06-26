import React from "react";
import "./SmallScreenUnFriendUserCard.css"; // Import the custom CSS file

export default function SmallScreenUnFriendUserCard(props) {
  const buttonText = props.type === 'friend_request' ? 'Confirm' : 'Add Friend';
  const buttonText2 = props.type === 'friend_request' ? 'Delete' : 'Remove';

  return (
    <div className="friend-request-container d-flex align-items-center mt-2 py-2 shadow-sm bg-white rounded">
      <div className="profile-image me-2">
        <img
          className="rounded-circle"
          src={props.image}
          alt="user"
          height="60px"
          width="60px"
        />
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">Turjo Joadder</p>
        <p className="text-muted mb-0 text-truncate">@turjojoadder</p>
      </div>

      <div className="add-delete-button me-2" >
        <button   style={{
                backgroundColor: '#d8d8d8',
                outline: 'none',
                boxShadow: 'none',
                border:'none'
              }} className="btn-delete-friend btn-primary" type="button">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="add-friend-button">
        <button className="btn-add-friend  style={{
                backgroundColor: '0056b3',
                outline: 'none',
                boxShadow: 'none',
                border:'none'
              }}" type="button">
             <i className="fas fa-user-plus"></i> Add
        </button>
      </div>
    </div>
  );
}
