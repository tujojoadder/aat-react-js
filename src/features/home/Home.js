import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import HadithIteam from "./Components/HadithItem/HadithIteam";
import "./.././../all.css";
import "./.././../style.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import BothPost from "./Components/BothPost/BothPost";
import ImagePost from "./Components/ImagePost/ImagePost";

export default function Home() {
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
    <div className="p-0 m-0 border" style={{ width: "100%" }}>
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

      <div className="center-flex-container flex-item">
        <div className="home py-2">
          <h1>Home</h1>
        </div>
        {/* Create post */}
        <CreatePost />
        {/* Text post */}
        <TextPost />
        {/* Both post */}
        <BothPost />
        {/* Image post */}
        <ImagePost />
        <BothPost />
        <BothPost />
        <TextPost />
        <ImagePost />
        <TextPost />
        <BothPost />
        <ImagePost />
        <TextPost />
        <BothPost />
        <TextPost />
        <TextPost />
        <TextPost />
        <ImagePost />
        <TextPost />
        <TextPost />
        <TextPost />
      </div>
    </div>
  );
}
