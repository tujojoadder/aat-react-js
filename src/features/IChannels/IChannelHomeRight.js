
import React from "react";
import "./IChannelHomeRight.css";
import { NavLink, useLocation, BrowserRouter, Route, Routes } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import JoinedGroups from "../Groups/JoinedGroups/JoinedGroups";
import MyIChannels from "./MyIChannels/MyIChannels";

export default function IChannelHomeRight() {
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
    const location = useLocation();
    const isCreatePage = location.pathname === "/ichannel/create";

    return (
        <div style={{ overflowX: "hidden" }}>
            <div ref={scrollRef} className="scroll-container w-100 " style={{ overflowY: "hidden", position: "fixed " }}>
                <div className="col-lg-3 ms-1 p-0 m-0 groups_right_side_bar bg-body rounded">
                    <div className="menu-container" style={{ height: "100vh", overflow: 'hidden' }}>
                        <div className="menu " style={{ height: "45vh", minHeight: '310px' }}>
                            <h3 className="menu-header text-left ps-5 text-dark">iChannel</h3>
                            <ul className="nav flex-column">
                                <li className="nav-item w-100">
                                    <NavLink end to="/ichannel" className="nav-link" activeClassName="active">
                                  <i className="fa-solid fa-compass me-2"></i> Discover
                                    </NavLink>
                                </li>
                                <li className="nav-item w-100">
                                    <NavLink end to="/ichannel/following" className="nav-link" activeClassName="active">
                                    
                                    <i className="fa-solid fa-users-line me-2"></i> Following Channels
                                    </NavLink>
                                </li>
                                <li className="nav-item w-100 mb-3">
                                    <NavLink end to="/ichannel/created" className="nav-link" activeClassName="active">
                                    <i className="fa-solid fa-mosque  "></i> Your Channels
                                    </NavLink>
                                </li>
                               

                                {!isCreatePage && (
                                    <li className="nav-item w-100">
                                        <NavLink end to="/ichannel/create" className="px-3 create-group-link text-center py-2 mt-4 " activeClassName="active">
                                            <i className="fa-solid fa-plus me-2"></i> Create New iChannel
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <h5 className="ms-3"> Your Channels
                        </h5>
                        <Scrollbars style={{ width: "100%", height: "55vh", minHeight: "300px" }}>
                            <div className="mb-5">
                                {profiles.map((profile, index) => {
                                    const isActive = location.pathname === `/ichannel/${profile.name}`;
                                    return (
                                        <NavLink key={index} to={`/ichannel/${profile.name}`} className="text-decoration-none">
                                            <div className="col-12 mb-2">
                                                <MyIChannels
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
