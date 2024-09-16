import React, { useEffect } from 'react';
import './CorrectAns.css';
import { setHadithData, setHadithId, setStorySeen, stopReward } from '../../QuizSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetRandomHadithMutation } from '../../../../services/quizApi';

export default function CorrectAns() {
  const { points } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  // Mutation hook to fetch a new hadith
  const [postRandomHadith, { data: hadithData, error, isLoading, isSuccess }] =
    useGetRandomHadithMutation();


  const handleBack = () => {
    dispatch(stopReward());
  };


  const handleClaim = async () => {
    // Trigger the API call to fetch a new hadith
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
      dispatch(setStorySeen());
      dispatch(stopReward());
    }
  }, [hadithData, dispatch]);


  return (
    <div className="quiz-reward-container">
      <div className="reward-body ">
        <div className="reward-content">

          <h1 className="reward-title text-success">
            {/* Icon for correct answer */}
            <i className="fas fa-check-circle correct-icon"></i> Congratulations! 
          </h1>
          <div className="points">
            <span className="points-label">Reward:</span>
            <span className="points-value">+{points} points</span>
          </div>

          <div className="button-group" >
            <button className="back-button"
               disabled={isLoading}
             onClick={handleBack}>
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
