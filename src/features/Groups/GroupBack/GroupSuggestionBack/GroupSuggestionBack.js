

import React from 'react';
import { NavLink,useNavigate} from "react-router-dom";
const GroupSuggestionBack = () => {
    const navigate = useNavigate();

  return (
    <div className="header-container d-sm-none">
      <span className="company-name"><i className="fa-solid fa-arrow-left pe-2" onClick={() => navigate(-1)}></i> <span className=''>Group suggestions</span></span>

    </div>
  );
};

export default GroupSuggestionBack;
