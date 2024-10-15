import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
import { useInView } from "react-intersection-observer";
import Spinner from "../../Spinner/Spinner";
import { useGetFriendSuggestionQuery } from "../../../services/friendsApi";
import SuggestionItemSm from "../SmallScreenItem/SuggestionItemSm/SuggestionItemSm";
import { useMediaQuery } from "react-responsive";

export default function FriendSuggestionFooterContainer() {
  const location = useLocation();
  // Get reference and visibility state for friend suggestions
  const { ref: suggestionRef, inView: inViewSuggestions } = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  // Friend Suggestions State Management
  const [friendSuggestionPage, setFriendSuggestionPage] = useState(1);
  const [allFriendSuggestions, setAllFriendSuggestions] = useState([]);
  const [hasMoreFriendSuggestions, setHasMoreFriendSuggestions] =useState(true);
  const [paddingBottom, setPaddingBottom] = useState("30vh"); // Default padding
  
  // Fetching Friend Suggestions
  const {
    data: useGetFriendSuggestionQueryData,
    isSuccess: useGetFriendSuggestionQuerySuccess,
    isFetching: useGetFriendSuggestionQueryIsFetching,
    isError: useGetFriendSuggestionQueryError,
    
  } = useGetFriendSuggestionQuery({ friendSuggestionPage });

useEffect(() => {
  setFriendSuggestionPage(1);
  setAllFriendSuggestions([]);
  setHasMoreFriendSuggestions(true);

}, []);


  // Define media queries
  const isSmallScreen = useMediaQuery({ query: '(max-height: 600px)' });

  useEffect(() => {
    if (isSmallScreen) {
      setPaddingBottom('35vh');
    } else {
      setPaddingBottom('20vh');
    }
  }, [isSmallScreen]);

// Effect to handle infinite scroll logic for friend suggestions
useEffect(() => {
  if (
    inViewSuggestions &&
    !useGetFriendSuggestionQueryIsFetching &&
    !useGetFriendSuggestionQueryError &&
    hasMoreFriendSuggestions &&
    useGetFriendSuggestionQuerySuccess
  ) {
    setFriendSuggestionPage((prevPage) => prevPage + 1);
  }
}, [
  inViewSuggestions,
  useGetFriendSuggestionQueryIsFetching,
  useGetFriendSuggestionQueryError,
  hasMoreFriendSuggestions,
  useGetFriendSuggestionQuerySuccess,
]);

  // Effect to process fetched friend suggestion data
  useEffect(() => {
    if (
      useGetFriendSuggestionQuerySuccess &&
      useGetFriendSuggestionQueryData?.data
    ) {
      if (useGetFriendSuggestionQueryData.data.length === 0) {
        setHasMoreFriendSuggestions(false); // No more data to load
      }
      const newSuggestions = useGetFriendSuggestionQueryData.data.filter(
        (newSuggestion) =>
          !allFriendSuggestions.some(
            (suggestion) => suggestion.user_id === newSuggestion.user_id
          )
      );
      if (newSuggestions.length > 0) {
        setAllFriendSuggestions((prevSuggestions) => [
          ...prevSuggestions,
          ...newSuggestions,
        ]);
      }
    }
  }, [useGetFriendSuggestionQuerySuccess, useGetFriendSuggestionQueryData]);

  return (
  
        <div style={{ paddingBottom: paddingBottom }}>
          {allFriendSuggestions.length === 0 ? (
            <div className="col-12 text-center">No records</div>
          ) : (
            allFriendSuggestions.map((profile) => {
              const isActive =
                location.pathname === `/friends/suggestions/${profile.user_id}`;
              return (
                <SuggestionItemSm
                  key={profile.friend_request_id}
                  name={`${profile.user_fname} ${profile.user_lname}`}
                  handle={profile.identifier}
                  image={profile.profile_picture}
                  user_id={profile.user_id}
                  isActive={isActive}
                />
              );
            })
          )}

          {/*   //Spinner Scroll */}
          <div
            ref={suggestionRef}
            className="infinite-scroll-trigger"
           
          >
            {useGetFriendSuggestionQueryIsFetching && <Spinner />}
          </div>
        </div>
    
  
  );
}
