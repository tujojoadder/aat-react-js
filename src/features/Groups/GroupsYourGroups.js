import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css";
import SmallScreenCard from "./GroupsSuggestionCard/SmallScreenCard";
import LargeScreenCard from "./GroupsSuggestionCard/LargeScreenCard";
import SmallScreenBack from "../SmallScreenBack/SmallScreenBack";
import MidScreenBack from "../SmallScreenBack/MidScreenBack";
import Spinner from "../Spinner/Spinner";
import { useGetGroupsWhereAdminQuery, useGetJoinedGroupsButNotAdminQuery } from "../../services/groupsApi";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function GroupsYourGroups() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const groupUpdate = useSelector((state) => state.home.groupUpdate);

  const [pageJoined, setPageJoined] = useState(1);
  const [allAdminGroups, setAllAdminGroups] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { ref: joinedRef, inView: joinedInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const {
    data: adminGroupsDataResponse,
    isFetching: isFetchingAdminGroups,
    isError: isErrorAdminGroups,
    isSuccess: isSuccessAdminGroups,
    error: adminGroupsError,
  } = useGetGroupsWhereAdminQuery();

  const {
    data: joinedGroupsData,
    isFetching: isFetchingJoinedGroups,
    isError: isErrorJoinedGroups,
    isSuccess: isSuccessJoinedGroups,
    refetch: refetchJoinedGroups,
  } = useGetJoinedGroupsButNotAdminQuery(pageJoined);

  useEffect(() => {
    if (isErrorAdminGroups) {
      console.error('Error fetching admin groups:', adminGroupsError);
    }
    if (isSuccessAdminGroups) {
      console.log('Fetched admin groups data:', adminGroupsDataResponse);
      const adminGroupsData = Object.values(adminGroupsDataResponse);

      if (Array.isArray(adminGroupsData)) {
        setAllAdminGroups(adminGroupsData);
      } else {
        console.error('Admin groups data is not an array:', adminGroupsDataResponse);
      }
    }
  }, [adminGroupsDataResponse, isSuccessAdminGroups, isErrorAdminGroups, adminGroupsError]);

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

        const { current_page, total_pages } = joinedGroupsData;
        if (current_page >= total_pages) {
          setHasMorePosts(false);
        }
      }
    }
  }, [joinedGroupsData, isSuccessJoinedGroups]);

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
      <SmallScreenBack text="Your groups" />
      <MidScreenBack text="Your groups" />
      <div className="sm-back-sm"></div>

      <div className="admin-groups-section px-sm-4 px-lg-2 px-3">
        <h4 className="p-2">Groups you're an admin of</h4>
        <div className="row">
          {isFetchingAdminGroups ? (
            <Spinner />
          ) : (Array.isArray(allAdminGroups) && allAdminGroups.length > 0) ? (
            allAdminGroups.map((group, index) =>
              isSmallScreen ? (
                <SmallScreenCard
                  key={index}
                  name={group.group_name}
                  handle={group.identifier}
                  image={group.group_picture}
                  group_id={group.group_id}
                  audience={group.audience}
                  type="admin"
                />
              ) : (
                <LargeScreenCard
                  key={index}
                  name={group.group_name}
                  handle={group.identifier}
                  image={group.group_picture}
                  group_id={group.group_id}
                  audience={group.audience}
                  type="admin"
                />
              )
            )
          ) : (
            <p>No admin groups found.</p>
          )}
        </div>
      </div>

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
