import React, { useEffect } from "react";
import "./LetsGo.css"; // Custom CSS for styling the button and container
import { useDispatch, useSelector } from "react-redux";
import { setStorySeen, setHadithData, setHadithId, setQuizPage } from "../QuizSlice";
import { useGetRandomHadithMutation } from "../../../services/quizApi";
import { handleApiError } from "../../handleApiError/handleApiError";
export default function LetsGo() {
  const dispatch = useDispatch();
  const [postRandomHadith, { data: hadithData, error, isLoading,isSuccess }] = useGetRandomHadithMutation();
  const { quiz_page } = useSelector((state) => state.quiz);
  // Handle the "Let's Go" button click event
  const handleLetsGo = async () => {
    try {
      await postRandomHadith(); // Trigger the POST request
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };



  // When hadith data is available, store it in the Redux state and mark the story as seen
  useEffect(() => {
    if (hadithData) {
      dispatch(setHadithData(hadithData.hadith.hadith));
      dispatch(setHadithId(hadithData.hadith.hadith_id));
      dispatch(setQuizPage({ quiz_page: 'story' }));
    }
  }, [hadithData, dispatch]);

  return (
    <div className="letsgo-container">
        <h1>{quiz_page}</h1>
      <button className="letsgo-button" onClick={handleLetsGo} disabled={isLoading}>
        {isLoading ? "Loading..." : "Let's Go"}
      </button>
    </div>
  );
}

