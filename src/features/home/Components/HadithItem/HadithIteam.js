import React from 'react';
import image from './logo.jpg'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';

const HadithIteam = ({ type, user_fname, user_lname, hadith, serialNumber, day_hadth_id,profile_picture }) => {
  const navigate = useNavigate();

  // Truncate functions to handle long texts
  const truncateName = (fname, lname) => {
    const fullName = `${fname || ''} ${lname || ''}`.trim();
    return fullName.length > 10 ? `${fullName.substring(0, 8)}...` : fullName;
  };

  const truncateHadith = (text) => {
    if (typeof text !== 'string') {
      return ''; // Handle case where text might not be a string
    }
    return text.length > 25 ? `${text.substring(0, 25)}...` : text;
  };

  // Handle click event to navigate to /day with the hadith data
  const handleClick = () => {
    navigate('/day', { state: { serialNumber } });
  };

  const handleSetHadith = () => {
    navigate('/dayhadith');
  };
  // Check if the item type is 'create'
  if (type === 'create') {
    return (
      <div
        className="item"
        style={{
          cursor: 'pointer',
          padding: '20px',
          border: '1px solid #e0e0e0',
          borderRadius: '15px',
          background: 'linear-gradient(135deg, #f9f9f9 0%, #e8eff3 100%)',
        }}
        onClick={handleSetHadith}
 
      >
        <div className="user-div d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="icon mb-2">
              <i
                className="fas fa-edit"
                style={{
                  fontSize: '2rem',
                  color: '#274a65',
                  transition: 'color 0.3s',
                }}
              ></i>
            </div>
            <p
              className="m-0"
              style={{
                fontWeight: '700',
                fontSize: '0.8rem',
                color: '#333',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Set Your 
            </p>
            <h5>Day Hadith</h5>
          </div>
        </div>
      </div>
    );
    
  }


  // Render the item details if type is not 'create'
  return (
    <div className="item" style={{ cursor: 'pointer' }} onClick={handleClick}>
      <div className="user-div">
        <div className="d-flex flex-column bd-highlight">
          <div className="mt-2 mb-1 bd-highlight">
            <img
             src={`${profile_picture}`}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '2px solid blue',
              }}
              alt=""
            />
          </div>
          <div className="px-1 bd-highlight name text-dark">
            <p style={{ lineHeight: '1.1' }} className="m-1">
              <b>{truncateName(user_fname)}</b>
            </p>
          </div>
          <div style={{ color: 'black' }} className="bd-highlight px-1 pb-2">
            {truncateHadith(hadith)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithIteam;
