import React from "react";
import { NavLink } from "react-router-dom";

export default function PageLargeScreenCard(props) {
  return (
    <div className="col-md-6 col-sm-12 mb-3">
      <div className="card shadow-sm border-0 rounded">
        <div className="card-body p-0 pb-3" style={{ overflow: "hidden", height: "auto" }}>
          <NavLink to={`/page/${props.name}`} className="text-decoration-none">
            <img style={{ maxHeight: '160px' }} src={props.image} alt="" className="w-100 card-img-top" />
          </NavLink>
          <div className="pt-3 px-2">
            <h5 className="mb-0">{props.name}</h5>
            <p className="small text-muted text-truncate">@{props.handle}</p>
            <div className="d-flex flex-column">
              <button style={{ backgroundColor: '#e4e6eb' }} className="btn btn-md py-2 mb-2 w-100">
                {props.type === "discover" ? (
                  <b><i className="fa-solid fa-thumbs-up fs-5 pe-2"></i>Like</b>
                ) : (
                  <b>View</b>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
