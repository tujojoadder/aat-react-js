import React from 'react';
import './GroupsTabs.css';
import { NavLink, useLocation } from 'react-router-dom';

const GroupsTabs = () => {
  const location = useLocation();

  return (
    <div className="horizontal-pills-nav">
      <div className="horizontal-pills">
       
      {/*  Your feed */}
       
        <NavLink 
          to="/groups"
          className={`text-decoration-none ${location.pathname === '/groups' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/groups' ? 'active' : ''}`}>
            Your feed
          </button>
        </NavLink>



        {/* Suggestios */}

        <NavLink 
          to="/groups/suggestions"
          className={`text-decoration-none ${location.pathname === '/groups/suggestions' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/groups/suggestions' ? 'active' : ''}`}>
            Suggestions
          </button>
        </NavLink>


      {/* join groups */}

        <NavLink 
          to="/groups/joingroup"
          className={`text-decoration-none ${location.pathname === '/groups/joingroup' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/groups/joingroup' ? 'active' : ''}`}>
            Joined groups
          </button>
        </NavLink>


      {/* My groups */}

        <NavLink 
          to="/groups/mygroup"
          className={`text-decoration-none ${location.pathname === '/groups/mygroup' ? 'active' : ''}`}
        >
          <button className={`pill ${location.pathname === '/groups/mygroup' ? 'active' : ''}`}>
            My groups
          </button>
        </NavLink>


      {/* Create Group */}
        <NavLink 
          to="/groups/create"
 
        >
          <button className='pill'>
          <i className="fa-solid fa-plus"></i> Create groups
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default GroupsTabs;
