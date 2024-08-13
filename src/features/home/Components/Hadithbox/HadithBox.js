import React, { useState } from "react";
import { useDayHadithDetailsMutation, useGetRandomHadithQuery, useSetDayhadithMutation } from "../../../../services/hadithApi";
import "./HadithBox.css";
import { useMediaQuery } from "react-responsive";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";
import { setToastSuccess } from "../../HomeSlice";
import { NavLink, useLocation } from "react-router-dom";
import WhoLikeHadithDay from "./WhoLikeHadithDay/WhoLikeHadithDay";
import Spinner from "../../../Spinner/Spinner";

const HadithBox = () => {
  const { data: hadith, isFetching, isError, refetch } = useGetRandomHadithQuery();
  const isMid = useMediaQuery({ query: "(max-width: 992px)" });
  const isLg = useMediaQuery({ query: "(min-width: 1400px)" });
  const dispatch = useDispatch();
  const [buttonClass, setButtonClass] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showJoinedGroups, setShowJoinedGroups] = useState(false); 
  const [likeDetails, setLikeDetails] = useState([]);
  const location = useLocation();

  const [
    DayHadithDetailsMutation,
    {
      isSuccess: DayHadithDetailsMutationSucess,
      isLoading: DayHadithDetailsMutationLoading,
      isError: DayHadithDetailsMutationError
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
      isError: setDayHadithError
    },
  ] = useSetDayhadithMutation();

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
          <p className="text-left mb-0 ps-2  ">
            <b> You have {likeDetails.length} <i className='fa-heart fs-4 fas red-heart'></i></b>
          </p>
          {likeDetails.map((like, index) => {
            const user = like.user;
            const isActive = location.pathname === `/groups/mygroup/${user.user_fname}_${user.user_lname}`;
            return (
              <NavLink key={index} to={`/groups/mygroup/${user.user_fname}_${user.user_lname}`} className="text-decoration-none">
                <div className="col-12 mb-2 p-0">
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
      content = <p>{hadith.data.hadith}</p>;
    }
  }

  const handleAddButtonClick = async () => {
    if (buttonDisabled) return;
    try {
      setButtonDisabled(true);
      const res = await setDayHadith({ hadith_id: hadith.data.hadith_id });
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: 'Hadith added as your Day Hadith successfully' }));
        setButtonClass('success');
        setTimeout(() => setButtonClass(''), 500);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    } finally {
      setButtonDisabled(false);
    }
  };

  const isDayHadithPage = location.pathname === '/dayHadith';
  const hadithBoxStyle = {
    height: isMid ? '100vh' : '',
  };

  return (
    <div className={isDayHadithPage?'p-0': 'm-0'} style={{height:isDayHadithPage?'100vh':''}}>
{/*      <div className="   m-0 p-0" style={{ backgroundColor: "white",Height:'100vh' }}>
 */}     
    <div className={`hadith-box shadow-sm mb-2 mb-1 shadow-lg bg-white rounded border ${isDayHadithPage ? 'dayHadithPage' : ''}`} style={hadithBoxStyle}>
      <div className={`hadith-head ms-0 ps-0 ${isDayHadithPage ? 'dayHadithHead' : ''}`}>
        <button
          className={`btn-add ${buttonClass} ${setDayHadithLoading ? 'loading' : ''}`}
          onClick={handleAddButtonClick}
          disabled={buttonDisabled || isFetching || setDayHadithLoading}
        >
          {setDayHadithLoading || isFetching ? (
            <i className="fa-solid fa-spinner fa-spin me-1"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
          {isLg ? "Add Day":isDayHadithPage?"Add Day":""}
        </button>

        <div className="hadith-info">
          <div
            className="d-flex justify-content-end align-items-start"
            style={{ cursor: "pointer" }}
            onClick={handleHeartClick}
          >
            <i className='fa-heart fs-4 fas heart' style={{ color: '#274a65' }}></i>
          </div>
          <div className="hadith-type p-0">
            <i style={{ marginRight: "0.2rem" }} className="fa-solid fa-book-open-reader fs-5"></i>
            <span>{hadith && hadith.data ? hadith.data.book : "Hadith Type"}</span>
          </div>
        </div>

        <div
          className={`btn-new ${isFetching ? "loading" : ""}`}
          onClick={() => refetch()}
        >
          <i className="fa-solid fa-rotate"></i>
        </div>
      </div>
      <div className={`card-body p-0 pt-2   ${showJoinedGroups ? 'card-body-white  px-0' : 'card-body-light px-2' } ${isDayHadithPage ? 'dayHadithBody m-0 p-3 ' : 'p-3'}`}>
        <div className="card-content">
         <p className={`card-text ${showJoinedGroups ? 'px-0' : 'py-2 px-2 pt-1 '}`}>{content}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HadithBox;
