import React, { useEffect } from 'react';
import './RewardSection.css'; // Import your custom CSS file for styling
import CorrectAns from './CorrectAns/CorrectAns';
import WrongAns from './WrongAns/WrongAns';
import { useSelector, useDispatch } from 'react-redux';
import { setReward, stopQuesSeen, stopReward, stopStorySeen } from '../QuizSlice'; // Import the stopReward action

const RewardSection = () => {
  // Destructure win from the state
  const { win } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();


  

  return (
    <div className="reward-container main m-0 p-0">
      {/* Conditionally render CorrectAns or WrongAns based on the win value */}
      {win ? <CorrectAns /> : <WrongAns />}
    </div>
  );
};

export default RewardSection;
