import React from 'react';
import './CorrectAns.css';
import { setStorySeen, stopReward } from '../../QuizSlice';
import { useDispatch } from 'react-redux';

export default function CorrectAns() {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(stopReward());
  };

  const handleClaim = () => {
    dispatch(stopReward());
    dispatch(setStorySeen());
  };

  return (
    <div className="quiz-reward-container">
      <div className="reward-body ">
        <div className="reward-content">

          <h1 className="reward-title text-success">
            {/* Icon for correct answer */}
            <i className="fas fa-check-circle correct-icon"></i> Congratulations! 
          </h1>
          <div className="points">
            <span className="points-label">Reward:</span>
            <span className="points-value">+5 points</span>
          </div>

          <div className="button-group" >
            <button className="back-button" onClick={handleBack}>
              <i className="fas fa-chevron-left"></i> Back
            </button>
            <button className="claim-button" onClick={handleClaim}>
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
