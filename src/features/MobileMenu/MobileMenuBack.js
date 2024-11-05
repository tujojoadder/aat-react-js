
import React from 'react';
import { NavLink,useNavigate} from "react-router-dom";
const MobileMenuBack = () => {
    const navigate = useNavigate();

  return (
    <div className="header-container d-sm-none w-100 ">
      <span className="company-name"><i className="fa-solid fa-arrow-left pe-2" onClick={() => navigate(-1)}></i> <span className=''>Settings</span></span>

    </div>
  );
};

export default MobileMenuBack;
