
import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (

    <><div className="skeleton-post mx-2" style={{height:'30vh', minHeight:'200px'}} >
      {/* User Picture */}
      <div className="skeleton-user-pic"></div>

      {/* Content Box */}
      <div className="skeleton-contents-box">
        {/* Name and Time */}
        <div className="skeleton-user-names">
          <div className="skeleton-name"></div>
          <div className="skeleton-username"></div>
          <div className="skeleton-time"></div>
        </div>

        {/* Text Content */}
        <div className="skeleton-text-content">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>

        {/* Icons */}
        <div className="skeleton-icons">
          <div className="skeleton-icon"></div>
          <div className="skeleton-icon"></div>
          <div className="skeleton-icon"></div>
          <div className="skeleton-icon"></div>
        </div>
      </div>
      
    </div>
    </>
    
  );
};

export default SkeletonLoader;
