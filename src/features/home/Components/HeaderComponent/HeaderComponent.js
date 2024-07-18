import React from 'react';
import './HeaderComponent.css';
import { NavLink} from "react-router-dom";
const HeaderComponent = () => {
  return (
    <div className="header-container d-sm-none">
      <span className="company-name">Company</span>
      <div className="icon-group">
        <i className="fas fa-search search-icon fs-5"></i>

        <NavLink to="/menu" className="custom-link">
        <i className="fas fa-cog settings-icon fs-5 ms-2"></i>
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderComponent;
