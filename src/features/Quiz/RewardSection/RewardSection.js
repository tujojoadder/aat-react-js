import React from 'react';
import './RewardSection.css'; // Import your custom CSS file for styling
import CorrectAns from './CorrectAns/CorrectAns';
import WrongAns from './WrongAns/WrongAns';

const RewardSection = () => {


  return (
    <div className="reward-container main border-start m-0 p-0">
 
     <WrongAns/>
   {/*   <CorrectAns/> */}
    </div>
  );
};

export default RewardSection;
