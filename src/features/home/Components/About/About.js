import React from 'react'
import './About.css';
export default function About() {
  return (
<div className="about-section border" style={{marginBottom:'10vh'}}>
      <div className="about-item">
        <i className="fas fa-map-marker-alt"></i>
        <span>Location: <strong>City, Country</strong></span>
      </div>
      <div className="about-item">
        <i className="fas fa-heart"></i>
        <span>Relationship Status: <strong>Single</strong></span>
      </div>
      <div className="about-item">
        <i className="fas fa-venus-mars"></i>
        <span>Gender: <strong>Female</strong></span>
      </div>
      <div className="about-item">
        <i className="fas fa-birthday-cake"></i>
        <span>Birthdate: <strong>Month Day, Year</strong></span>
      </div>
      <div className="about-item">
        <i className="fas fa-briefcase"></i>
        <span>Work: <strong>Job Title at Company</strong></span>
      </div>
      <div className="about-item">
        <i className="fas fa-graduation-cap"></i>
        <span>Education: <strong>Degree/Field of Study at University</strong></span>
      </div>
    </div>  )
}
