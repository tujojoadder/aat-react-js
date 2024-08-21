import React, { useEffect, useState, useRef } from "react";
import "./CustomScrollBar.css"; // Import the CSS for styling

const CustomScrollBar = ({ scrollRef }) => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const element = scrollRef.current;
        setScrollHeight(element.scrollHeight);
        setScrollTop(element.scrollTop);
      }
    };

    const refCurrent = scrollRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize values

      return () => {
        refCurrent.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollRef]);

  const scrollPercentage = (scrollTop / (scrollHeight - window.innerHeight)) * 100;

  return (
    <div className="custom-scrollbar">
      <div
        className="scroll-indicator"
        style={{
          height: `${scrollPercentage}%`,
          transform: `translateY(${scrollPercentage}%)`,
        }}
      />
    </div>
  );
};

export default CustomScrollBar;
