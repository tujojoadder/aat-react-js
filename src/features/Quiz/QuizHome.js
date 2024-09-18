import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuizQuestion from "./QuizQuestion/QuizQuestion";
import QuizStory from "./QuizStory/QuizStory";
import LetsGo from "./LetsGo/LetsGo";
import {
  setHadithData,
  setHadithId,
  setQuizPage,
  setQuestionId,
  setQuestion,
  setFirstAns,
  setSecondAns,
} from "./QuizSlice";
import {
  useGetCurrentStoryQuery,
  useGetRandomHadithMutation,
  useGetRandomQuestionMutation,
} from "../../services/quizApi";
import { handleApiError } from "../handleApiError/handleApiError";
import RewardSection from "./RewardSection/RewardSection";
import CorrectAns from "./RewardSection/CorrectAns/CorrectAns";
import WrongAns from "./RewardSection/WrongAns/WrongAns";
import LetsGoSkeleton from "./LetsGo/LetsGoSkeleton";
export default function QuizHome() {
  const { quiz_page, hadithData, hadithId, win } = useSelector(
    (state) => state.quiz
  );
  const dispatch = useDispatch();
  const quizPageRef = useRef(null); // Using ref to store quiz page

  // Fetch current story data using RTK Query
  const { data: currentStory, error, isLoading } = useGetCurrentStoryQuery();

  // Fetch random hadith
  const [
    postRandomHadith,
    {
      data: hadithDatas,
      isError: postRandomHadithError,
      isLoading: postRandomHadithLoading,
    },
  ] = useGetRandomHadithMutation();

  // On component mount, check if there's already a quiz_page and use that
  useEffect(() => {
    const savedQuizPage = sessionStorage.getItem("quiz_page");
    if (savedQuizPage) {
      dispatch(setQuizPage({ quiz_page: savedQuizPage }));
      quizPageRef.current = savedQuizPage;
    }
  }, [dispatch]);

  // Update the session storage whenever quiz_page changes
  useEffect(() => {
    if (quiz_page) {
      sessionStorage.setItem("quiz_page", quiz_page);
      quizPageRef.current = quiz_page;
    }
  }, [quiz_page]);

  // Handle the "Let's Go" button click event
  const handleLetsGo = async () => {
    try {
      await postRandomHadith();
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };



  // When current story data is fetched, store it in Redux and only update if there is no existing quiz_page
  useEffect(() => {
    if (!quizPageRef.current) {
      // Only run this if there isn't already a quiz_page
      if (currentStory && currentStory?.reading === "no") {
        dispatch(setHadithData(currentStory?.hadith_text));
        dispatch(setHadithId(currentStory?.hadith_id));
        dispatch(setQuizPage({ quiz_page: "story" }));
      } else if (currentStory && currentStory?.reading === "yes") {
        dispatch(setQuizPage({ quiz_page: "ques" }));
      } else if (currentStory && currentStory?.reading === "none") {
        dispatch(setQuizPage({ quiz_page: "lets_go" }));
      }
    }
  }, [currentStory, dispatch]);

  // When hadith data is available, store it in the Redux state and mark the story as seen
  useEffect(() => {
    if (hadithDatas) {
      dispatch(setHadithData(hadithDatas.hadith.hadith));
      dispatch(setHadithId(hadithDatas.hadith.hadith_id));
      dispatch(setQuizPage({ quiz_page: "story" }));
    }
  }, [hadithDatas, dispatch]);

  // Fetch random question and answers
  const [
    getRandomQuestion,
    {
      data: questionData,
      isLoading: getRandomQuestionisLoading,
      isError: getRandomQuestionisError,
    },
  ] = useGetRandomQuestionMutation();

  const handleLetsAns = () => {
    getRandomQuestion(hadithId)
      .unwrap()
      .then((response) => {
        if (response) {
          dispatch(setQuizPage({ quiz_page: "ques" }));
          dispatch(setQuestionId(response.question_id));
          dispatch(setQuestion(response.question));
          dispatch(setFirstAns(response.first_ans));
          dispatch(setSecondAns(response.second_ans));
        }
      })
      .catch((error) => {
        console.error("Failed to fetch question:", error);
      });
  };

  if (isLoading) return <LetsGoSkeleton/> ;
  if (error) return <div>Error loading current story.</div>;
 
  return (
    <div
      className="mb-lg-1 friend-home p-0 m-0 main border-start"
      style={{
        backgroundColor: "white",
        height: "100vh",
        overflow: "hidden",
      }}
    >
    
      {quiz_page === "story" && (
        <div className="quiz-story-container main">
          <div className="story-body">
            <div className="story-header">
              <h2 className="header-title text-secondary">
                The Hadith 
              </h2>
              <hr />
            </div>
            <p className="story-content">{hadithData}</p>
            <button
              className="start-quiz-button"
              onClick={handleLetsAns}
              disabled={getRandomQuestionisLoading}
            >
              {getRandomQuestionisLoading ? "Loading..." : "Let's Answer"}
            </button>
            {getRandomQuestionisError && <p>Error loading question.</p>}
          </div>
        </div>
      )}
      {quiz_page === "ques" && <QuizQuestion />}
      {quiz_page === "lets_go" && (
        <div className="letsgo-container">
         
          <button
            className="letsgo-button"
            onClick={handleLetsGo}
            disabled={postRandomHadithLoading}
          >
            {postRandomHadithLoading ? "Loading..." : "Let's Go"}
          </button>
        </div>
      )}

      {quiz_page === "reward" && (
        <div className="reward-container main m-0 p-0">
          {/* Conditionally render CorrectAns or WrongAns based on the win value */}
          {win ? <CorrectAns /> : <WrongAns />}
        </div>
      )}
    </div>
  );
}
