import React, { useState } from "react";
import { useGetRandomHadithQuery, useSetDayhadithMutation } from "../../../../services/hadithApi";
import "./HadithBox.css";
import { useMediaQuery } from "react-responsive";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";
import { setToastSuccess } from "../../HomeSlice";

const HadithBox = () => {
  const { data: hadith, isFetching, isError, refetch } = useGetRandomHadithQuery();
  const isLg = useMediaQuery({ query: "(min-width: 1400px)" });
  const dispatch = useDispatch();
  const [buttonClass, setButtonClass] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [
    setDayHadith,
    {
      isSuccess: setDayHadithSuccess,
      isLoading: setDayHadithLoading,
      isError: setDayHadithError
    },
  ] = useSetDayhadithMutation();

  let content;
  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (isError || !hadith || !hadith.data) {
    content = <p>No Hadith available</p>;
  } else {
    content = <p>{hadith.data.hadith}</p>;
  }

  const handleAddButtonClick = async () => {
    if (buttonDisabled) return; // Prevent action if button is disabled
    try {
      setButtonDisabled(true);
      const res = await setDayHadith({ hadith_id: hadith.data.hadith_id });
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: 'Hadith added as your Day Hadith successfully' }));
        setButtonClass('success');
        console.log("Success:", res.data);
        // Remove the success class after animation
        setTimeout(() => setButtonClass(''), 500);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    } finally {
      setButtonDisabled(false); // Enable button again after processing
    }
  };

  return (
    <div className="hadith-box shadow-sm mb-2 mb-1 shadow-lg bg-white rounded border">
      <div className="hadith-head ms-0 ps-0">
        <button
          className={`btn-add ${buttonClass} ${setDayHadithLoading ? 'loading' : ''}`}
          onClick={handleAddButtonClick}
          disabled={buttonDisabled || isFetching || setDayHadithLoading} // Disable button while loading or fetching
        >
          {setDayHadithLoading || isFetching ? (
            <i className="fa-solid fa-spinner fa-spin me-1"></i> // Loading spinner icon
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
          {isLg ? "Add Day" : ""}
        </button>
        <div className="hadith-type" style={{ marginRight: "0.02rem" }}>
          <i
            style={{ marginRight: "0.2rem" }}
            className="fa-solid fa-book-open-reader fs-4"
          ></i>
          <span>{hadith && hadith.data ? hadith.data.book : "Hadith Type"}</span>
        </div>
        <div
          className={`btn-new ${isFetching ? "loading" : ""}`}
          onClick={() => refetch()}
        >
          <i className="fa-solid fa-rotate"></i>
        </div>
      </div>
      <div className="card-body px-3 pt-2">
        <div className="card-content">
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default HadithBox;
