import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import SendFriendRequest from "../home/Components/SendFriendRequest/SendFriendRequest";
import AllFriendList from "./AllFriendList/AllFriendList";
import FriendsTabs from "./FriendsTabs/FriendsTabs";
import AllFriendFooterContainer from "../ItemContainner/AllFriendFooterContainer/AllFriendFooterContainer";
import SmallScreenBack from "../SmallScreenBack/SmallScreenBack";
import MidScreenBack from "../SmallScreenBack/MidScreenBack";
import MidLgScreenBack from "../SmallScreenBack/MidLgScreenBack";

export default function NoUserSelectedAllFriends() {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100.1vh",
      textAlign: "center",
      color: "#555",
      fontFamily: "Arial, sans-serif",
    },
    content: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    icon: {
      fontSize: "24px",
      color: "#007bff",
      marginBottom: "10px",
    },
    message: {
      margin: "0",
      fontSize: "16px",
    },
  };

  const location = useLocation();

  return (
    <>
      {/* Content for small and medium devices */}
      <div className="d-block d-lg-none  px-0" style={{ overflow: "hidden" }}>

        {/*  Back button */}
        <SmallScreenBack text="All friends" />
        <MidLgScreenBack text="All friends" />


        {/*    Use sm-back for equalize top margin */}
        <div className="sm-back">
          <AllFriendFooterContainer />
        </div>
      </div>

      {/* Content for large devices */}
      <div
        className="d-none d-lg-block border-start border-end"
        style={{ height: "100vh" }}
      >
        <div style={styles.container}>
          <div style={styles.content}>
            <i className="fas fa-info-circle" style={styles.icon}></i>
            <h5 style={styles.message}>
              Select people's names to preview their profile.
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
