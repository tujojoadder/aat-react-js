import React, { useState, useEffect } from 'react';
import HadithDayContent from './HadithDayContent';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './HadithDay.css';

export default function HadithDay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const allDayHadith = useSelector((state) => state.home.allDayHadith);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.serialNumber) {
      const index = allDayHadith.findIndex(hadith => hadith.serialNumber === location.state.serialNumber);
      /* findIndex return -1 when no maatch  */
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [location.state, allDayHadith]);

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
    <div className="hadith-day-container" style={{overflowX:'hidden'}}>
      <div className="hadith-day-content">
        {allDayHadith.length > 0 && (
          <HadithDayContent
            hadith={allDayHadith[currentIndex].day_hadith.hadith.hadith}
            serialNumber={allDayHadith[currentIndex].serialNumber}
            day_hadith_id={allDayHadith[currentIndex].day_hadith.day_hadith_id}
            handlePrev={handlePrev}
            handleNext={handleNext}
            isLiked={allDayHadith[currentIndex].isLiked} // Pass isLiked here
            isPrevDisabled={currentIndex === 0}
            isNextDisabled={currentIndex === allDayHadith.length - 1}
          />
        )}
      </div>
    </div>
  );
}
