// src/components/ProfileSkeleton/ProfileSkeleton.js

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styles
import './ProfileSkeleton.css'; // Import your custom styles

const ProfileSkeleton = () => {
  return (
    <>
        <div className="friend-home main border-start border-end mb-1 m-0 p-0" style={{ backgroundColor: "white", minHeight: '100vh' }}>

    <div className="profile-skeleton">
      <div className="cover-photo-container">
        <Skeleton height="40vh" width="100%" />
        <div className="profile-pic-container">
          <Skeleton circle={true} height={120} width={120} />
        </div>
      </div>
     
     
      <div className="content">
        <Skeleton height='60vh' width="100%" />
      </div>
    </div>
    </div>
    </>
  );
};

export default ProfileSkeleton;
