import React from "react";
import { NavLink } from "react-router-dom";
import "./LargeScreenCard.css"; // Assuming you have this CSS file for additional styling

export default function LargeScreenCard(props) {
  const buttonText = props.type === "suggestions" ? "Join group" : "View group";
  const audienceClass =
    props.audience === "public" ? "badge-public" : "badge-private";
  const audienceText = props.audience === "public" ? "Public" : "Private";

  return (
    <div className="col-md-6 col-sm-12 mb-3">
      <div className="card shadow-sm border-0 rounded">
        <div
          className="card-body p-0 pb-3"
          style={{ overflow: "hidden", height: "auto" }}
        >
                 <NavLink to={`/groups/${props.group_id}`} className="text-decoration-none">

          <img
            src={props.image}
            alt="Group"
            className="w-100 card-img-top"
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
          </NavLink>
          <div className="pt-3 ps-1 pe-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1 font-weight-bold">{props.name}</h5>
                <p className="small text-muted mb-0">{props.handle}</p>
              </div>
              <span
                className={`badge ${audienceClass} text-white px-3 py-1 rounded`}
              >
                {audienceText}
              </span>
            </div>
            <div className="d-flex flex-column mt-3">
              <NavLink
                to={`/groups/${props.group_id}`}
                className="text-decoration-none"
              >
                <button
                  className="btn btn-primary text-white py-2 w-100"
                  style={{ backgroundColor: "#007bff", border: "none" }}
                >
                  <b>{buttonText}</b>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
