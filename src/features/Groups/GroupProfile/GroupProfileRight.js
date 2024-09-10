import React from "react";
import "./GroupProfileRight.css";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import GroupAbout from "../GroupAbout/GroupAbout";

export default function GroupProfileRight() {
  const scrollRef = React.useRef(null);
  const location = useLocation();
  const isCreateGroupPage = location.pathname === "/groups/create";

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        ref={scrollRef}
        className="scroll-container"
        style={{ position: "fixed", width: "100%", height: "100vh" }}
      >
        <div
          className="col-lg-3 ms-1 p-0 m-0 groups_right_side_bar bg-body rounded"
          style={{ height: "100%", overflow: "hidden" }}
        >
          <div className="menu-container" style={{ height: "calc(100vh - 80px)" }}>
            <div
              className="menu"
              style={{
                minHeight: "310px",
                maxHeight: "calc(100vh - 380px)", // Adjust max height to be responsive
              }}
            >
              <h3 className="menu-header text-left ps-2 text-dark">Groups</h3>
              <ul className="nav flex-column">
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/groups"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fa-solid fa-book me-2"></i> Your feed
                  </NavLink>
                </li>
                <li className="nav-item w-100"></li>
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/groups/suggestions"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fa-solid fa-lightbulb me-2"></i> Suggestions
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/groups/mygroup"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fa-solid fa-users me-2"></i> My groups
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/groups/joingroup"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fa-solid fa-user-friends me-2"></i> Joined groups
                  </NavLink>
                </li>
                {!isCreateGroupPage && (
                  <li className="nav-item w-100">
                    <NavLink
                      end
                      to="/groups/create"
                      className="nav-link create-group-link text-center mt-3 py-2"
                      activeClassName="active"
                    >
                      <i className="fa-solid fa-plus me-2"></i> Create New Group
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>

            <h5 className="ms-3 mt-3">About</h5>
            <Scrollbars
              autoHide
              style={{ width: "100%", height: "calc(100vh - 310px)" }}
            >
              <div className="mb-5">
                <GroupAbout />
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
}
