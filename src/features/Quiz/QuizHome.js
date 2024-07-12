import React from 'react';
import './QuizHome.css'; // Import the custom CSS file

export default function QuizHome() {
  return (
    <div className="quiz-container pt-sm-0 pt-md-3 p-2 main">
      <div className="quiz-card shadow">
        <div className="quiz-header">
          <h3 className="quiz-title">Quiz Question</h3>
        </div>
        <div className="quiz-body pb-5">
          <p className="quiz-question">What is thWhat is the capital of France?What is the capital of France? loreem30 loreem30e capital of France? loreem30

          </p>
          <div className="quiz-options">
            <button className="quiz-option">A. London  Lorem, ipsum dolor sit .</button>
            <button className="quiz-option">B. Berlin</button>
            <button className="quiz-option">C. Paris</button>
            <button className="quiz-option">D. Madrid</button>
          </div>
        </div>
      </div>
    </div>
  );
}
