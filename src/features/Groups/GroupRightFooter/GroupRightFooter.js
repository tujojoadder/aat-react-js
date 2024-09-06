import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import {
  useGetGroupsWhereAdminQuery,
  useGetJoinedGroupsButNotAdminQuery,
} from "../../../services/groupsApi";
import GroupRightFooterItem from "./GroupRightFooterItem/GroupRightFooterItem";
import { Scrollbar } from "react-scrollbars-custom";
import { useSelector } from "react-redux";

export default function GroupRightFooter() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const location = useLocation();
  const [pageAdmin, setPageAdmin] = useState(1);
  const [pageJoined, setPageJoined] = useState(1);
  const [allAdminGroups, setAllAdminGroups] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMoreAdminGroups, setHasMoreAdminGroups] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const groupUpdate = useSelector((state) => state.home.groupUpdate);
  const { ref: adminRef, inView: adminInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const { ref: joinedRef, inView: joinedInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const {
    data: adminGroupsData,
    isFetching: isFetchingAdminGroups,
    isError: isErrorAdminGroups,
    isSuccess: isSuccessAdminGroups,
    refetch: refetchAdminGroups,
  } = useGetGroupsWhereAdminQuery(pageAdmin);

  const {
    data: joinedGroupsData,
    isFetching: isFetchingJoinedGroups,
    isError: isErrorJoinedGroups,
    isSuccess: isSuccessJoinedGroups,
    refetch: refetchJoinedGroups,
  } = useGetJoinedGroupsButNotAdminQuery(pageJoined);

  useEffect(() => {
    if (isSuccessAdminGroups && adminGroupsData?.data) {
      setAllAdminGroups((prev) => {
        const newAdminGroups = adminGroupsData.data.filter(
          (newGroup) =>
            !prev.some((group) => group.group_id === newGroup.group_id)
        );
        return [...prev, ...newAdminGroups];
      });

      const { current_page, total_pages } = adminGroupsData;
      if (current_page >= total_pages) {
        setHasMoreAdminGroups(false);
      }
    }
  }, [adminGroupsData, isSuccessAdminGroups]);

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

  useEffect(() => {
    // Reset states when groupUpdate occurs
    setPageAdmin(1);
    setPageJoined(1);
    setAllAdminGroups([]);
    setAllPosts([]);
    setHasMoreAdminGroups(true);
    setHasMorePosts(true);

    // Trigger refetch for both admin and joined groups
    refetchAdminGroups();
    refetchJoinedGroups();
  }, [groupUpdate]);

  return (
    <>
      <Scrollbar
        style={{
          width: "100%",
          height: "56vh",
        }}
      >
        <div
          className="friend-home main m-0 p-0 pb-5"
          style={{ backgroundColor: "white", minHeight: "100vh" }}
        >
          
          {/* Section 1: Groups where the user is an admin */}
          <div className="admin-groups-section px-sm-4 px-lg-2 px-3 mt-2">
            <div className="row">
              {allAdminGroups.map((group) => {
                const isActive = location.pathname === `/groups/mygroup/${group.group_id}`;
                return (
                  <GroupRightFooterItem
                    key={group.group_id}
                    name={group.group_name}
                    handle={group.identifier}
                    image={group.group_picture}
                    group_id={group.group_id}
                    audience={group.audience}
                    type="admin"
                    isActive={isActive}
                  />
                );
              })}
              <div ref={adminRef} className="infinite-scroll-trigger"></div>
            </div>
          </div>

          {/* Section 2: Groups where the user is a member but not an admin */}
          <div className="friend-request-section mb-5 px-sm-4 px-lg-2 px-3">
            <div className="row">
              {allPosts.map((group) => {
                const isActive = location.pathname === `/groups/mygroup/${group.group_id}`;
                return (
                  <GroupRightFooterItem
                    key={group.group_id}
                    name={group.group_name}
                    handle={group.identifier}
                    image={group.group_picture}
                    group_id={group.group_id}
                    audience={group.audience}
                    type="joined"
                    isActive={isActive}
                  />
                );
              })}
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
      </Scrollbar>
    </>
  );
}
