import React, { useEffect } from 'react';
import './CorrectAns.css';
import { setHadithData, setHadithId, setStorySeen, stopQuesSeen, stopReward, stopStorySeen, setQuizPage } from '../../QuizSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetRandomHadithMutation } from '../../../../services/quizApi';

export default function CorrectAns() {
  const { points } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  // Mutation hook to fetch a new hadith
  const [postRandomHadith, { data: hadithData, error, isLoading, isSuccess }] =
    useGetRandomHadithMutation();

  // Handle the "Back" button click event
  const handleBack = () => {
    // Set the quiz page to "lets_go" when going back
    dispatch(setQuizPage({ quiz_page: "lets_go" }));
   
  };

  // Handle the "Claim" button click event
  const handleClaim = async () => {
    try {
      await postRandomHadith();
    } catch (error) {
      console.error("Error fetching hadith:", error);
    }
  };

  // When hadith data is available, store it in the Redux state and mark the story as seen
  useEffect(() => {
    if (hadithData) {
      dispatch(setHadithData(hadithData.hadith.hadith));
      dispatch(setHadithId(hadithData.hadith.hadith_id));
      dispatch(setQuizPage({ quiz_page: "story" }));
    }
  }, [hadithData, dispatch]);

  return (
    <div className="quiz-reward-container">
      <div className="reward-body">
        <div className="reward-content">
          <h1 className="reward-title text-success">
            <i className="fas fa-check-circle correct-icon"></i> Congratulations!
          </h1>
          <div className="points">
            <span className="points-label">Reward:</span>
            <span className="points-value">+{points} points</span>
          </div>

          <div className="button-group">
            <button
              className="back-button"
              disabled={isLoading}
              onClick={handleBack}
            >
              <i className="fas fa-chevron-left"></i> Back
            </button>
            <button
              className="claim-button"
              onClick={handleClaim}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Next..." : "Next"}{" "}
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
