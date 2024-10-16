import React, { useEffect, useRef, useState } from 'react';
import { useGetDayHadithsQuery } from '../../../../services/hadithApi';
import { setAllDayHadith } from '../../HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HadithIteam from '../HadithItem/HadithIteam';
import HadithStatusSkeletonLoader from './HadithStatusSkeletonLoader/HadithStatusSkeletonLoader';

export default function HadithStatus() {
  const wrapperRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  /*  Get all user day hadiths  */
  const {
    data: GetDayHadithsQuery,
    isSuccess: GetDayHadithsQuerySuccess,
    isLoading: GetDayHadithsQueryLoading,
    isError: GetDayHadithsQueryError,
    refetch
  } = useGetDayHadithsQuery();

  /*  After retrieving we set that data as redux state and now we are accessing it */
  const allDayHadith = useSelector((state) => state.home.allDayHadith);

  useEffect(() => {
    if (location.pathname === '/') {
      setIsLoading(true);
      refetch().finally(() => setIsLoading(false));
    }
  }, [location, refetch]);

  useEffect(() => {
    if (GetDayHadithsQuerySuccess) {
      const dataWithSerialNumbers = GetDayHadithsQuery.data.map((item, index) => ({
        ...item,
        serialNumber: index + 1,
      }));
      // Setting retrieved data as redux state with serial numbers
      dispatch(setAllDayHadith(dataWithSerialNumbers));
    }
  }, [GetDayHadithsQuerySuccess, GetDayHadithsQuery, dispatch]);

  useEffect(() => {
    handleScroll(); // Initial check when allDayHadith is updated

    if (wrapperRef.current) {
      const { scrollWidth, clientWidth } = wrapperRef.current;
      setShowNext(scrollWidth + 100 > clientWidth); // Enable the next button if content is wider than the container
    }
  }, [allDayHadith]);

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
      return () => wrapper.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const containerClasses = `pt-2 pb-3 d-flex align-items-center position-relative wrapper-container ${
    isLoading || GetDayHadithsQueryError ? '' : 'border-bottom border-start border-end'
  }`;

  // Create the array with the first item having type='create'
  const hadithItems = [
    <HadithIteam key="create-item" type="create" />, // Special item with type='create'
    ...allDayHadith.map((user) => (
      <HadithIteam
        key={user?.user_id}
        user_fname={user.user_fname} // Provide default values
        user_lname={user?.user_lname}
        profile_picture={user?.profile_picture}
        hadith={user?.day_hadith?.hadith?.hadith }
        day_hadth_id={user?.day_hadith?.day_hadith_id}
        serialNumber={user?.serialNumber}
      />
    ))
  ];

  return (
    <div
      className={containerClasses}
      style={{
        backgroundColor: isLoading ? '#ffffff' : '#f8f9fa',
        height: '200px',
        paddingTop:'5px',
      
      }}
    >
      {isLoading ? (
        <HadithStatusSkeletonLoader /> // Display skeleton loader while loading
      ) : (
        <>
          <button
            className="btn scroll-button left ms-1"
            style={{ backgroundColor: '#274a65', color: 'white' }}
            onClick={scrollLeft}
            disabled={!showPrev}
          >
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </button>
          <div ref={wrapperRef} className="wrapper ml-2 my-2 flex-grow-1" onScroll={handleScroll}>
            {hadithItems}
          </div>
          <button
            className="btn scroll-button right me-1"
            style={{ backgroundColor: '#274a65', color: 'white' }}
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
