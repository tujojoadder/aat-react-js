import React from 'react';
import image from "./logo.jpg";
import '../../../../style.css';
import '../../../../all.css';

export default function Comment() {
  return (
    <div className="create-comment">
      <div className="post">
        <form action="">
          <div className="form-group-1 d-flex align-items-center" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '10px' }}>
            <img src={image} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} alt="profile-pic" />
            <input
              className="form-control"
              style={{
                border: 'none',
                borderBottom: '1px solid blue',
                flexGrow: 1,
                marginRight: '10px',
                padding: '10px',
                height: '50px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-bottom 0.3s ease, box-shadow 0.3s ease'
              }}
              type="text"
              placeholder="Reply with text"
              onFocus={(e) => {
                e.target.style.borderBottom = '2px solid blue';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderBottom = '1px solid blue';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button className="btn btn-primary" type="submit" style={{ borderRadius: '50%', padding: '10px', height: '50px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s ease' }}>
             
            <i className="fa-regular fa-paper-plane"></i>             
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
