import React from "react";
import SetMProfile from "../SetMProfile/SetMProfile";
import SetFProfile from "../SetFProfile/SetFProfile";
import { useSelector } from "react-redux";
import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";
import LargeScreenBack from "../../LargeScreenBack/LargeScreenBack";

export default function SetProfile() {
  const gender = useSelector((state) => state.home.gender);

  return (

    <>
    <div
      className="friend-home main border-left border-right m-0 p-0"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >

     {/* Back button */}
     <SmallScreenBack text='Set your profile' />
     <LargeScreenBack text='Set your profile' />

       {gender=='male'?(<SetMProfile/>):(<SetFProfile />)}
      
    </div>

    </>
  );
}
