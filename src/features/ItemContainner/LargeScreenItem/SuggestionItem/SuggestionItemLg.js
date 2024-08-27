
import React from 'react';
import { NavLink } from "react-router-dom";
export default function SuggestionItemLg(props) {
  return (
    <div className="col-xl-4 col-md-6 col-sm-12 mb-3 ">
      <div className="card shadow-sm border-0 rounded">
        <div className="card-body border rounded p-0 pb-3" style={{ overflow: "hidden", height: "auto" }}>
          
        <NavLink
                    key={props.user_id}
                    to={`/friends/suggestions/${props.user_id}`}
                    className="text-decoration-none"
                >
          
          <img src={props.image} style={{height:'20vh', minHeight:'9rem'}} alt="" className="w-100 card-img-top border-bottom" />
          </NavLink>
          
          
          <div className="pt-3 px-2">
            <h5 className="mb-0 text-truncate ">{props.name}</h5>
            <p className="small text-muted text-truncate ">{props.handle}</p>
            <div className="d-flex flex-column me-3 ms-1">
              <button className="btn btn-md btn-primary mb-2 py-2 w-100"><b>Add Friend</b></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
