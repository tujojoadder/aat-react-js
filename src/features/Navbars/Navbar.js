import React from "react";
import { NavLink, BrowserRouter, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Scrollbars } from 'react-custom-scrollbars';
import Page from "../Page";
import Homeleft from "../home/Homeleft";
import "./Navbar.css";
import Home from "../home/Home";
import Friends from "../Friends/Friends";
import FriendRight from "../Friends/FriendRight";
import FriendHome from "../Friends/FriendHome/FriendHome";

const Navbar = () => {
  const isNotSm = useMediaQuery({ minWidth: 576 }); // Bootstrap's sm breakpoint is 576px

  return (
    <Scrollbars style={{ width: '100%', height:'104vh',minHeight:'300px' }} >
  <div className={isNotSm ? "container-sm  " : "ms-3 me-3"} 
    style={{
       
        background: 'linear-gradient(to right, #ffffff 20%, #f0f2f5 80%)'
    }}
>
      {/* xs NAV BAR */}
      <nav className="bg-light xs-nav fixed-top d-sm-none">
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
        <div style={{backgroundColor:'#f0f2f5',height:'100vh',}} className="p-0  d-none col-sm-2 d-sm-block col-md-2 col-lg-3 d-flex flex-column text-sm-end text-md-start align-items-lg-start left_sidebar  ">

          <div className="pe-2 pt-5 border-end   bg-body rounded" style={{width:'93%',height:'100vh'}}>
          <div className="  mb-3 d-flex align-items-center justify-content-center mydiv">
            <span>
              <i className="fa-brands fa-twitter display-5 text-info"></i>
            </span>
          </div>

          <NavLink to="/" className="custom-link">
            <div className="d-flex align-items-center py-1 pl-5 my-2 custom-link mydiv">
              <span>
                <i className="fa-solid fa-house fs-3"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2 text">Home</p>
            </div>
          </NavLink>

          <NavLink to="/friends" className="custom-link">
            <div className="d-flex align-items-center py-1 my-2 pl-5 custom-link mydiv">
              <span>
             
                <i className="fas fa-user-friends fs-3"></i>
              </span>
              <p className="d-none d-lg-block fs-4 ps-2 text">Friends</p>
            </div>
          </NavLink>

          <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
            <span>
              <i className="fa-solid fa-bell fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2 text">Notifications</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
            <span>
              <i className="fa-solid fa-envelope fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2 text">Messages</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
            <span>
              <i className="fa-solid fa-bookmark fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2 text">Bookmarks</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
            <span>
              <i className="fa-solid fa-file-lines fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2 text">Lists</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
            <span>
              <i className="fa-solid fa-user fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2 text">Profile</p>
          </div>

          <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
            <span>
              <i className="fa-solid fa-ellipsis fs-2"></i>
            </span>
            <p className="d-none d-lg-block fs-4 ps-2 text">More</p>
          </div>
          </div>
          
        </div>

        {/* Mid section */}
        <div  className="col-12 col-sm-10 col-md-9 col-lg-6 main_bar">
          <div className="row d-flex justify-content-between align-items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/friends" element={<FriendHome />} />
            </Routes>
          </div>
        </div>

        {/* RIGHT SIDE BAR */}
        <div className=" col-lg-3 d-none d-lg-block w-25 h-25 right_side_bar">
          <Routes >
            <Route path="/" element={<Homeleft />} />
            <Route path="/friends" element={<FriendRight />} />

        {/*     <Route path="/page" element={<Home />} /> */}
          </Routes>
        </div>
      </div>


      
    </div>
    </Scrollbars>
  );
};

export default Navbar;
