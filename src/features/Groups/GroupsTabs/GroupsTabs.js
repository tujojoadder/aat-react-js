import React from 'react';
import './GroupsTabs.css';
import { NavLink, useLocation } from 'react-router-dom';

const GroupsTabs = () => {
  const location = useLocation();

  return (
    <div className="horizontal-pills-nav">
      <div className="horizontal-pills">
        <NavLink 
          to="/groups"
          className={`text-decoration-none ${location.pathname === '/groups' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/groups' ? 'active' : ''}`}>
            Your feed
          </button>
        </NavLink>
        <NavLink 
          to="/groups/suggestions"
          className={`text-decoration-none ${location.pathname === '/groups/suggestions' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/groups/suggestions' ? 'active' : ''}`}>
            Suggestions
          </button>
        </NavLink>
        <NavLink 
          to="/groups/joined"
          className={`text-decoration-none ${location.pathname === '/groups/joined' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/groups/joined' ? 'active' : ''}`}>
            Your groups
          </button>
        </NavLink>
        <NavLink 
          to="/groups/create"
 
        >
          <button className='pill'>
          <i class="fa-solid fa-plus"></i> Your groups
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default GroupsTabs;
