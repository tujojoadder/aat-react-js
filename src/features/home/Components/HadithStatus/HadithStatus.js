import React, { useEffect, useRef, useState } from 'react';
import HadithIteam from '../HadithItem/HadithIteam';
import { useGetDayHadithsQuery } from '../../../../services/hadithApi';
import { setAllDayHadith } from '../../HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function HadithStatus() {
  const wrapperRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const dispatch = useDispatch();
  const location = useLocation();

  // Retrieve the allDayHadith data from Redux state
  const allDayHadith = useSelector((state) => state.home.allDayHadith);

  // Fetch data when navigating to '/day'
  const {
    data: GetDayHadithsQuery,
    isSuccess: GetDayHadithsQuerySucess,
    isLoading: GetDayHadithsQueryLoading,
    isError: GetDayHadithsQueryError,
    refetch
  } = useGetDayHadithsQuery();

  useEffect(() => {
    if (location.pathname === '/') {
      setIsLoading(true); // Start loading when navigating to '/'
      refetch().finally(() => setIsLoading(false)); // Refetch data and stop loading
    }
  }, [location, refetch]);

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

  const containerClasses = `pt-2 pb-3 d-flex align-items-center position-relative wrapper-container ${
    isLoading || GetDayHadithsQueryError ? '' : 'border-bottom border-start border-end'
  }`;

  return (
    <div
      className={containerClasses}
      style={{
        backgroundColor: isLoading ? '#ffffff' : '#f8f9fa',
        height: '200px',
      }}
    >
      {isLoading ? (
        <div className="spinner-container d-flex justify-content-center align-items-center" style={{ height: '50px', width: '100%' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <button
            className="btn  scroll-button left ms-1"
            style={{backgroundColor:'#274a65',color:'white'}}
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
            className="btn  scroll-button right me-1"
            style={{backgroundColor:'#274a65',color:'white'}}

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
