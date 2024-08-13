import React, { useState, useEffect } from 'react';
import HadithDayContent from './HadithDayContent';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './HadithDay.css';

export default function HadithDay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  //Retrive all data hadith from redux state
  const allDayHadith = useSelector((state) => state.home.allDayHadith);
  const navigate = useNavigate();

  // Navigate to home if allDayHadith is not set or empty
  useEffect(() => {
    if (!allDayHadith || allDayHadith.length === 0) {
      navigate('/');
    }
  }, [allDayHadith, navigate]);

  // Set currentIndex based on location.state.serialNumber
  useEffect(() => {

    if (location.state && location.state.serialNumber && allDayHadith.length > 0) {
      const index = allDayHadith.findIndex(hadith => hadith.serialNumber === location.state.serialNumber);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [location.state]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, allDayHadith.length - 1));
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="hadith-day-container" style={{ overflowX: 'hidden' }}>
      <div className="hadith-day-content">
        {/* //we will passing data depending on current Index Number */}
        {allDayHadith.length > 0 && (
          <HadithDayContent
            index={currentIndex} // Pass the current index
            userFname={allDayHadith[currentIndex].user_fname}
            userLname={allDayHadith[currentIndex].user_lname}
            Identifier={allDayHadith[currentIndex].identifier}
            profile_picture={allDayHadith[currentIndex].profile_picture}
            isLiked={allDayHadith[currentIndex].day_hadith.isLiked}
            hadith={allDayHadith[currentIndex].day_hadith.hadith.hadith}         
            day_hadith_id={allDayHadith[currentIndex].day_hadith.day_hadith_id}
            handlePrev={handlePrev}
            handleNext={handleNext}
            isPrevDisabled={currentIndex === 0}
            isNextDisabled={currentIndex === allDayHadith.length - 1}
          />
        )}
      </div>
    </div>
  );
}
