import React from 'react';
import image from './logo.jpg';
import { useNavigate } from 'react-router-dom';

export default function HadithIteam({ user_fname, user_lname, hadith, serialNumber ,day_hadith_id}) {
  const navigate = useNavigate();

  const truncateName = (fname, lname) => {
    const fullName = `${fname} ${lname}`;
    if (fullName.length > 20) {
      return `${fullName.substring(0, 20)}...`;
    }
    return fullName;
  };

  const truncateHadith = (hadith) => {
    if (hadith.length > 27) {
      return `${hadith.substring(0, 27)}...`;
    }
    return hadith;
  };

  const displayName = truncateName(user_fname, user_lname);
  const displyHadith = truncateHadith(hadith);

  // Handle click event to navigate to /day with the hadith data
  const handleClick = () => {
    navigate('/day', { state: { serialNumber } });
  };

  return (
    <div className="item" style={{ cursor: 'pointer' }} onClick={handleClick}>
      <div className="user-div">
        <div className="d-flex flex-column bd-highlight">
          <div className="mt-2 mb-1 bd-highlight">
            <img
              src={image}
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
              <b>{displayName}</b>
            </p>
          </div>
          <div style={{ color: 'black' }} className="bd-highlight px-1 pb-2">
            {displyHadith}
          </div>
        </div>
      </div>
    </div>
  );
}
