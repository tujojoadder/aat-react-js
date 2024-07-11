import React from "react";
import "./GroupsHomeRight.css";
import { NavLink, useLocation, BrowserRouter, Route, Routes } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import JoinedGroups from "./JoinedGroups/JoinedGroups";

export default function GroupsHomeRight() {
    const scrollRef = React.useRef(null);
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
        },
        // other profiles...
    ];
    const location = useLocation();
    const isCreatePage = location.pathname === "/groups/create";

    return (
        <div style={{ overflowX: "hidden" }}>
            <div ref={scrollRef} className="scroll-container w-100 " style={{ overflowY: "hidden", position: "fixed " }}>
                <div className="col-lg-3 ms-1 p-0 m-0 groups_right_side_bar bg-body rounded">
                    <div className="menu-container" style={{ height: "100vh", overflow: 'hidden' }}>
                        <div className="menu " style={{ height: "45vh", minHeight: '310px' }}>
                            <h3 className="menu-header text-left ps-5 text-dark">Groups</h3>
                            <ul className="nav flex-column">
                                <li className="nav-item w-100">
                                    <NavLink end to="/groups" className="nav-link" activeClassName="active">
                                        <i className="fa-solid fa-book me-2"></i> Your feed
                                    </NavLink>
                                </li>
                                <li className="nav-item w-100">
                                    <NavLink end to="/groups/suggestions" className="nav-link" activeClassName="active">
                                        <i className="fas fa-lightbulb fa-fw me-2"></i> Suggestions
                                    </NavLink>
                                </li>
                                <li className="nav-item w-100 mb-3">
                                    <NavLink end to="/groups/joined" className="nav-link" activeClassName="active">
                                      <i className="fa-solid fa-users  me-2"></i> Your groups
                                    </NavLink>
                                </li>
                                {!isCreatePage && (
                                    <li className="nav-item w-100">
                                        <NavLink end to="/groups/create"  className="create-group-link text-center py-2  px-3" activeClassName="active ">
                                            <i className="fa-solid fa-plus "></i> Create New Group
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <h5 className="ms-3"> Groups you've joined
                        </h5>
                        <Scrollbars style={{ width: "100%", height: "55vh", minHeight: "300px" }}>
                            <div className="mb-5">
                                {profiles.map((profile, index) => {
                                    const isActive = location.pathname === `/groups/mygroup/${profile.name}`;
                                    return (
                                        <NavLink key={index} to={`/groups/mygroup/${profile.name}`} className="text-decoration-none">
                                            <div className="col-12 mb-2">
                                                <JoinedGroups
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
