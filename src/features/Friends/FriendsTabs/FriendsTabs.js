
import React from 'react';
import './FriendsTabs.css';
import { NavLink, useLocation } from 'react-router-dom';

const FriendsTabs = () => {
  const location = useLocation();

  return (
    <div className="horizontal-pills-nav">
      <div className="horizontal-pills">
        <NavLink 
          to="/friends"
          className={`text-decoration-none ${location.pathname === '/friends' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/friends' ? 'active' : ''}`}>
          Friends
          </button>
        </NavLink>


        <NavLink 
          to="/friends/requests"
          className={`text-decoration-none ${location.pathname === '/friends/requests' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/friends/requests' ? 'active' : ''}`}>
            Friend requests
          </button>
        </NavLink>


        <NavLink 
          to="/friends/suggestions"
          className={`text-decoration-none ${location.pathname === '/friends/suggestions' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/friends/suggestions' ? 'active' : ''}`}>
          Suggestions
          </button>
        </NavLink>


       


      </div>
    </div>
  );
};

export default FriendsTabs;
