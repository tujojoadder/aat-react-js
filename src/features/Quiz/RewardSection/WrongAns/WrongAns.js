import React from "react";
import "./WrongAns.css";
import { setStorySeen, stopReward } from "../../QuizSlice";
import { useDispatch } from "react-redux";

export default function WrongAns() {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(stopReward());
  };

  const handleClaim = () => {
    dispatch(stopReward());
    dispatch(setStorySeen());
  };

  return (
    <div className="quiz-reward-container main">
      <div className="reward-body">
      
        <div className="reward-content">
          <h1 className="reward-title text-danger">
            {/* Icon for incorrect answer */}
            <i className="fa-solid fa-circle-xmark"></i> Oops! Wrong answer
          </h1>
          <div className="points">
            <span className="points-label">
              Correct Answer is: B{" "}
              <span className="text-danger ps-1">(-4)</span>
            </span>
          </div>

          <div className="button-group">
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
