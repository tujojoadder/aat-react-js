import React from "react";
import { NavLink, BrowserRouter, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Page from "../Page";
import Homeleft from "../home/Homeleft";
import "./Navbar.css";
import Home from "../home/Home";

const Navbar = () => {
  const isNotSm = useMediaQuery({ minWidth: 576 }); // Bootstrap's sm breakpoint is 576px

  return (
    <div className={isNotSm ? "container-sm" : "mx-1"}>
      {/* xs NAV BAR */}
      <nav className="bg-light xs-nav fixed-bottom d-sm-none">
        <div className="container-fluid">
          <div className="row h-50">
            <div className="row">
              <div className="col-3 text-center">
                <NavLink to="/" className="custom-link">
                  <i className="fa-solid fa-house fs-3 py-3"></i>
                </NavLink>
              </div>
              <div className="col-3 text-center">
                <NavLink to="/page" className="custom-link">
                  <i className="fa-solid fa-magnifying-glass fs-2 py-3"></i>
                </NavLink>
              </div>
              <div className="col-3 text-center">
                <NavLink to="/page" className="custom-link">
                  <i className="fa-solid fa-bell fs-2 py-3"></i>
                </NavLink>
              </div>
              <div className="col-3 text-center">
                <NavLink to="/page" className="custom-link">
                  <i className="fa-solid fa-envelope fs-2 py-3"></i>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="row">
        {/* LEFT SIDE BAR */}
        <div className="d-none col-sm-2 d-sm-block col-md-2 col-lg-3 d-flex flex-column text-sm-end text-md-start align-items-lg-start left_sidebar">
          <div className="mb-3 d-flex align-items-center justify-content-center">
            <span>
              <i className="fa-brands fa-twitter display-5 text-info"></i>
            </span>
          </div>

          <NavLink to="/" className="custom-link">
            <div className="d-flex align-items-center py-1 pl-5 my-2 custom-link">
              <span>
                <i className="fa-solid fa-house fs-3"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2">Home</p>
            </div>
          </NavLink>

          <NavLink to="/page" className="custom-link">
            <div className="d-flex align-items-center py-1 my-2 pl-5">
              <span>
                <i className="fa-solid fa-hashtag fs-2 d-none d-md-block"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2">Explore</p>
            </div>
          </NavLink>

          <div className="d-flex align-items-center my-2 py-1 pl-5">
            <span>
              <i className="fa-solid fa-bell fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2">Notifications</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5">
            <span>
              <i className="fa-solid fa-envelope fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2">Messages</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5">
            <span>
              <i className="fa-solid fa-bookmark fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2">Bookmarks</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5">
            <span>
              <i className="fa-solid fa-file-lines fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2">Lists</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5">
            <span>
              <i className="fa-solid fa-user fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2">Profile</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5">
            <span>
              <i className="fa-solid fa-ellipsis fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2">More</p>
          </div>
        </div>

        {/* Mid section */}
        <div className="col-12 col-sm-10 col-md-9 col-lg-6 main_bar">
          <div className="row d-flex justify-content-between align-items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/page" element={<Page />} />
            </Routes>
          </div>
        </div>

        {/* RIGHT SIDE BAR */}
        <div className=" col-lg-3 d-none d-lg-block w-25 h-25 right_side_bar">
          <Routes >
            <Route path="/" element={<Homeleft />} />
            <Route path="/page" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
