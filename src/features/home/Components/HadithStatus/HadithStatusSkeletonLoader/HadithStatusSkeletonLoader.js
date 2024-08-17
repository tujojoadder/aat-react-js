
import React from 'react';
import './HadithStatusSkeletonLoader.css'; // Create and import your styles here

const HadithStatusSkeletonLoader = () => {
  return (
    <div className="skeleton-wrapper post mx-4">
      <div className="skeleton-item">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
      <div className="skeleton-item">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
      <div className="skeleton-item">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
  
    </div>
  );
};

export default HadithStatusSkeletonLoader;
