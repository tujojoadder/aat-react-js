import React, { useState, useEffect } from "react";
import "./QuizQuestion.css"; // Import the custom CSS file
import { useDispatch, useSelector } from "react-redux";
import { setLose, setPoints, setQuizPage, setReward, setWin, stopQuesSeen } from "../QuizSlice";
import { useCheckAnswerMutation } from "../../../services/quizApi";

export default function QuizQuestion() {
  const { question, first_ans, second_ans,question_id } = useSelector(
    (state) => state.quiz
  );
  const dispatch = useDispatch();

  // State to track the selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [checkAnswer, { data: answerResponse, isSuccess, isError, isLoading }] =
    useCheckAnswerMutation();

  // Handle the result in useEffect
  useEffect(() => {
    if (isSuccess) {
      if (answerResponse?.is_correct) {
        dispatch(setQuizPage({ quiz_page: 'reward' }));
        dispatch(setWin()); //make win state true
        dispatch(setPoints({points:5})); 
      } else {
        /*                 alert(`Wrong answer! The correct answer was ${answerResponse?.correct_answer}`); */
        dispatch(setQuizPage({ quiz_page: 'reward' }));
        dispatch(setLose()); //make win state false
        dispatch(setPoints({points:5})); 
      }
      // Stop the question screen after the result
      dispatch(stopQuesSeen());
      setSelectedAnswer(null); // Reset selected answer after success
    }
  }, [isSuccess, answerResponse, dispatch]);

  const handleAns = async (answer) => {
    setSelectedAnswer(answer); // Set the selected answer
    await checkAnswer({ question_id, selected_answer: answer });
  };

  return (
    <div className="quiz-ques-container main">
      <div className="ques-body">
        <div className="quiz-header">
          <h2 className="header-title text-center mt-4 text-secondary">
            Question
          </h2>
          <hr />
        </div>

        <p className="ques-content">{question}</p>

        <div className="quiz-options">
          <button
            className="quiz-option"
            onClick={() => handleAns(first_ans)}
            disabled={isLoading} // Disable both buttons during loading
          >
            {selectedAnswer === first_ans && isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <>A. {first_ans}</>
            )}
          </button>

          <button
            className="quiz-option"
            onClick={() => handleAns(second_ans)}
            disabled={isLoading} // Disable both buttons during loading
          >
            {selectedAnswer === second_ans && isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <>B. {second_ans}</>
            )}
          </button>
        </div>

        {isError && (
          <p className="error-message">
            An error occurred. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
