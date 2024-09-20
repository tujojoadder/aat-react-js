import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LargeScreenProfile from "../../LargeScreenBack/LargeScreenProfileBack";

import { NavLink } from "react-router-dom";
import ProfileSkeleton from "../../Profile/ProfileSkeleton/ProfileSkeleton";

import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";

import MidScreenBack from "../../SmallScreenBack/MidScreenBack";
import { useDispatch, useSelector } from "react-redux";
import { useGetPageDetailsQuery } from "../../../services/pagesApi";
import PagePost from "../../Page/PagePost/PagePost";
import PagePhoto from "../../Page/PagePhoto/PagePhoto";
import PageMember from "../../Page/PageMember/PageMember";
import { setPageError } from "../../home/HomeSlice";
import PageButtons from "../../Page/PageButtons/PageButtons";
import { useGetIaccountDetailsQuery } from "../../../services/iaccountsApi";
import IChannelPosts from "../iChannelPost/IChannelPosts";
import IChannelPhotos from "../IChannelPhotos/IChannelPhotos";
import IChannelFollowerContainer from "../IChannelFollowerContainer/IChannelFollowerContainer";
import IChannelButton from "../IChannelButton/IChannelButton";

export default function IChannelProfile() {
  const pageUpdate = useSelector((state) => state.home.pageUpdate); // Track group updates

  const { id } = useParams();
  const scrollRef = useRef(null);

  const dispatch = useDispatch();

  /* // Create a unique key for storing the scroll position
  const localStorageKey = `scrollPosition_${id}`;

  // Restore scroll position from localStorage
  useEffect(() => {
    const storedScrollPosition = localStorage.getItem(localStorageKey);
    if (scrollRef.current && storedScrollPosition) {
      scrollRef.current.scrollTop = parseInt(storedScrollPosition, 10);
    }

    // Clean up scroll event listener
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [id]);

  // Handle scroll event and save scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      console.log(`Current scroll position: ${scrollTop}`); // Log scroll position
      localStorage.setItem(localStorageKey, scrollTop);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    // Clean up scroll event listener on unmount
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [id]); */

  // Fetch user profile data
  const {
    data: pageData,
    isFetching,
    isError,
    isSuccess,
    refetch,
  } = useGetIaccountDetailsQuery(id);

  useEffect(() => {
    refetch();
  }, [pageUpdate]);

  if (isError) {
    dispatch(setPageError(isError));
  }

  useEffect(() => {
    refetch();
  }, [pageUpdate]);

  if (isSuccess) {
    console.log(pageData);
  }
  // Handle loading state
  if (isFetching) return <ProfileSkeleton />;

  // Handle error state
  /*   if (isError) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
 */
  // Background styling for the profile cover
  const backgroundImageStyle = {
    backgroundImage: `url(${pageData?.data?.iaccount_cover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100px + 15vw)",
    backgroundColor: "lightgrey", // Added for debugging
  };

  return (
    <div
      className="friend-home main border-start border-end mb-1 m-0 p-0"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      <div ref={scrollRef} className="header__wrapper m-0 p-0">
        {/*    Back buttons */}
        <SmallScreenBack text={`${pageData?.data?.iaccount_name}`} />
        <MidScreenBack text={`${pageData?.data?.iaccount_name}`} />
        <LargeScreenProfile text={`${pageData?.data?.iaccount_name}`} />
        <div style={backgroundImageStyle}></div>

        {/* Header of profile */}
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img
                src={`${pageData?.data?.iaccount_picture}`}
                style={{ backgroundColor: "lightgray" }}
                alt="Profile"
              />
            </div>
            <h2>{pageData?.data?.iaccount_name}</h2>
            <p>@{pageData?.data?.identifier}</p>

            <h7
              style={{ marginBottom: "7px", marginTop: "-2px" }}
              className="ms-2"
            >
              117.2k Likes
            </h7>
          </div>
          <div className="right__col">
            <nav>
              <div className="d-flex justify-content-center justify-content-sm-end">
                {pageData?.data?.isCreator && pageData?.data?.iaccount_id && (
                  <NavLink
                    to={`/ichannel/${pageData?.data?.iaccount_id}/manage`}
                    className="text-decoration-none"
                  >
                    <div
                      className="btn btn-md btn-primary mx-4 d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-pen"></i>
                      <span className="ms-1">Manage</span>
                    </div>
                  </NavLink>
                )}
                {!pageData?.data?.isCreator && (
                  <IChannelButton
                    iChannelId={pageData?.data?.iaccount_id}
                    joinStatus={pageData?.data?.joinStatus}
                  />
                )}
              </div>
            </nav>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mt-3 mx-2 ">
          <li className="nav-item">
            <a className="nav-link active" href="#post" data-bs-toggle="tab">
              Posts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#image" data-bs-toggle="tab">
              Photos
            </a>
          </li>
          <li className="nav-item d-none d-lg-block">
            <a className="nav-link" href="#follower" data-bs-toggle="tab">
              Followers
            </a>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content p-3 px-0 ">
          {/* Post Tab Content */}
          <div className="tab-pane bg-white fade show active" id="post">
            <h5 className="ms-4 mb-4" color="#65676b">
              Posts
            </h5>
            <IChannelPosts
              iChannelId={id}
              isCreator={pageData.data.isCreator}
            />
            {/*   <PagePost pageId={id} joinStatus={pageData.data.joinStatus} /> */}
          </div>

          {/* Photos Tab Content */}
          <div className="tab-pane fade bg-white" id="image">
            <h5 className="ms-4 mb-1" color="#65676b">
              Photos
            </h5>
            <IChannelPhotos iChannelId={id} />
          </div>

          <div className="tab-pane fade bg-white" id="follower">
            <h5 className="ms-4 mb-1" color="#65676b">
              Followers
            </h5>
            <IChannelFollowerContainer iChannelId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
