import React, { useEffect, useRef, useState } from 'react'
import HadithIteam from '../HadithItem/HadithIteam'

export default function HadithStatus() {
    const wrapperRef = useRef(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
  
    const scrollLeft = () => {
        if (wrapperRef.current) {
          wrapperRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
      };
    
      const scrollRight = () => {
        if (wrapperRef.current) {
          wrapperRef.current.scrollBy({ left: 300, behavior: "smooth" });
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
          wrapper.addEventListener("scroll", handleScroll);
          handleScroll(); // Initial check
          return () => wrapper.removeEventListener("scroll", handleScroll);
        }
      }, []);
  return (
    <div className="d-flex align-items-center position-relative wrapper-container">
    <button
      className="btn btn-primary scroll-button left ms-1"
      onClick={scrollLeft}
      disabled={!showPrev}
    >
      <i className="fa fa-angle-left" aria-hidden="true"></i>
    </button>
    <div ref={wrapperRef} className="wrapper ml-2 my-2 flex-grow-1">
      <HadithIteam />
      <HadithIteam />
      <HadithIteam />
      <HadithIteam />
      <HadithIteam />
      <HadithIteam />
      <HadithIteam />
      <HadithIteam />
      <HadithIteam />
      <HadithIteam />
    </div>
    <button
      className="btn btn-primary scroll-button right me-1"
      onClick={scrollRight}
      disabled={!showNext}
    >
      <i className="fa fa-angle-right" aria-hidden="true"></i>
    </button>
  </div>
  )
}
