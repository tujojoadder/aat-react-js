import React from 'react';
import './CreatePostSkeleton.css'; // You'll define styles for the skeleton here

export default function CreatePostSkeleton() {
  return (
    <div className="create-post-skeleton shadow-sm  bg-white rounded  m-2 mb-4 mt-4 ">
      <div className="skeleton skeleton-textarea mb-3"></div>
      <div className="d-flex align-items-center">
        <div className="skeleton skeleton-icon me-2"></div>
        <div className="skeleton skeleton-select"></div>
        <div className="ms-auto d-flex align-items-center">
          <div className="skeleton skeleton-reset-button me-2"></div>
          <div className="skeleton skeleton-post-button"></div>
        </div>
      </div>
    </div>
  );
}
