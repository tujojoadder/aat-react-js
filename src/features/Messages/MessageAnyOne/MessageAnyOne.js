import React, { useEffect, useState, useRef } from "react";
import SendMessage from "../SendMessages/SendMessage";
import { Scrollbar } from "react-scrollbars-custom";
import "./MessageAnyOne.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReceiverId } from "../../home/HomeSlice";
import {
  useLoadChatMutation,
  useLoadChatQuery,
  useSendMessageMutation,
} from "../../../services/chatsApi";
import echo from "../../../echo";
import { formatPostDate } from "../../../utils/dateUtils";
import { useInView } from "react-intersection-observer";
import Spinner from "../../Spinner/Spinner";

export default function MessageAnyOne() {
  const { id } = useParams();
  const receiverID = useSelector((state) => state.home.receiver_id);
  const authId = useSelector((state) => state.home.user_id);
  const userProfile = useSelector((state) => state.home.profile_picture);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const dispatch = useDispatch();

  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  const [friendRequestPage, setFriendRequestPage] = useState(1);

  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);

  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isLoading: useGetAuthUserfriendRequestQueryLoading,
    isError: useGetAuthUserfriendRequestQueryError,
    isFetching: useGetAuthUserfriendRequestQueryFetching,
    refetch: useGetAuthUserfriendRequestQueryRefetch,
  } = useLoadChatQuery({ page: friendRequestPage, receiver_id: id });

  if (useGetAuthUserfriendRequestQuerySuccess) {
    console.log(useGetAuthUserfriendRequestQueryData);
  }

  // Reset messages and page when receiverID or id changes
  useEffect(() => {
    // Reset messages and start from the first page
    setMessages([]);
    setFriendRequestPage(1);
    setHasMoreFriendRequest(true);
  }, [id, receiverID]);
  useEffect(() => {
    if (
      inViewRequests &&
      !useGetAuthUserfriendRequestQueryFetching &&
      !useGetAuthUserfriendRequestQueryError &&
      hasMoreFriendRequest &&
      useGetAuthUserfriendRequestQuerySuccess
    ) {
      console.log("Updating friendRequestPage:", friendRequestPage + 1);
      setFriendRequestPage((prevPage) => prevPage + 1);
    }
  }, [
    inViewRequests,
    useGetAuthUserfriendRequestQueryFetching,
    useGetAuthUserfriendRequestQueryError,
    hasMoreFriendRequest,
    useGetAuthUserfriendRequestQuerySuccess,
  ]);

  useEffect(() => {
    if (
      useGetAuthUserfriendRequestQuerySuccess &&
      useGetAuthUserfriendRequestQueryData?.chat.data
    ) {
      if (useGetAuthUserfriendRequestQueryData.chat.data.length < 3) {
        setHasMoreFriendRequest(false);
      }
      const newRequests = useGetAuthUserfriendRequestQueryData.chat.data.filter(
        (newRequest) =>
          !messages.some((request) => request.id === newRequest.id)
      );
      if (newRequests.length > 0) {
        setMessages((prevRequests) => [...prevRequests, ...newRequests]);
      }
    }
  }, [
    useGetAuthUserfriendRequestQuerySuccess,
    useGetAuthUserfriendRequestQueryData,
  ]);

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
useEffect(() => {
  if (id) {
    dispatch(setReceiverId(id));
    setMessages([]);
  }
}, [id, dispatch]);
 */

  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenMenuId(null);
    }
  };

  const handleOptionClick = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { text: message, sender_id: receiverID }; // Set sender ID for sent message

    setMessage("");

    try {
      const res = await sendMessage({
        receiver_id: receiverID,
        message,
      }).unwrap();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message_id: res.data.id,
          text: res.data.message,
          created_at: formatPostDate(res?.data?.created_at),
          senderId: res.data.sender_id, // Add sender ID to the message
          receiverId: res.data.receiver_id, // Add sender ID to the message
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
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
            message_id: e.chat.data.id, // Ensure the data has an id property
            text: e.chat.data.message,
            created_at: formatPostDate(e.chat.data.created_at),
            senderId: e.chat.data.sender_id, // Add sender ID from the received message
            receiverId: e.chat.data.receiver_id, // Add sender ID from the received message
          },
        ]);
      }
    });

    return () => {
      echo.leave("broadcast-message");
    };
  }, []);

  if (useGetAuthUserfriendRequestQuerySuccess) {
    console.log(messages);
  }







  const messageEndRef = useRef(null); // Create a ref for the last message

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]); // Trigger on messages change
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
            <img
              src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              className="rounded-circle user_img_msg"
              alt="user3"
            />
          </div>
          <div className="user-content-text-box">
            <div className="user-names-text" style={{ marginTop: "2px" }}>
              <div className="name-column">
                <h1 className="full-name-text m-0 p-0">Mohammad</h1>
                <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="message-body pt-3 " style={{ overflowX: "hidden" }}>
        <Scrollbar>
          <div id="msg_card_body" style={{ overflowX: "hidden" }}>
            {messages.map((msg) => (
              <div
                key={msg.id} // Ensure each message has a unique key
                className={
                  authId === msg.sender_id
                    ? "current-user-message pe-3"
                    : "distance-user-message ps-3"
                } // Conditional class name
              >
                <div
                  className={`d-flex justify-content-${
                    msg.sender_id === authId ? "end" : "start"
                  } mb-4 my`}
                >
                  {authId === msg.receiverId &&
                    id == msg.sender_id && ( // Conditionally show the image if authId matches receiverId
                      <div className="img_cont_msg">
                        <img
                          src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                          className="rounded-circle user_img_msg"
                          alt="user-img"
                        />
                      </div>
                    )}

                  <div
                    className={
                      authId === msg.sender_id
                        ? "msg_cotainer_send"
                        : "msg_cotainer"
                    }
                  >
                    {msg.message}
                    <span
                      className={
                        authId === msg.senderId ? "msg_time_send" : "msg_time"
                      }
                    >
                      {formatPostDate(msg.created_at)}
                    </span>
                    <i
                      className="fa fa-ellipsis-v msg-options-icon"
                      onClick={(e) => handleOptionClick(e, msg.id)}
                    ></i>
                    <div
                      className={`msg-options-menu ${
                        openMenuId === msg.id ? "show" : ""
                      }`}
                      id="options-2"
                      ref={menuRef}
                    >
                      <div>remove</div>
                      <div>copy</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

<div ref={messageEndRef} />

            <div
              ref={requestRef}
              className="infinite-scroll-trigger"
              style={{ height: "7vh", minHeight: "40px" }}
            >
              {useGetAuthUserfriendRequestQueryFetching && <Spinner />}
            </div>
          </div>
        </Scrollbar>
      </div>

      <div className="message-footer">
        <div
          style={{ width: "100%" }}
          className="create-comment shadow-sm border-top bg-body"
        >
          <form onSubmit={handleSubmit}>
            <div
              className="form-group-1 d-flex align-items-center py-md-3"
              style={{
                padding: "10px 15px",
                backgroundColor: "#f0f2f5",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              <img
                src={userProfile}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                alt="profile-pic"
              />
              <div style={{ flexGrow: 1, position: "relative" }}>
                <input
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                    padding: "10px 15px",
                    height: "auto",
                    boxSizing: "border-box",
                    outline: "none",
                    fontSize: "16px",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                  }}
                  type="text"
                  placeholder="Write a message..."
                />
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading || !message.trim()}
                style={{
                  borderRadius: "50%",
                  padding: "10px",
                  height: "40px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    isLoading || !message.trim() ? "#ccc" : "#007bff",
                  border: "none",
                  color: "#fff",
                  fontSize: "18px",
                  transition: "background-color 0.3s ease",
                  cursor:
                    isLoading || !message.trim() ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-regular fa-paper-plane"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
