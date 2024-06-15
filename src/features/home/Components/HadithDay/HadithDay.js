import React from 'react';
import HadithBox from '../Hadithbox/HadithBox';

export default function HadithDay() {
  return (
    <div className="container">
      <div id="carouselExample" className="carousel slide row">
        
        <div className="col-3 d-flex align-items-center justify-content-center">
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
        </div>
        
        <div className="col-6">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <HadithBox />
            </div>
            <div className="carousel-item">
              <HadithBox />
            </div>
            <div className="carousel-item">
              <HadithBox />
            </div>
          </div>
        </div>
        
        <div className="col-3 d-flex align-items-center justify-content-center">
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
