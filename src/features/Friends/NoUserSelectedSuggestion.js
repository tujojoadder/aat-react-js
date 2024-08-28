import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import SendFriendRequest from "../home/Components/SendFriendRequest/SendFriendRequest";
import FriendsTabs from "./FriendsTabs/FriendsTabs";
import FriendSuggestionBack from "./FriendBack/FriendSuggestionBack/FriendSuggestionBack";
import FriendSuggestionFooterContainer from "../ItemContainner/FriendSuggestionFooterContainer/FriendSuggestionFooterContainer";
import SmallScreenBack from "../SmallScreenBack/SmallScreenBack";
import MidLgScreenBack from "../SmallScreenBack/MidLgScreenBack";

export default function NoUserSelectedSuggestion() {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      height: "100vh",
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
        <SmallScreenBack text="Friend suggestions" />
        <MidLgScreenBack text="Friend suggestions" />

        {/*    Use sm-back for equalize top margin */}
        <div className="sm-back">
          <FriendSuggestionFooterContainer />
        </div>
      </div>

      {/* Content for large devices */}
      <div
        className="d-none d-lg-block border-start border-end"
        style={{ height: "101vh" }}
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
