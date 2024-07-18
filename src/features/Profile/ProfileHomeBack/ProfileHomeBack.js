
import React from 'react';
import { NavLink,useNavigate} from "react-router-dom";
const ProfileHomeBack = (props) => {
    const navigate = useNavigate();

  return (
    <div className="header-container d-sm-none">
      <span className="company-name"><i class="fa-solid fa-arrow-left pe-2" onClick={() => navigate(-1)}></i> <span className=''>{props.text}</span></span>

    </div>
  );
};

export default ProfileHomeBack;
