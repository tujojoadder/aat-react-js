import React, { useState } from "react";
import TextPost from "../home/Components/TextPost/TextPost";
import ImagePost from "../home/Components/ImagePost/ImagePost";
import GroupsTabs from "./GroupsTabs/GroupsTabs";
import {
  NavLink,
  useLocation,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import BPost from "../home/Components/BPost/BPost";

export default function GroupsHome() {

  return (
    <div
      className="friend-home main   "
      style={{
        backgroundColor: "white",
        marginBottom: "5vh",
        paddingLeft: "0px",
        paddingRight: "0px",
      }}
    >
      <div className="d-block d-lg-none">
        <GroupsTabs />
      </div>
  
  <BPost/>
  <ImagePost/>
  <BPost/>
  <ImagePost/>
  <TextPost/>
  <TextPost/>
  <ImagePost/>
  <TextPost/>
    </div>
  );
}
