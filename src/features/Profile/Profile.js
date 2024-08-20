import React from "react";
import { useParams } from "react-router-dom";
import ProfileSkeleton from "./ProfileSkeleton/ProfileSkeleton";
import ProfileHomeBack from "./ProfileHomeBack/ProfileHomeBack";
import ProfilePost from "./ProfilePost/ProfilePost";
import { useGetUserDetailsQuery } from "../../services/friendsApi";

export default function Profile() {
  const { id } = useParams();

  // Fetch user profile data
  const { data: profileData, isFetching, isError } = useGetUserDetailsQuery(id);

  // Handle loading state
  if (isFetching) return <ProfileSkeleton />;

  // Handle error state
  if (isError) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  // Background styling for the profile cover
  const backgroundImageStyle = {
    backgroundImage: `url(http://127.0.0.1:8000/${profileData?.data?.cover_photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100px + 15vw)",
  };

  return (
    <div className="friend-home main border-start border-end mb-1 m-0 p-0" style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div className="header__wrapper m-0 p-0">
        <div style={backgroundImageStyle}>
          <ProfileHomeBack text={`${profileData?.data?.user_fname} ${profileData?.data?.user_lname}`} />
        </div>

        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img src={`http://127.0.0.1:8000/${profileData?.data?.profile_picture}`} alt="Profile" />
            </div>
            <h2>{profileData?.data?.user_fname} {profileData?.data?.user_lname}</h2>
            <p>@{profileData?.data?.identifier}</p>
          </div>
        </div>

        {/* Pass user ID to ProfilePost component */}
        <ProfilePost userId={id} />
      </div>
    </div>
  );
}
