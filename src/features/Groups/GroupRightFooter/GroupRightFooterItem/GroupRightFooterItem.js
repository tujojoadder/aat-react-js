import React from "react";
import { NavLink } from "react-router-dom";
import './GroupRightFooterItem.css';

export default function GroupRightFooterItem(props) {
  const buttonText =
    props.type === "suggestions"
      ? "Join"
      : props.type === "admin"
      ? "Manage"
      : "View";

  const audienceClass = props.audience === "public" ? "badge-public" : "badge-private";
  const audienceText = props.audience === "public" ? "Public" : "Private";

  return (
    <div className={`group-right-footer-item d-flex align-items-center mt-1 p-1 mx-1 shadow-sm rounded ${props.isActive ? "active" : ""}`} style={{overflow: 'hidden'}}>
      <div className="profile-img me-2 px-2">
        <NavLink to={`/groups/mygroup/${props.group_id}`} className="text-decoration-none">
          <img
            src={props.image}
            style={{height:'55px',width:'55px',borderRadius:'50%'}}
            alt="Group"
          />
        </NavLink>
      </div>
      <div className="flex-grow-1 text-truncate">
        <h6 className="mb-0 font-weight-bold text-truncate">{props.name}</h6>
        <p className="small text-muted mb-0 text-truncate">{props.handle}</p>
        <span className={`badge ${audienceClass} text-white`}>
          {audienceText}
        </span>
      </div>
      <NavLink to={`/groups/mygroup/${props.group_id}`} className="text-decoration-none">
        <button
          className="btn btn-primary me-3"
          type="button"
          style={{minWidth: '100px'}}
        >
          <b>{buttonText}</b>
        </button>
      </NavLink>
    </div>
  );
}
