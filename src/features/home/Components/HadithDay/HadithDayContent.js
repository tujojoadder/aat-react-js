import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./HadithDayContent.css";
import { useLikeDayHadithMutation } from "../../../../services/hadithApi";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";
import { setIsLiked, setToastSuccess } from "../../HomeSlice";

export default function HadithDayContent({
  index,
  hadith,
  serialNumber,
  handlePrev,
  handleNext,
  isPrevDisabled,
  isNextDisabled,
  day_hadith_id,
  isLiked
}) {
  const [prevButtonMargin, setPrevButtonMargin] = useState("0");
  const [nextButtonMargin, setNextButtonMargin] = useState("0");
  const [isHeartClicked, setIsHeartClicked] = useState(isLiked);

  const isExtraSmall = useMediaQuery({ query: "(max-width: 576px)" });
  const isSmall = useMediaQuery({
    query: "(min-width: 577px) and (max-width: 788px)"
  });
  const isMedium = useMediaQuery({
    query: "(min-width: 789px) and (max-width: 991px)"
  });
  const isLarge = useMediaQuery({ query: "(min-width: 992px)" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLarge) {
      setPrevButtonMargin("26%");
      setNextButtonMargin("26%");
    } else if (isMedium) {
      setPrevButtonMargin("10%");
      setNextButtonMargin("10%");
    } else {
      setPrevButtonMargin("0");
      setNextButtonMargin("0");
    }
  }, [isExtraSmall, isSmall, isMedium, isLarge]);

  useEffect(() => {
    setIsHeartClicked(isLiked);
  }, [index, isLiked]);

  const [
    LikeDayHadithMutation,
    {
      isSuccess: LikeDayHadithMutationSucess,
      isLoading: LikeDayHadithMutationLoading,
      isError: LikeDayHadithMutationError
    }
  ] = useLikeDayHadithMutation();

  const likeClickHandle = async (e) => {
    setIsHeartClicked(true);
    e.stopPropagation();
    e.preventDefault();

    try {
      const res = await LikeDayHadithMutation({ day_hadith_id });
      
      if (res.data) {
        dispatch(setIsLiked({ index }));

        if (res.data.message=='Love sended') {
          dispatch(setToastSuccess({ toastSuccess: res.data.message }));
        }

      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };





  

  return (
    <div className="row justify-content-center" style={{ backgroundColor: "#bababa" }}>
      <NavLink to={`/`} className="d-none d-lg-block">
        <i
          style={{ width: "40px", height: "40px" }}
          className="fa-solid fa-arrow-left text-dark fs-2 text-decoration-none fixed-top ms-5 mt-3"
        ></i>
      </NavLink>

      <div
        className="col-12 col-lg-6"
        style={{
          backgroundColor: "#bababa",
          width: isExtraSmall
            ? "100%"
            : isSmall
            ? "100%"
            : isMedium
            ? "100%"
            : "49.2%"
        }}
      >
        <div className="haddis p-0">
          <div
            className="card-footer p-0 m-0 border"
            style={{
              position: "fixed",
              top: "0",
              width: isExtraSmall
                ? "100%"
                : isSmall
                ? "100%"
                : isMedium
                ? "100%"
                : "48.5%",
              zIndex: "1000"
            }}
          >
            <div
              className="posts m-0 py-2 p-0"
              style={{
                borderRadius: "0px",
                backgroundColor: "#ffffff",
                border: "none",
                minHeight: "65px",
                borderBottom: "2px solid black"
              }}
            >
              <NavLink to={`/`} className="text-decoration-none">
                <i className="fa-solid fa-arrow-left text-dark fs-4 p-3 pe-1 d-lg-none "></i>
              </NavLink>

              <div className="user-pics">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-circle user_img_msg"
                  alt="user3"
                />
              </div>
              <div className="user-content-text-box">
                <div className="user-names-text" style={{ marginTop: "2px" }}>
                  <div className="name-column">
                    <h1 className="full-name-text m-0 p-0">Mohammad</h1>
                    <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card-body bg-info custom-scroll bg-opacity-10 mt-5"
            style={{
              paddingBottom: "70px",
              height: "100vh",
              backgroundColor: "#ffffff"
            }}
          >
            <div className="pl-4 pr-3 py-4 pt-5 pb-5 mb-2">
              <h6 className="card-title">
                <div>
                  {hadith ? <p>{hadith}</p> : <p>No Hadith found</p>}
                </div>
              </h6>

              <div
                className="d-flex justify-content-end align-items-start mb-4 me-4"
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`fa-heart fs-3 ${isHeartClicked ? "fas red-heart" : "far"}`}
                  onClick={likeClickHandle}
                ></i>
              </div>
            </div>
          </div>

          <div
            className="fixed-bottom py-3 d-flex justify-content-between align-items-center"
            style={{
              paddingLeft: prevButtonMargin,
              paddingRight: nextButtonMargin
            }}
          >
            <button
              className="btn btn-primary hadith-nav-button ms-3"
              onClick={handlePrev}
              disabled={isPrevDisabled}
            >
              <i className="fa fa-chevron-left"></i> Previous
            </button>
            <button
              className="btn btn-primary hadith-nav-button me-3"
              onClick={handleNext}
              disabled={isNextDisabled}
            >
              Next <i className="fa fa-chevron-right"></i>
            </button>
         
        </div>
        </div>
      </div>
    </div>
  );
}