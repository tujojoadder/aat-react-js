import React, { useEffect, useState, useRef } from "react";

import "./MessageAnyOne.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import echo from "../../../echo";
import { formatPostDate } from "../../../utils/dateUtils";

import MessageBody from "./MessageBody/MessageBody";
import { useSendMessageMutation } from "../../../services/chatsApi";
import { useGetUserDetailsQuery } from "../../../services/friendsApi";
import ProfileSkeleton from "../../Profile/ProfileSkeleton/ProfileSkeleton";
import Spinner from "../../Spinner/Spinner";
import { setReceiverId } from "../../home/HomeSlice";

export default function MessageAnyOne() {
  const { id } = useParams();
  const receiverID = useSelector((state) => state.home.receiver_id);
  const authId = useSelector((state) => state.home.user_id);
  const userProfile = useSelector((state) => state.home.profile_picture);

  const [messages, setMessages] = useState([]);
  const [sendMessage, { isLoading: isLoadingMessage }] =
    useSendMessageMutation();
  const {
    data: profileData,
    isFetching,
    isError,
    isSuccess,
  } = useGetUserDetailsQuery(id);

  if (isSuccess) {
    console.log(profileData);
  }

  const dispatch = useDispatch();

  /* 
useEffect(() => {
  if (id) {
 
        const formattedMessages = allFriendRequest.chat.data.map((msg) => ({
          message_id: msg.id,
          text: msg.message,
          created_at: formatPostDate(msg.created_at),
          senderId: msg.sender_id,
          receiverId: msg.receiver_id,
        }));
        setMessages(formattedMessages);
      
   
  }
}, [id, dispatch]);

 */

  useEffect(() => {
    if (id) {
      dispatch(setReceiverId(id));
      setMessages([]);
    }
  }, [id, dispatch]);

  /* useEffect(() => {
    echo.private("broadcast-message").listen(".getChatMessage", (e) => {
      console.log(e);

      // Check if the received message has necessary properties

      if (
        e.chat.data &&
        e.chat.data.message &&
        e.chat.data.receiver_id === authId &&
        id == e.chat.data.sender_id
      ) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: e.chat.data.id, // Ensure the data has an id property
            message: e.chat.data.message,
            created_at:e.chat.data.created_at,
            sender_id: e.chat.data.sender_id, // Add sender ID from the received message
            receiver_id: e.chat.data.receiver_id, // Add sender ID from the received message
          },
        ]);
      }
    });

    return () => {
      echo.leave("broadcast-message");
    };
  }, []);
  // Handle loading state
 */
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
    <div className="message-container friend-home  p-0 m-0 border-left border-right">
      <div className="message-header">
        <div
          className="posts m-0 py-2 p-0 border-bottom bg-light rounded"
          style={{
            borderRadius: "0px",
            backgroundColor: "#ffff",
            border: "none",
            minHeight: "65px",
          }}
        >
          <NavLink to={`/message`} className="text-decoration-none">
            <i className="fa-solid fa-arrow-left text-dark fs-4 p-3 pe-1 d-lg-none"></i>
          </NavLink>

          <div className="user-pics">
            {profileData?.data?.profile_picture && (
              <img
                src={profileData?.data?.profile_picture}
                className="rounded-circle user_img_msg"
                alt="user3"
              />
            )}
          </div>
          <div className="user-content-text-box">
            <div className="user-names-text" style={{ marginTop: "2px" }}>
              <div className="name-column">
                <h1 className="full-name-text m-0 p-0">
                  {profileData?.data.user_fname} {profileData?.data?.user_lname}
                </h1>
                <p className="user-name-text m-0 p-0">
                  {profileData?.data?.identifier
                    ? `@${profileData.data.identifier}`
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFetching ? (
        // Show a loading skeleton or spinner while the data is being fetched
        <div className="message-body" style={{ overflowX: "hidden" }}>
          <ProfileSkeleton />
        </div>
      ) : (
        <MessageBody userId={id} image={profileData?.data?.profile_picture} />
      )}
    </div>
  );
}
