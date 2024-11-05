import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./MobileMenu.css";
import { useSelector } from "react-redux";
import MessageSmallDeviceHead from "../Messages/MessageSmallDeviceHead/MessageSmallDeviceHead";
import FriendHomeBack from "../Friends/FriendBack/FriendHomeBack/FriendHomeBack";
import MobileMenuBack from "./MobileMenuBack";

const MobileMenu = () => {
  const navigate = useNavigate();
  const profile_picture = useSelector((state) => state.home.profile_picture);
  const user_fname = useSelector((state) => state.home.user_fname);
  const user_lname = useSelector((state) => state.home.user_lname);

  const identifier = useSelector((state) => state.home.identifier);

  const handleLogout = () => {
    // Perform logout actions here
    console.log("Logging out...");
    // Example: clear local storage, reset state, etc.
    // Redirect to login page or home page after logout
    navigate("/login"); // Example redirection after logout
  };

  return (
    <>
     {/* Back Button */}
    
      <div className="sm-menu-page  pb-5">
      <MobileMenuBack />

        {/* Menu Items */}
        <div className="menu-items mt-2 px-3">
          <NavLink to="/" className="menu-item">
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </NavLink>
          <NavLink to="/friends" className="menu-item">
            <i className="fa-solid fa-user-friends"></i>
            <span>Friends</span>
          </NavLink>
          <NavLink to="/groups" className="menu-item">
            <i className="fa-solid fa-users"></i>
            <span>Groups</span>
          </NavLink>
          <NavLink to="/page" className="menu-item">
            <i className="fa-solid fa-flag"></i>
            <span>Pages</span>
          </NavLink>
          <NavLink to="/message" className="menu-item">
            <i className="fa-solid fa-envelope"></i>
            <span>Messages</span>
          </NavLink>
          <NavLink to="/quiz" className="menu-item">
            <i className="fa-solid fa-hourglass-half"></i>
            <span>Quiz</span>
          </NavLink>
          <NavLink to="/ichannel" className="menu-item">
            <i className="fa-solid fa-mosque"></i>
            <span>iChannel</span>
          </NavLink>
          <NavLink to="/profile" className="menu-item">
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </NavLink>
          <NavLink to="/settings" className="menu-item">
            <i className="fa-solid fa-cog"></i>
            <span>Settings</span>
          </NavLink>
          <NavLink to="/terms" className="menu-item">
            <i className="fa-solid fa-file-alt"></i>
            <span>Terms</span>
          </NavLink>
          <NavLink to="/privacy" className="menu-item">
            <i className="fa-solid fa-shield-alt"></i>
            <span>Privacy</span>
          </NavLink>

          {/* User Profile Section */}
          <div className="profile-section">
            <div>
              <div className="profile-pic">
                <img
                  src={`${process.env.REACT_APP_LARAVEL_URL}/${profile_picture}`}
                  alt="Profile"
                />
              </div>
            </div>

            <div className="profile-info">
              <h3 className="profile-name">
                {user_fname} {user_lname}
              </h3>

              {identifier && (
                <p className="profile-identifire">@{identifier}</p>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <NavLink
            to="/privacy"
            className="menu-item mb-4"
            style={{ margin: "auto" }}
          >
            <i className="fa-solid fa-sign-out-alt"></i>
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
