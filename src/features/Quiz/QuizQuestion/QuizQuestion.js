import React from "react";
import "./QuizQuestion.css"; // Import the custom CSS file
import { useDispatch } from "react-redux";
import { setReward, stopQuesSeen } from "../QuizSlice";

export default function QuizQuestion() {
  const dispatch = useDispatch();

  const handleAns = () => {
    dispatch(stopQuesSeen());
    dispatch(setReward());
  };

  return (
    <div className="quiz-ques-container main ">
      <div className="ques-dody">
        <div className="quiz-header">
        <h2 className="header-title text-center mt-4  text-secondary " style={{fontFamily:''}}>Question</h2>

          <hr />
        </div>

        <p className="ques-content">
          What is thWhat is the capital of France?What is the capital of France?
       lorem500   loreem30 loreem30e capital of France? loreem30 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio possimus molestiae, omnis magni assumenda porro adipisci facere libero facilis rem blanditiis obcaecati ab quisquam dicta odio deleniti corrupti fugiat et?
        </p>
        <div className="quiz-options">
          <button className="quiz-option">
            A. London Lorem, ipsum dolor
          </button>
          <button className="quiz-option">B. Berlin</button>
          <button className="quiz-option">C. Paris</button>
          <button className="quiz-option" onClick={handleAns}>
            D. Madrid
          </button>
        </div>
      </div>
    </div>
  );
}
