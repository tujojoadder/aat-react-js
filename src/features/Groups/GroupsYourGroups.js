import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css";
import SmallScreenCard from "./GroupsSuggestionCard/SmallScreenCard";
import LargeScreenCard from "./GroupsSuggestionCard/LargeScreenCard.js";
import SmallScreenBack from "../SmallScreenBack/SmallScreenBack.js";
import MidScreenBack from "../SmallScreenBack/MidScreenBack.js";
import Spinner from "../Spinner/Spinner.js";
import { useGetGroupsWhereAdminQuery, useGetJoinedGroupsButNotAdminQuery } from "../../services/groupsApi.js";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function GroupsYourGroups() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  const [pageAdmin, setPageAdmin] = useState(1);
  const [pageJoined, setPageJoined] = useState(1);
  const [allAdminGroups, setAllAdminGroups] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMoreAdminGroups, setHasMoreAdminGroups] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  // Get reference and visibility state for admin groups
  const { ref: adminRef, inView: adminInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Get reference and visibility state for joined groups
  const { ref: joinedRef, inView: joinedInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetch data for groups where the user is an admin
  const {
    data: adminGroupsData,
    isFetching: isFetchingAdminGroups,
    isError: isErrorAdminGroups,
    isSuccess: isSuccessAdminGroups,
  } = useGetGroupsWhereAdminQuery(pageAdmin);

  // Fetch data for groups where the user is not an admin
  const {
    data: joinedGroupsData,
    isFetching: isFetchingJoinedGroups,
    isError: isErrorJoinedGroups,
    isSuccess: isSuccessJoinedGroups,
  } = useGetJoinedGroupsButNotAdminQuery(pageJoined);

  // Effect to process fetched admin groups data
  useEffect(() => {
    if (isSuccessAdminGroups && adminGroupsData?.data) {
      setAllAdminGroups((prev) => {
        // Filter out duplicates
        const newAdminGroups = adminGroupsData.data.filter(
          (newGroup) => !prev.some((group) => group.group_id === newGroup.group_id)
        );
        return [...prev, ...newAdminGroups];
      });

      // Update hasMoreAdminGroups based on the pagination data
      const { current_page, total_pages } = adminGroupsData;
      if (current_page >= total_pages) {
        setHasMoreAdminGroups(false);
      }
    }
  }, [adminGroupsData, isSuccessAdminGroups]);

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

  // Effect to handle infinite scroll logic for admin groups
  useEffect(() => {
    if (
      adminInView &&
      !isFetchingAdminGroups &&
      !isErrorAdminGroups &&
      hasMoreAdminGroups &&
      isSuccessAdminGroups
    ) {
      setPageAdmin((prevPage) => prevPage + 1);
    }
  }, [
    adminInView,
    isFetchingAdminGroups,
    isErrorAdminGroups,
    hasMoreAdminGroups,
    isSuccessAdminGroups,
  ]);

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

      {/* Section 1: Groups where the user is an admin */}
      <div className="admin-groups-section  px-sm-4 px-lg-2 px-3">
        <h4 className="p-2">Groups you're an admin of</h4>
        <div className="row">
          {allAdminGroups.length === 0 ? (
            <div className="col-12 text-center">No admin groups</div>
          ) : (
            allAdminGroups.map((group, index) =>
              isSmallScreen ? (
                <SmallScreenCard
                  key={index}
                  name={group.group_name}
                  handle={group.identifier}
                  image={group.group_picture}
                  group_id={group.group_id}
                  audience={group.audience}
                />
              ) : (
                <LargeScreenCard
                  key={index}
                  name={group.group_name}
                  handle={group.identifier}
                  image={group.group_picture}
                  group_id={group.group_id}
                  audience={group.audience}
                />
              )
            )
          )}
          <div
            ref={adminRef}
            className="infinite-scroll-trigger"
        
          >
            {isFetchingAdminGroups && <Spinner />}
          </div>
        </div>
      </div>

      {/* Section 2: Groups where the user is a member but not an admin */}
      <div className="friend-request-section mb-5 px-sm-4 px-lg-2 px-3">
        <h4 className="p-2">Groups you've joined</h4>
        <div className="row">
          {allPosts.length === 0 ? (
            <div className="col-12 text-center">No records</div>
          ) : (
            allPosts.map((group, index) =>
              isSmallScreen ? (
                <SmallScreenCard
                  key={index}
                  name={group.group_name}
                  handle={group.identifier}
                  image={group.group_picture}
                  group_id={group.group_id}
                  audience={group.audience}
                />
              ) : (
                <LargeScreenCard
                  key={index}
                  name={group.group_name}
                  handle={group.identifier}
                  image={group.group_picture}
                  group_id={group.group_id}
                  audience={group.audience}
                />
              )
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
