import React from "react";
import "./PageHomeRight.css";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import GroupAbout from "../Groups/GroupAbout/GroupAbout";
import MyPages from "./MyPages/MyPages";

export default function PageHomeRight() {
  const scrollRef = React.useRef(null);
  const location = useLocation();
  const isCreatePage = location.pathname === "/page/create";


  const profiles = [
    {
        name: "MarkRockwell",
        handle: "@mark_rockwell",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
        name: "JaneDoe",
        handle: "@jane_doe",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },{
        name: "MarkRosckwell",
        handle: "@mark_rockwell",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
        name: "JaneDcoe",
        handle: "@jane_doe",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },{
        name: "MarkRocskwell",
        handle: "@mark_rockwell",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
        name: "JaneDoscse",
        handle: "@jane_doe",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    // other profiles...
];
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
          <div
            className="menu-container"
            style={{ height: "calc(100vh - 80px)" }}
          >
            <div
              className="menu"
              style={{
                minHeight: "310px",
                maxHeight: "calc(100vh - 380px)", // Adjust max height to be responsive
              }}
            >
              <h3 className="menu-header text-left ps-5 text-dark">Pages</h3>
              <ul className="nav flex-column">
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/page"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fa-solid fa-compass me-2"></i> Discover
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/page/liked"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fa-solid fa-thumbs-up fa-fw me-2"></i> Liked
                    Pages
                  </NavLink>
                </li>
                <li className="nav-item w-100 ">
                  <NavLink
                    end
                    to="/page/created"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fa-solid fa-flag me-2"></i> Your Pages
                  </NavLink>
                </li>

                {!isCreatePage && (
                  <li className="nav-item w-100 px-3">
                    <NavLink
                      end
                      to="/page/create"
                      className="nav-link create-group-link text-center mt-3 py-2"
                      activeClassName="active"
                    >
                      <i className="fa-solid fa-plus me-2 "></i> Create New Page
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>







            <h5 className="ms-3"> Your pages
                        </h5>
                        <Scrollbars style={{ width: "100%", height: "55vh", minHeight: "300px" }}>
                            <div className="mb-5">
                                {profiles.map((profile, index) => {
                                    const isActive = location.pathname === `/page/mypage/${profile.name}`;
                                    return (
                                        <NavLink key={index} to={`/page/mypage/${profile.name}`} className="text-decoration-none">
                                            <div className="col-12 mb-2">
                                                <MyPages
                                                    name={profile.name}
                                                    handle={profile.handle}
                                                    image={profile.image}
                                                    isActive={isActive}
                                                />
                                            </div>
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
}
