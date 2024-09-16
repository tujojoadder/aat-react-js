
import React, { useEffect } from "react";
import "./WrongAns.css";
import { setHadithData, setHadithId, setStorySeen, stopReward } from "../../QuizSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetRandomHadithMutation } from "../../../../services/quizApi";

export default function WrongAns() {
  const { points } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  
  // Mutation hook to fetch a new hadith
  const [postRandomHadith, { data: hadithData, error, isLoading, isSuccess }] = useGetRandomHadithMutation();

  const handleBack = () => {
    dispatch(stopReward());
  };

  const handleClaim = async () => {
    dispatch(stopReward());

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
    }
  }, [hadithData, dispatch]);

  return (
    <div className="quiz-reward-container main">
      <div className="reward-body">
        <div className="reward-content">
          <h1 className="reward-title text-danger">
            {/* Icon for incorrect answer */}
            <i className="fa-solid fa-circle-xmark"></i> Oops! Wrong answer
          </h1>
          <div className="points">
            <span className="points-label">
              Correct Answer is: B{" "}
              <span className="text-danger ps-1">(- {points})</span>
            </span>
          </div>

          <div className="button-group">
            <button className="back-button" onClick={handleBack}>
              <i className="fas fa-chevron-left"></i> Back
            </button>
            <button 
              className="claim-button" 
              onClick={handleClaim} 
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Loading..." : "Next"} <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
