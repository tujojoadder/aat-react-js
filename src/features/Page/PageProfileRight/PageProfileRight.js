
import React from "react";
import "./PageProfileRight.css";
import { NavLink, useLocation, BrowserRouter, Route, Routes } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

import PageAbout from "../PageAbout/PageAbout";

export default function PageProfileRight() {
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
    const isCreatePage = location.pathname === "/page/create";

    return (
        <div style={{ overflowX: "hidden" }}>
            <div ref={scrollRef} className="scroll-container w-100 " style={{ overflowY: "hidden", position: "fixed " }}>
                <div className="col-lg-3 ms-1 p-0 m-0 groups_right_side_bar bg-body rounded">
                    <div className="menu-container" style={{ height: "100vh", overflow: 'hidden' }}>
                        <div className="menu " style={{ height: "45vh", minHeight: '310px' }}>
                            <h3 className="menu-header text-left ps-5 text-dark">Pages</h3>
                            <ul className="nav flex-column">
                                <li className="nav-item w-100">
                                    <NavLink end to="/pages" className="nav-link" activeClassName="active">
                                  <i className="fa-solid fa-compass me-2"></i> Discover
                                    </NavLink>
                                </li>
                                <li className="nav-item w-100">
                                    <NavLink end to="/page/liked" className="nav-link" activeClassName="active">
                                    <i className="fa-solid fa-thumbs-up fa-fw me-2"></i> Liked Pages
                                    </NavLink>
                                </li>
                                <li className="nav-item w-100">
                                    <NavLink end to="/page/created" className="nav-link" activeClassName="active">
                                    <i class="fa-solid fa-flag me-2"></i> Your Pages
                                    </NavLink>
                                </li>
                               
                                {!isCreatePage && (
                                    <li className="nav-item w-100">
                                        <NavLink end to="/page/create" className="nav-link create-group-link text-center py-2 mt-4 " activeClassName="active">
                                            <i className="fa-solid fa-plus me-2"></i> Create New Page
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <h5 className="ms-3"> About
                        </h5>
                        <Scrollbars style={{ width: "100%", height: "55vh", minHeight: "300px" }}>
                            <PageAbout/>
                        </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    );
}
