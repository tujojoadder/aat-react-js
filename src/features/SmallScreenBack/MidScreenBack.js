
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MidScreenBack({ text }) {
  const navigate = useNavigate();

  return (
    <div  className="header-container d-none d-sm-block d-md-none">
      <span className="company-name">
        <i
          className="fa-solid fa-arrow-left pe-2"
          onClick={() => navigate(-1)}
        ></i>
        <span>{text}</span>
      </span>
    </div>
  );
}
