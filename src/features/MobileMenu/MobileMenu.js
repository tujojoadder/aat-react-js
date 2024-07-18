import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './MobileMenu.css';

const MobileMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here
    console.log("Logging out...");
    // Example: clear local storage, reset state, etc.
    // Redirect to login page or home page after logout
    navigate('/login'); // Example redirection after logout
  };

  return (
    <div className="sm-menu-page main pb-5">
      {/* Back Button */}
      <span className='menu-items mb-3 ps-2'><i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left fs-4"></i></span>
      
      {/* User Profile Section */}
      <div className="profile-section">
        <div className="profile-pic">
          <img src="https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg" alt="Profile" />
        </div>
        <div className="profile-info">
          <h3 className="profile-name">Your Name</h3>
          <p className="profile-email">your.email@example.com</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-items">
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

        {/* Logout Button */}
        <NavLink to="/privacy" className="menu-item mb-3" style={{margin:'auto'}}>
        <i className="fa-solid fa-sign-out-alt"></i>
        <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
