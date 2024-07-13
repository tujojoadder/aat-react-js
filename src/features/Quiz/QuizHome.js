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
      {storySeen ? (
        <QuizStory />
      ) : quesSeen ? (
        <QuizQuestion />
      ) :reward ?(
        <RewardSection/>
      ) :(
        <LetsGo />
      )}


     {/*  <RewardSection  /> */}
    </>
  );
}
