
import React from 'react';
import './PageTabs.css';
import { NavLink, useLocation } from 'react-router-dom';

const PageTabs = () => {
  const location = useLocation();

  return (
    <div className="horizontal-pills-nav">
      <div className="horizontal-pills">
        <NavLink 
          to="/page"
          className={`text-decoration-none ${location.pathname === '/page' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/page' ? 'active' : ''}`}>
            Discover
          </button>
        </NavLink>
        <NavLink 
          to="/page/liked"
          className={`text-decoration-none ${location.pathname === '/page/liked' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/page/liked' ? 'active' : ''}`}>
            Liked Pages
          </button>
        </NavLink>
        <NavLink 
            to="/page/created"
          className={`text-decoration-none ${location.pathname === '/page/created' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/page/created' ? 'active' : ''}`}>
            Your Pages
          </button>
        </NavLink>
        <NavLink 
          to="/page/create"
 
        >
          <button className='pill'>
          <i class="fa-solid fa-plus"></i> Create Page
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default PageTabs;
