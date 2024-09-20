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
import IChannelOptions from "../IChannelOptions/IChannelOptions";

export default function IChannelManage() {
  const pageUpdate = useSelector((state) => state.home.pageUpdate); // Track group updates

  const { id } = useParams();
  const scrollRef = useRef(null);

  const dispatch = useDispatch();

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
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mt-3 mx-2 ">
          <li className="nav-item">
            <a className="nav-link active" href="#options" data-bs-toggle="tab">
              Options
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#members" data-bs-toggle="tab">
              Members
            </a>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content p-3 px-0 ">
          {/* Options Tab Content */}
          <div className="tab-pane bg-white fade show active" id="options">
            <h5 className="ms-4 mb-4" color="#65676b">
              Options
            </h5>
            <IChannelOptions
              iChannelName={pageData.data.iaccount_name}
              iChannelId={id}
            />
            {/*   <PagePost pageId={id} joinStatus={pageData.data.joinStatus} /> */}
          </div>

          {/* Members Tab Content */}
          <div className="tab-pane fade bg-white" id="members">
            <h5 className="ms-4 mb-1" color="#65676b">
              Members
            </h5>
            <IChannelFollowerContainer iChannelId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
