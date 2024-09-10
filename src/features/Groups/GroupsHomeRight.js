import React from "react";
import "./GroupsHomeRight.css";
import { NavLink, useLocation } from "react-router-dom";

export default function GroupsHomeRight() {
  const location = useLocation();
  const isCreateGroupPage = location.pathname === "/groups/create";

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        className="scroll-container w-100"
        style={{ overflowY: "hidden", position: "fixed" }}
      >
        <div
          style={{ overflow: "hidden" }}
          className="col-lg-3 ms-1 p-0 m-0 groups_right_side_bar bg-body rounded"
        >
          <div className="menu-container" style={{ height: "100vh" }}>
            <div
              className="menu"
              style={{ height: "45vh", minHeight: "310px" }}
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

                {/* Conditionally render the Create New Group button */}
                {!isCreateGroupPage && (
                  <li className="nav-item w-100 px-3">
                    <NavLink
                      end
                      to="/groups/create"
                      className="nav-link create-group-link text-center mt-3 py-2"
                      activeClassName="active"
                    >
                      <i className="fa-solid fa-plus me-2 "></i> Create New Group
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


