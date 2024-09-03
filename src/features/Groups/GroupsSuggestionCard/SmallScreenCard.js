import React from "react";
import { NavLink } from "react-router-dom";
import './SmallScreenCard.css'; // Assuming you have this CSS file for additional styling

export default function SmallScreenCard(props) {
  const buttonText = props.type === "suggestions" ? "Join" : "View";
  const audienceClass = props.audience === "public" ? "badge-public" : "badge-private";
  const audienceText = props.audience === "public" ? "Public" : "Private";

  return (
      <div className="d-flex align-items-center mb-3  p-2 shadow-sm rounded card-small">
        <div className="profile-img me-3">
        <NavLink to={`/groups/${props.group_id}`} className="text-decoration-none">

          <img
            src={props.image}
            alt="Group"
            className="rounded-circle"
            style={{ height: "65px", width: "65px", objectFit: "cover" }}
          />
            </NavLink>
        </div>
        <div className="flex-grow-1">
          <h6 className="mb-1 font-weight-bold">{props.name}</h6>
          <p className="small text-muted mb-1">{props.handle}</p>
          <span className={`badge ${audienceClass} text-white px-2 py-1 rounded`}>
            {audienceText}
          </span>
        </div>


        <NavLink to={`/groups/${props.group_id}`} className="text-decoration-none">
        <button
          className="btn btn-primary ms-3 px-3"
          type="button"
          style={{ backgroundColor: "#007bff", border: "none" }}
        >
          <b>{buttonText}</b>
        </button>
        </NavLink>

      </div>
  
  );
}
