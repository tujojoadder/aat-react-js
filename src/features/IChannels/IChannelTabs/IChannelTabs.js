
import React from 'react';
import './IChannelTabs.css';
import { NavLink, useLocation } from 'react-router-dom';

const IChannelTabs = () => {
  const location = useLocation();

  return (
    <div className="horizontal-pills-nav">
      <div className="horizontal-pills">
        <NavLink 
          to="/ichannel"
          className={`text-decoration-none ${location.pathname === "/ichannel" ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === "/ichannel" ? 'active' : ''}`}>
            Your feed
          </button>
        </NavLink>

        <NavLink 
          to="/ichannel/following"
          className={`text-decoration-none ${location.pathname === "/ichannel/following" ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === "/ichannel/following" ? 'active' : ''}`}>
          Following
          </button>
        </NavLink>
        <NavLink 
          to="/ichannel/created"
          className={`text-decoration-none ${location.pathname === '/ichannel/created' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/ichannel/created' ? 'active' : ''}`}>
            Your Channels
          </button>
        </NavLink>
        <NavLink 
          to="/ichannel/create"
 
        >
          <button className='pill'>
          <i className="fa-solid fa-plus"></i> Create Channel
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default IChannelTabs;
