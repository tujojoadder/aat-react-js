import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css";
import SmallScreenCard from "./GroupsSuggestionCard/SmallScreenCard";
import LargeScreenCard from "./GroupsSuggestionCard/LargeScreenCard.js";
import SmallScreenBack from "../SmallScreenBack/SmallScreenBack.js";
import MidScreenBack from "../SmallScreenBack/MidScreenBack.js";
import Spinner from "../Spinner/Spinner.js";
import { useGetJoinedGroupsButNotAdminQuery } from "../../services/groupsApi.js";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function GroupsJoinedGroups() {
  const groupUpdate = useSelector((state) => state.home.groupUpdate);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const [pageJoined, setPageJoined] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  // Get reference and visibility state for joined groups
  const { ref: joinedRef, inView: joinedInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetch data for groups where the user is not an admin
  const {
    data: joinedGroupsData,
    isFetching: isFetchingJoinedGroups,
    isError: isErrorJoinedGroups,
    isSuccess: isSuccessJoinedGroups,
  } = useGetJoinedGroupsButNotAdminQuery(pageJoined);

  // Effect to handle fetching data from page 1 whenever the component mounts or groupUpdate changes
  useEffect(() => {
    setPageJoined(1);
    setAllPosts([]);
    setHasMorePosts(true);
  }, [groupUpdate]);

  // Effect to process fetched joined (not admin) groups data
  useEffect(() => {
    if (isSuccessJoinedGroups && joinedGroupsData?.data) {
      if (joinedGroupsData.data.length === 0) {
        setHasMorePosts(false);
      } else {
        const newPosts = joinedGroupsData.data.filter(
          (newPost) =>
            !allPosts.some((post) => post.group_id === newPost.group_id)
        );
        if (newPosts.length > 0) {
          setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
        }

        // Update hasMorePosts based on the pagination data
        const { current_page, total_pages } = joinedGroupsData;
        if (current_page >= total_pages) {
          setHasMorePosts(false);
        }
      }
    }
  }, [joinedGroupsData, isSuccessJoinedGroups]);

  // Effect to handle infinite scroll logic for joined groups
  useEffect(() => {
    if (
      joinedInView &&
      !isFetchingJoinedGroups &&
      !isErrorJoinedGroups &&
      hasMorePosts &&
      isSuccessJoinedGroups
    ) {
      setPageJoined((prevPage) => prevPage + 1);
    }
  }, [
    joinedInView,
    isFetchingJoinedGroups,
    isErrorJoinedGroups,
    hasMorePosts,
    isSuccessJoinedGroups,
  ]);

  return (
    <div
      className="friend-home main m-0 p-0 border-sm-0 border-left border-right"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      {/* Back button */}
      <SmallScreenBack text="Your groups" />
      <MidScreenBack text="Your groups" />
      <div className="sm-back-sm"></div>

      {/* Section: Groups where the user is a member but not an admin */}
      <div className="friend-request-section mb-5 px-sm-4 px-lg-2 px-3">
        <h4 className="p-2">Groups you've joined</h4>
        <div className="row">
          {allPosts.map((group, index) =>
            isSmallScreen ? (
              <SmallScreenCard
                key={index}
                name={group.group_name}
                handle={group.identifier}
                image={group.group_picture}
                group_id={group.group_id}
                audience={group.audience}
                type="joined"
              />
            ) : (
              <LargeScreenCard
                key={index}
                name={group.group_name}
                handle={group.identifier}
                image={group.group_picture}
                group_id={group.group_id}
                audience={group.audience}
                type="joined"
              />
            )
          )}
          <div
            ref={joinedRef}
            className="infinite-scroll-trigger"
            style={{ height: "7vh", minHeight: "40px" }}
          >
            {isFetchingJoinedGroups && <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
}
