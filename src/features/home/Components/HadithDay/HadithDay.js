import React from "react";
import image from "./logo.jpg";
import image1 from "./logo1.png";
import image2 from "./logo2.png";
import "./HadithDay";
import HadithBox from "../Hadithbox/HadithBox";
import HadithDayContent from "./HadithDayContent";
import { useMediaQuery } from "react-responsive";

export default function HadithDay() {
  const isNotSm = useMediaQuery({ minWidth: 576 }); // Bootstrap's sm breakpoint is 576px

  return (
    <div
      className={isNotSm ? "container-sm" : " "}
    
    >
      <div className="row "   style={{ overflowX: "hidden" }}>
        {/* Previous button taking first 3 columns */}
        <div className="col-lg-3 col-md-2 d-none d-md-block   d-flex align-items-center justify-content-center">
          <button
            className=" carousel-dark carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
        </div>

        {/* Carousel taking middle 6 columns */}
        <div className="col-lg-6 col-md-8 m-0 p-0" >
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <HadithDayContent />
              </div>
              <div className="carousel-item">
              <HadithDayContent />              </div>
              <div className="carousel-item">
                <HadithDayContent />
              </div>
            </div>

            <button
              className="d-md-none pre carousel-dark carousel-control-prev  "
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className=" d-md-none next carousel-dark carousel-control-next  d-xl-none"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Next button taking last 3 columns */}
        <div className=" col-lg-3 col-md-2 d-none d-md-block  d-flex align-items-center justify-content-center">
          <button
            className=" carousel-dark carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
