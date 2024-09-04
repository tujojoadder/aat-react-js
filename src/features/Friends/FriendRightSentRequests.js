
import React from "react";
import "./FriendRight.css";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink,useLocation, BrowserRouter, Route, Routes } from "react-router-dom";
import SmallScreenUnFriendUserCard from "./SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard";
import SendFriendRequest from "../home/Components/SendFriendRequest/SendFriendRequest";
import FriendSentFooterContainer from "../ItemContainner/FriendSentFooterContainer/FriendSentFooterContainer";
import { Scrollbar } from "react-scrollbars-custom";

export default function FriendRightSentRequests() {
    const location = useLocation();
  return (
    
    <div style={{ overflowX: "hidden" }}>
      <div
     
        className="scroll-container w-100"
        style={{ overflowY: "hidden", height: "100vh" }}
      >
        <div
          style={{ overflow: "hidden" }}
          className="col-lg-3 ms-1 p-0 m-0 friend_right_side_bar bg-body rounded"
        >
          <div className="menu-container" style={{ height: "100%" }}>
            <div
              className="menu mb-3"
              style={{ height: "45vh", minHeight: "310px" }}
            >
              <h3 className="menu-header text-left ps-5 text-dark">Friends</h3>
              <ul className="nav flex-column">
                <li className="nav-item w-100">
                  <NavLink end to="/friends" className="nav-link">
                    <i className="fas fa-user-friends me-2"></i> Home
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                    to="/friends/requests"
                 className="nav-link"
                  >
                    <i className="fas fa-user-plus fa-fw me-2"></i> Friend requests
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink end to="/friends/suggestions" className="nav-link">
                    <i className="fas fa-lightbulb fa-fw me-2"></i> Suggestions
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink end to="/friends/sent-requests" 
                  
                  className={({ isActive }) =>
                    isActive || location.pathname.startsWith('/friends/sent-requests')
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  >
                    <i className="fa fa-user-plus me-2" aria-hidden="true"></i> Sent requests
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink end to="/friends/all-friends" className="nav-link">
                    <i className="fas fa-users fa-fw me-2"></i> All friends
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Bottom section */}
            
          <h5>Sent Requests</h5>
          <Scrollbar
              style={{
                width: "100%",
                height: "56vh",

              }}
            >
          <FriendSentFooterContainer/>
          </Scrollbar>
        </div>
      </div>
    </div>
  </div>
  )
}
