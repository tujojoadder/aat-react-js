import React, { useState } from 'react';
import image from "./logo.jpg";
import '../../../../../style.css';

export default function Comment() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div style={{width:'100%'}} className="create-comment shadow-sm   bg-body rounded" >
      
        <form action="">
          <div className="form-group-1 d-flex align-items-center py-md-3 " style={{ padding: '10px 15px', backgroundColor: '#f0f2f5', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
            <img src={image} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} alt="profile-pic" />
            <div style={{ flexGrow: 1, position: 'relative' }} >
              <input
                className="form-control"
                style={{
                  border: 'none',
                  flexGrow: 1,
                  padding: '10px 0',
                  height: 'auto',
                  boxSizing: 'border-box',
                  outline: 'none',
                  fontSize: '16px',
                  backgroundColor: 'transparent', // No background color
                  boxShadow: 'none', // Remove default focus box shadow
                }}
                type="text"
                placeholder="Write a comment..."
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div style={{
                position: 'absolute',
                bottom: '5px', // Adjust as needed
                left: '0',
                right: '0',
                height: '2px',
                backgroundColor: isFocused ? '#007bff' : '#e0e0e0',
                transition: 'background-color 0.3s ease'
              }}></div>
            </div>
            <button className="btn btn-primary" type="submit" style={{ borderRadius: '50%', padding: '10px', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#007bff', border: 'none', color: '#fff', fontSize: '18px', transition: 'background-color 0.3s ease' }}>
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>

  );
}
