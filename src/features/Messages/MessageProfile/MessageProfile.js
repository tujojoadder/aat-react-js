
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LargeScreenProfile from "../../LargeScreenBack/LargeScreenProfileBack";
import PageAbout from "../PageAbout/PageAbout";

import { NavLink } from "react-router-dom";
import { useGetGroupDetailsQuery } from "../../../services/groupsApi";
import ProfileSkeleton from "../../Profile/ProfileSkeleton/ProfileSkeleton";
import ProfileHomeBack from "../../Profile/ProfileHomeBack/ProfileHomeBack";
import CustomScrollBar from "../../CustomScrollBar/CustomScrollBar";
import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";
import LargeScreenBack from "../../LargeScreenBack/LargeScreenBack";
import LargeScreenProfileBack from "../../LargeScreenBack/LargeScreenProfileBack";
import MidScreenBack from "../../SmallScreenBack/MidScreenBack";
import { useDispatch, useSelector } from "react-redux";
import { useGetPageDetailsQuery } from "../../../services/pagesApi";
import PagePost from "../PagePost/PagePost";
import PagePhoto from "../PagePhoto/PagePhoto";
import PageMember from "../PageMember/PageMember";
import {
  setpageCategory,
  setpageDetails,
  setpageEmail,
  setPageError,
  setpageLocation,
  setPagePhone,
} from "../../home/HomeSlice";
import PageButtons from "../PageButtons/PageButtons";
export default function PageProfile() {

  const { id } = useParams();
  const scrollRef = useRef(null);

  const dispatch = useDispatch();



  
  if (isFetching) return <ProfileSkeleton />;

  // Handle error state
  if (isError) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }


  return (
    <div
      className="friend-home main border-start border-end mb-1 m-0 p-0"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      <div ref={scrollRef} className="header__wrapper m-0 p-0">
        {/*    Back buttons */}
        <SmallScreenBack text={`${pageData?.data?.page_name}`} />
        <MidScreenBack text={`${pageData?.data?.page_name}`} />
        <LargeScreenProfile text={`${pageData?.data?.page_name}`} />
        <div style={backgroundImageStyle}></div>

        {/* Header of profile */}
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img
                src={`${pageData?.data?.page_picture}`}
                style={{ backgroundColor: "lightgray" }}
                alt="Profile"
              />
            </div>
            <h2>{pageData?.data?.page_name}</h2>
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
                {pageData.data.isAdmin && pageData.data.page_id && (
                  <NavLink
                    to={`/page/${pageData.data.page_id}/manage`}
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
                {!pageData.data.isAdmin && (
                  <PageButtons
                    pageId={pageData.data.page_id}
                    joinStatus={pageData.data.joinStatus}
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
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              {currentTab}
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item d-lg-none"
                  href="#follower"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("Followers")}
                >
                  Followers
                </a>
              </li>

              <li>
                <a
                  className="dropdown-item"
                  href="#about"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("About")}
                >
                  About
                </a>
              </li>
            </ul>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content p-3 px-0 ">
          {/* Post Tab Content */}
          <div className="tab-pane bg-white fade show active" id="post">
            <h5 className="ms-4 mb-4" color="#65676b">
              Posts
            </h5>

            <PagePost pageId={id} isAdmin={pageData.data.isAdmin} />
          </div>

          {/* Photos Tab Content */}
          <div className="tab-pane fade bg-white" id="image">
            <h5 className="ms-4 mb-1" color="#65676b">
              Photos
            </h5>
            <PagePhoto pageId={id} />
          </div>

          {/* Followers Tab Content */}
          <div className="tab-pane fade bg-white" id="follower">
            <h5 className="ms-4 mb-1" color="#65676b">
              Followers
            </h5>

            <PageMember pageId={id} />
          </div>

          {/* About Tab Content */}
          <div className="tab-pane fade bg-white" id="about">
            <h5 className="ms-4 mb-1" color="#65676b">
              About
            </h5>
            <PageAbout />
          </div>
        </div>
      </div>
    </div>
  );
}
