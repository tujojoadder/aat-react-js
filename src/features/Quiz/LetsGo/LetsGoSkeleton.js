import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styles
import './LetsGoSkeleton.css'; // Import your custom styles

const LetsGoSkeleton = () => {
  return (
    <div className="letsgo-container">
      <div className="letsgo-skeleton-button">
        <Skeleton circle={true} height={150} width={150} />
      </div>
    </div>
  );
};

export default LetsGoSkeleton;
