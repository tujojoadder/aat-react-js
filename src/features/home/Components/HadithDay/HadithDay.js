import React from 'react'
import image from "./logo.jpg";
import image1 from "./logo1.png";
import image2 from "./logo2.png";
import HadithBox from '../Hadithbox/HadithBox';
import HadithDayContent from './HadithDayContent';
import { useMediaQuery } from "react-responsive";

export default function HadithDay() {
    const isNotSm = useMediaQuery({ minWidth: 576 }); // Bootstrap's sm breakpoint is 576px

  return (
    <div className={isNotSm ? "container-sm" : ""} style={{overflow:"hidden"}}>
      <div className="row " >
        {/* Previous button taking first 3 columns */}
        <div className="col-3 d-none d-xl-block   d-flex align-items-center justify-content-center">
          <button className=" carousel-dark carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
        </div>

        {/* Carousel taking middle 6 columns */}
        <div className="col-xl-6 ">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <HadithDayContent/>
              </div>
              <div className="carousel-item">
                <img src={image2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
              <HadithDayContent/>
              </div>
            </div>

            <button className="carousel-dark carousel-control-prev   d-xl-none" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-dark carousel-control-next  d-xl-none" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>




            
          </div>
        </div>

        {/* Next button taking last 3 columns */}
        <div className="col-3  d-none d-xl-block  d-flex align-items-center justify-content-center">
          <button className=" carousel-dark carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}
