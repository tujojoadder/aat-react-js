import React, { useEffect, useRef, useState } from 'react';
import HadithIteam from '../HadithItem/HadithIteam';
import { useGetDayHadithsQuery } from '../../../../services/hadithApi';
import { setAllDayHadith } from '../../HomeSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function HadithStatus() {
  const wrapperRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const dispatch = useDispatch();
  
  // Retrieve the allDayHadith data from Redux state
  const allDayHadith = useSelector((state) => state.home.allDayHadith);

  const scrollLeft = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (wrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
      setShowPrev(scrollLeft > 0);
      setShowNext(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => wrapper.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const {
    data: GetDayHadithsQuery,
    isSuccess: GetDayHadithsQuerySucess,
    isLoading: GetDayHadithsQueryLoading,
    isError: GetDayHadithsQueryError,
  } = useGetDayHadithsQuery();

  useEffect(() => {
    if (GetDayHadithsQuerySucess) {
      console.log(GetDayHadithsQuery.data);
     
      const dataWithSerialNumbers = GetDayHadithsQuery.data.map((item, index) => ({
        ...item,
        serialNumber: index + 1, // Adding serial number starting from 1
      }));
      dispatch(setAllDayHadith(dataWithSerialNumbers)); // Store data with serial numbers in Redux state
    }
  }, [GetDayHadithsQuerySucess, GetDayHadithsQuery, dispatch]);

  const containerClasses = `pt-2 pb-3 d-flex align-items-center position-relative wrapper-container ${
    GetDayHadithsQueryLoading || GetDayHadithsQueryError ? '' : 'border-bottom border-start border-end'
  }`;

  return (
    <div
      className={containerClasses}
      style={{
        backgroundColor: GetDayHadithsQueryLoading ? '#ffffff' : '#f8f9fa',
        height: '200px',
      }}
    >
      {GetDayHadithsQueryLoading ? (
        <div className="spinner-container d-flex justify-content-center align-items-center" style={{ height: '50px', width: '100%' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <button
            className="btn btn-primary scroll-button left ms-1"
            onClick={scrollLeft}
            disabled={!showPrev}
          >
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </button>
          <div ref={wrapperRef} className="wrapper ml-2 my-2 flex-grow-1">
            {allDayHadith.length > 0 ? (
              allDayHadith.map((user) => (

                <HadithIteam
                  key={user.user_id} // Use a unique key (preferably user_id)
                  user_fname={user.user_fname}
                  user_lname={user.user_lname}
                  hadith={user.day_hadith.hadith.hadith}
                  day_hadth_id={user.day_hadith.day_hadith_id}
                  serialNumber={user.serialNumber} // Pass serial number as a prop
                />
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>
          <button
            className="btn btn-primary scroll-button right me-1"
            onClick={scrollRight}
            disabled={!showNext}
          >
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </button>
        </>
      )}
    </div>
  );
}
