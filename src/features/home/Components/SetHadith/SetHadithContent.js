
import React, { useState } from "react";
import { useDayHadithDetailsMutation, useGetRandomHadithQuery, useSetDayhadithMutation } from "../../../../services/hadithApi";
import { useMediaQuery } from "react-responsive";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";
import { setToastSuccess } from "../../HomeSlice";
import { NavLink, useLocation } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";
import WhoLikeHadithDay from "../Hadithbox/WhoLikeHadithDay/WhoLikeHadithDay";

export default function SetHadithContent() {

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
            console.log(res.data);
            setLikeDetails(res.data.message[0].likes);
          } else if (res.error) {
            handleApiError(res.error, dispatch);
          }
        } catch (error) {
          handleApiError(error, dispatch);
        }
      };






   /*  previous */

  const isExtraSmall = useMediaQuery({ query: "(max-width: 576px)" });
  const isSmall = useMediaQuery({
    query: "(min-width: 577px) and (max-width: 788px)"
  });
  const isMedium = useMediaQuery({
    query: "(min-width: 789px) and (max-width: 991px)"
  });
  const isLarge = useMediaQuery({ query: "(min-width: 992px)" });

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

              
              <h1>hello</h1>
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


<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid in ad officiis voluptatem non ipsam sint, eligendi molestias fugiat quisquam! Quod dolore libero voluptate officiis placeat, enim nesciunt praesentium autem?</p>
        {/* //body */}
            
          </div>

          
        </div>
      </div>
    </div>
  );
}



