import React from "react";
import "./FriendRight.css";
import { NavLink, BrowserRouter, Route, Routes } from "react-router-dom";

const FriendRight = () => {
  
  return (
    <div style={{ overflowX: "hidden", }}>
      <div
       
        className="scroll-container w-100"
        style={{ overflowY: "hidden", position: "fixed " }}
      >
        <div
          style={{ overflow: "hidden" }}
          className="col-lg-3 ms-1  p-0 m-0 friend_right_side_bar bg-body rounded"
        >
          <div className="menu-container" style={{ height: "100vh",}} >
            <div className="menu" style={{ height: "45vh",minHeight:'310px' }}>
          
              <h3 className="menu-header text-left ps-5 text-dark ">Friends</h3>
              <ul className="nav flex-column ">
                <li className="nav-item  w-100">
                  <NavLink
                   end
                    to="/friends"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fas fa-user-friends me-2"></i> Home
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                   end
                    to="/friends/requests"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fas fa-user-plus fa-fw me-2"></i> Friend requests
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                   end
                    to="/friends/suggestions"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fas fa-lightbulb fa-fw me-2"></i> Suggestions
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                   end
                    to="/friends/sent-requests"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fa fa-user-plus me-2" aria-hidden="true"></i> Sent requests
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                   end
                    to="/friends/all-friends"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fas fa-users fa-fw me-2"></i> All friends
                  </NavLink>
                </li>
              </ul>
            </div>
         

          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRight;
