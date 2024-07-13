import React from 'react'
import './WrongAns.css'
import { setStorySeen, stopReward } from '../../QuizSlice';
import { useDispatch } from 'react-redux';
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
   <>
   <div className="reward-card">
        <div className="reward-header">
          <h1 className="reward-title text-danger">
         
              {/* Icon for correct answer */}
              <i class="fa-solid fa-circle-xmark"></i> Oops! Wrong answer          </h1>
          <div className="points">
            <span className="points-label ">Right Answer is : B  <span className='text-danger ps-1'>(-4)</span></span>
           

          </div>
         
        </div>
        <div className="button-group">
          <button className="back-button" onClick={handleBack}>
            <i className="fas fa-chevron-left"></i> Back
          </button>
          <button className="claim-button" onClick={handleClaim}>
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div></>
  )
}
