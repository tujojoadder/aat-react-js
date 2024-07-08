import React from "react";
import { NavLink,useLocation, BrowserRouter, Route, Routes } from "react-router-dom";

export default function LargeScreenCard(props) {
  const buttonText = props.type === "suggestions" ? "Join group" : "View group";
  return (
    <div className="col-md-6 col-sm-12 mb-3 ">
      
        <div className="card shadow-sm border-0 rounded">
          <div
            className="card-body p-0 pb-3"
            style={{ overflow: "hidden", height: "auto" }}
          >
            <NavLink
      
      to={`/groups/${props.name}`}
      className="text-decoration-none "
    >
            <img style={{maxHeight:'200px'}} src={props.image} alt="" className="w-100 card-img-top" />
            </NavLink> <div className="pt-3 px-2">
              <h6 className="mb-0  ">{props.name} </h6>
              <p className="small text-muted text-truncate ">{props.handle}</p>
              <div className="d-flex flex-column">
                <button  style={{backgroundColor:'#e4e6eb',border:'none'}} className="text-dark btn btn-md py-2 btn-primary mb-2 w-100">
                <b>  { buttonText}</b>  
                </button>
              </div>
            </div>
          </div>
        </div>
  
    </div>
  );
}
