import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ImagePostSkeleton() {
  return (
    <div className="posts mx-2" >
      <div className="user-pics">
        <Skeleton circle={true} height={50} width={50} />
      </div>
      <div className="user-contents-image-box">
        <div className="user-names-text pb-1" style={{ marginTop: '2px' }}>
          <Skeleton height={20} width={100} />
          <Skeleton height={15} width={80} />
          <Skeleton height={10} width={60} style={{ marginTop: '10px' }} />
        </div>
        <div className="user-contents">
          <Skeleton height={500} width="100%" />
        </div>
        <div className="content-icons px-2">
          <Skeleton height={20} width={40} />
          <Skeleton height={20} width={40} style={{ marginLeft: '10px' }} />
          <Skeleton height={20} width={40} style={{ marginLeft: '10px' }} />
        </div>
      </div>
    </div>
  );
}
