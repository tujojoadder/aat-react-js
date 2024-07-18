import React from 'react';
import { useSelector } from 'react-redux';
import QuizQuestion from './QuizQuestion/QuizQuestion';
import QuizStory from './QuizStory/QuizStory';
import LetsGo from './LetsGo/LetsGo';
import RewardSection from './RewardSection/RewardSection';

export default function QuizHome() {
  const { storySeen, quesSeen,reward } = useSelector((state) => state.quiz);

  return (
    <>

<div className=" mb-lg-1  friend-home p-0 m-0 main border-start " style={{ backgroundColor: "white",height:'100vh',overflow:'hidden' }}>
     
{storySeen ? (
  <QuizStory />
) : quesSeen ? (
  <QuizQuestion />
) :reward ?(
  <RewardSection/>
) :(
  <LetsGo />
)}
     

     </div>
    </>
  );
}



