import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LargeScreenProfile from "../../LargeScreenBack/LargeScreenProfileBack";
import ProfileSkeleton from "../../Profile/ProfileSkeleton/ProfileSkeleton";
import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";
import MidScreenBack from "../../SmallScreenBack/MidScreenBack";
import { useDispatch, useSelector } from "react-redux";
import { useGetPageDetailsQuery } from "../../../services/pagesApi";
import {
  setpageCategory,
  setpageDetails,
  setpageEmail,
  setPageError,
  setpageLocation,
  setPagePhone,
} from "../../home/HomeSlice";
import PageButtons from "../PageButtons/PageButtons";
import PageOptions from "../PageOptions/PageOptions";
import PageManageMember from "../PageManageMember/PageManageMember";
export default function PageManage() {
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
  } = useGetPageDetailsQuery(id);

  useEffect(() => {
    refetch();
  }, [pageUpdate]);

  // Dispatch actions to store audience and group details in Redux
  useEffect(() => {
    if (isSuccess) {
      dispatch(setPageError(""));
      console.log(pageData);

      // Dispatch actions to update Redux state
      dispatch(setPagePhone(pageData.data.phone));
      dispatch(setpageCategory(pageData.data.category));
      dispatch(setpageLocation(pageData.data.location));
      dispatch(setpageEmail(pageData.data.email));
      dispatch(setpageDetails(pageData.data.page_details));
    }
  }, [isSuccess, pageData, dispatch]);

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


  if (isError || !pageData?.data?.isAdmin) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }


  // Background styling for the profile cover
  const backgroundImageStyle = {
    backgroundImage: `url(${pageData?.data?.page_cover})`,
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
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mt-3 mx-2 ">
          <li className="nav-item">
            <a className="nav-link active" href="#option" data-bs-toggle="tab">
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
          {/* Post Tab Content */}
          <div className="tab-pane bg-white fade show active" id="option">
            <h5 className="ms-4 mb-4" color="#65676b">
           
            </h5>

        <PageOptions pageId={id} pageName={pageData?.data?.page_name}
         pageDetails={pageData?.data?.page_details}
         phone={pageData?.data?.phone}
         location={pageData?.data?.location}
         email={pageData?.data?.email}
         />
          </div>

          {/* Members Tab Content */}
          <div className="tab-pane fade bg-white" id="members">
            <h5 className="ms-4 mb-1" color="#65676b">
              Members
            </h5>
            <PageManageMember pageId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
