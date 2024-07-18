
import React from 'react';
import { NavLink,useNavigate} from "react-router-dom";
const PageHomeBack = () => {
    const navigate = useNavigate();

  return (
    <div className="header-container d-sm-none">
      <span className="company-name"><i class="fa-solid fa-arrow-left pe-2" onClick={() => navigate(-1)}></i> <span className=''>Pages</span></span>

    </div>
  );
};

export default PageHomeBack;
