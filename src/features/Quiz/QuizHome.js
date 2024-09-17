import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuizQuestion from "./QuizQuestion/QuizQuestion";
import QuizStory from "./QuizStory/QuizStory";
import LetsGo from "./LetsGo/LetsGo";
import RewardSection from "./RewardSection/RewardSection";
import {
  setFirstAns,
  setHadithData,
  setHadithId,
  setQuesSeen,
  setQuestion,
  setQuestionId,
  setSecondAns,
  setStorySeen,
  stopStorySeen,
} from "./QuizSlice";
import { useGetCurrentStoryQuery } from "../../services/quizApi";

export default function QuizHome() {
  const { storySeen, quesSeen, reward } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  // Fetch current story data using RTK Query
  const { data: currentStory, error, isLoading } = useGetCurrentStoryQuery();

  // When current story data is fetched, store it in Redux
  useEffect(() => {
    if (currentStory && currentStory?.reading=='no') {
      console.log(currentStory)
      dispatch(setHadithData(currentStory?.hadith_text));
      dispatch(setHadithId(currentStory?.hadith_id));
      dispatch(setStorySeen());
    }
    if (currentStory && currentStory?.reading=='yes') {
      console.log(currentStory)
      // Dispatch actions to update Redux store
      dispatch(stopStorySeen());
      dispatch(setQuesSeen());
      dispatch(setQuestionId(currentStory?.question_id));
      dispatch(setQuestion(currentStory?.question));
      dispatch(setFirstAns(currentStory?.first_ans));
      dispatch(setSecondAns(currentStory?.second_ans));
    }
  }, [currentStory, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading current story.</div>;

  return (
    <div
      className=" mb-lg-1  friend-home p-0 m-0 main border-start "
      style={{
        backgroundColor: "white",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {storySeen ? (
        <QuizStory />
      ) : quesSeen ? (
        <QuizQuestion />
      ) : reward ? (
        <RewardSection />
      ) : (
        <LetsGo />
      )}
    </div>
  );
}
