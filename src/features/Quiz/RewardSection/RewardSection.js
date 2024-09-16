import React from 'react';
import './RewardSection.css'; // Import your custom CSS file for styling
import CorrectAns from './CorrectAns/CorrectAns';
import WrongAns from './WrongAns/WrongAns';
import { useSelector } from 'react-redux';

const RewardSection = () => {
  // Destructure win and points from the state
  const { win } = useSelector((state) => state.quiz);

  return (
    <div className="reward-container main m-0 p-0">
      {/* Conditionally render CorrectAns or WrongAns based on the win value */}
      {win ? <CorrectAns /> : <WrongAns />}
    </div>
  );
};

export default RewardSection;
