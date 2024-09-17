import React, { useEffect } from "react";
import "./LetsGo.css"; // Custom CSS for styling the button and container
import { useDispatch } from "react-redux";
import { setStorySeen, setHadithData, setHadithId } from "../QuizSlice";
import { useGetRandomHadithMutation } from "../../../services/quizApi";
import { handleApiError } from "../../handleApiError/handleApiError";
export default function LetsGo() {
  const dispatch = useDispatch();
  const [postRandomHadith, { data: hadithData, error, isLoading,isSuccess }] = useGetRandomHadithMutation();

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
      dispatch(setStorySeen());
    }
  }, [hadithData, dispatch]);

  return (
    <div className="letsgo-container">
      <button className="letsgo-button" onClick={handleLetsGo} disabled={isLoading}>
        {isLoading ? "Loading..." : "Let's Go"}
      </button>
    </div>
  );
}

