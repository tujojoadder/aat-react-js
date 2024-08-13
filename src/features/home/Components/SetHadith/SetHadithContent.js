import React, { useState } from "react";
import {
  useDayHadithDetailsMutation,
  useGetRandomHadithQuery,
  useSetDayhadithMutation,
} from "../../../../services/hadithApi";
import "./SetHadithContent.css";
import { useMediaQuery } from "react-responsive";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";
import { setToastSuccess } from "../../HomeSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";
import WhoLikeHadithDay from "../Hadithbox/WhoLikeHadithDay/WhoLikeHadithDay";

export default function SetHadithContent() {
  const {
    data: hadith,
    isFetching,
    isError,
    refetch,
  } = useGetRandomHadithQuery();
  const naviagte = useNavigate();
  const isLg = useMediaQuery({ query: "(min-width: 1400px)" });
  const dispatch = useDispatch();
  const [buttonClass, setButtonClass] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showJoinedGroups, setShowJoinedGroups] = useState(false);
  const [likeDetails, setLikeDetails] = useState([]);
  const location = useLocation();

  const [
    DayHadithDetailsMutation,
    {
      isSuccess: DayHadithDetailsMutationSucess,
      isLoading: DayHadithDetailsMutationLoading,
      isError: DayHadithDetailsMutationError,
    },
  ] = useDayHadithDetailsMutation();

  const handleHeartClick = async () => {
    setShowJoinedGroups(!showJoinedGroups);
    try {
      const res = await DayHadithDetailsMutation();
      if (res.data) {
        setLikeDetails(res.data.message[0].likes);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  const [
    setDayHadith,
    {
      isSuccess: setDayHadithSuccess,
      isLoading: setDayHadithLoading,
      isError: setDayHadithError,
    },
  ] = useSetDayhadithMutation();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  let content;
  if (DayHadithDetailsMutationLoading) {
    content = <Spinner />;
  } else if (isFetching) {
    content = <p className="ms-4">Loading...</p>;
  } else if (isError || !hadith || !hadith.data) {
    content = <p>No Hadith available</p>;
  } else {
    if (showJoinedGroups && DayHadithDetailsMutationSucess) {
      content = (
        <div className="mb-3">
          <p className="text-left ps-4 mb-0  py-1 pt-2">
            <b>
              {" "}
              You have {likeDetails.length}{" "}
              <i className="fa-heart fs-4 fas red-heart"></i>
            </b>
          </p>
          {likeDetails.map((like, index) => {
            const user = like.user;
            const isActive =
              location.pathname ===
              `/groups/mygroup/${user.user_fname}_${user.user_lname}`;
            return (
              <NavLink
                key={index}
                to={`/groups/mygroup/${user.user_fname}_${user.user_lname}`}
                className="text-decoration-none"
              >
                <div className="col-12 mb-2">
                  <WhoLikeHadithDay
                    name={`${user.user_fname} ${user.user_lname}`}
                    handle={`@${user.identifier}`}
                    image={`${user.profile_picture}`}
                    isActive={isActive}
                  />
                </div>
              </NavLink>
            );
          })}
        </div>
      );
    } else {
      content = <h5 className="pt-1">{hadith.data.hadith}</h5>;
    }
  }

  const handleAddButtonClick = async () => {
    if (buttonDisabled) return;
    try {
      setButtonDisabled(true);
      const res = await setDayHadith({ hadith_id: hadith.data.hadith_id });
      if (res.data) {
        dispatch(
          setToastSuccess({
            toastSuccess: "Hadith added as your Day Hadith successfully",
          })
        );
        setButtonClass("success");
        setTimeout(() => setButtonClass(""), 500);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  function goBack() {
    naviagte("/");
  }

  const isExtraSmall = useMediaQuery({ query: "(max-width: 576px)" });
  const isSmall = useMediaQuery({
    query: "(min-width: 577px) and (max-width: 788px)",
  });
  const isMedium = useMediaQuery({
    query: "(min-width: 789px) and (max-width: 991px)",
  });
  const isLarge = useMediaQuery({ query: "(min-width: 992px)" });

  return (
    <div className="row justify-content-center">
      <NavLink to={`/`} className="d-none d-lg-block">
        <i
          style={{ width: "40px", height: "40px" }}
          className="fa-solid fa-arrow-left text-dark fs-2 text-decoration-none fixed-top ms-5 mt-3"
        ></i>
      </NavLink>

      <div className="col-12 col-lg-6">
        <div className="hadiths p-0">
          <div className="card-footer">
            <div className="">
              <div className="hadith-head " style={{ width: "100%", borderRadius:'0'}}>
                {/* Back for sm and md  */}

                <i
                  onClick={goBack}
                  style={{ cursor: "pointer" }}
                  className="fa-solid p-1 ms-0  fa-arrow-left fs-4 d-block d-lg-none"
                ></i>

                <button
                  style={{ borderRadius: "50px" }}
                  className={`btn-add ${buttonClass} ${
                    setDayHadithLoading ? "loading" : ""
                  }`}
                  onClick={handleAddButtonClick}
                  disabled={buttonDisabled || isFetching || setDayHadithLoading}
                >
                  {setDayHadithLoading || isFetching ? (
                    <i className="fa-solid fa-spinner fa-spin me-1"></i>
                  ) : (
                    <i className="fa-solid fa-plus"></i>
                  )}
                  <span className="text">Add Day</span>
                </button>

                <div className="hadith-info text-truncate">
                  <div
                    className="d-flex justify-content-end align-items-start"
                    onClick={handleHeartClick}
                  >  
                    <i
                      style={{ cursor: "pointer" }}
                      className={`fa-heart fs-4 fas heart ${
                        showJoinedGroups ? "liked" : ""
                      }`}
                    ></i>
                  </div>
                  <div className="hadith-type py-0">
                    <i className="fa-solid fa-book-open-reader me-1 fs-5"></i>
                    <span className="py-0">
                      {hadith && hadith.data
                        ? truncateText(hadith.data.book, 12)
                        : "Hadith Type"}
                    </span>
                  </div>
                </div>

                <div
                  className={`btn-new ${isFetching ? "loading" : ""}`}
                  onClick={() => refetch()}
                >
                  <i className="fa-solid fa-rotate"></i>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ height: "100vh" }}
            className={` ard-body card-body-content ${
              showJoinedGroups ? "card-body-white" : "card-body-light"
            }`}
          >
            <div className="card-content">
              <p
                className={`card-text ${
                  showJoinedGroups ? "px-0" : "py-2 px-3"
                }`}
              >
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
