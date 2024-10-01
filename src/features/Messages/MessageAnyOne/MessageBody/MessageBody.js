import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';
import { useLoadChatQuery, useSendMessageMutation, useDeleteMessageMutation } from '../../../../services/chatsApi'; // Import the delete mutation
import { formatPostDate } from '../../../../utils/dateUtils';
import echo from '../../../../echo';

export default function MessageBody({ userId }) {
  const userProfile = useSelector((state) => state.home.profile_picture);
  const authId = useSelector((state) => state.home.user_id);
  const receiverID = useSelector((state) => state.home.receiver_id);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);
  const [deleteMessage] = useDeleteMessageMutation(); // Initialize delete mutation

  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isLoading: useGetAuthUserfriendRequestQueryLoading,
    isError: useGetAuthUserfriendRequestQueryError,
    isFetching: useGetAuthUserfriendRequestQueryFetching,
    refetch
  } = useLoadChatQuery({ page: friendRequestPage, receiver_id: userId });
  const [sendMessage, { isLoading: isLoadingMessage }] =
  useSendMessageMutation();
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    setMessages([]);
    setFriendRequestPage(1);
    setHasMoreFriendRequest(true);
  }, [userId, receiverID]);

  const loadOlderMessages = () => {
    if (
      !useGetAuthUserfriendRequestQueryFetching &&
      !useGetAuthUserfriendRequestQueryError &&
      hasMoreFriendRequest &&
      useGetAuthUserfriendRequestQuerySuccess
    ) {
      setFriendRequestPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (
      useGetAuthUserfriendRequestQuerySuccess &&
      useGetAuthUserfriendRequestQueryData?.chat?.data
    ) {
      if (useGetAuthUserfriendRequestQueryData.chat.data.length < 3) {
        setHasMoreFriendRequest(false);
      }
      const newMessages = useGetAuthUserfriendRequestQueryData.chat.data
        .filter(
          (newMessage) =>
            !messages.some((message) => message.id === newMessage.id)
        )
        .reverse();
      if (newMessages.length > 0) {
        setMessages((prevMessages) => [...newMessages, ...prevMessages]);
      }
    }
  }, [
    useGetAuthUserfriendRequestQuerySuccess,
    useGetAuthUserfriendRequestQueryData,
  ]);

  const handleOptionClick = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenMenuId(null);
    }
  };

  useEffect(() => {
    if (messageEndRef.current && friendRequestPage === 1) {
      messageEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);




 /*  Send Message */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await sendMessage({
        receiver_id: receiverID,
        message,
      }).unwrap();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: res.data.id,
          message: res.data.message,
          created_at: res?.data?.created_at,
          sender_id: res.data.sender_id,
          receiver_id: res.data.receiver_id,
        },
      ]);

      setMessage('');
      refetch();
    } catch (error)
    {
      console.error("Error sending message:", error);
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
        userId == e.chat.data.sender_id
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

refetch();

      }
    });


    echo.private("message-deleted").listen("MessageDeleteEvent", (e) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== e.id));
      refetch();

      
    });



    return () => {
      echo.leave("broadcast-message");
      echo.leave("message-deleted");
    };
  }, []);









  // Handle the removal of a message
  const handleRemoveMessage = async (messageId) => {
    try {
      // Call the delete mutation
      await deleteMessage(messageId).unwrap();
      
      // Remove the deleted message from the UI
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
      refetch();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };


  return (
    <>
    <div className="message-body" style={{ overflowX: 'hidden' }}>
      <Scrollbar>
        <div id="msg_card_body" style={{ overflowX: 'hidden' }}>
          {/* Button to load older messages */}
          {hasMoreFriendRequest &&
            useGetAuthUserfriendRequestQuerySuccess &&
            messages.length > 0 && (
              <div className="text-center mb-3">
                <button
                  onClick={loadOlderMessages}
                  className="btn btn-primary"
                  disabled={useGetAuthUserfriendRequestQueryFetching}
                >
                  {useGetAuthUserfriendRequestQueryFetching ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </>
                  ) : (
                    'Load Older Messages'
                  )}
                </button>
              </div>
            )}

          <div className="py-2"></div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                authId === msg.sender_id
                  ? 'current-user-message pe-3'
                  : 'distance-user-message ps-3'
              }
            >
              <div
                className={`d-flex justify-content-${
                  msg.sender_id === authId ? 'end' : 'start'
                } mb-4 my`}
              >
                {authId === msg.receiver_id && userId === msg.sender_id && (
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
                    authId === msg.sender_id ? 'msg_cotainer_send' : 'msg_cotainer'
                  }
                >
                  {msg.message}
                  <span
                    className={
                      authId === msg.sender_id ? 'msg_time_send' : 'msg_time'
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
                      openMenuId === msg.id ? 'show' : ''
                    }`}
                    id="options-2"
                    ref={menuRef}
                  >
                    <div onClick={() => handleRemoveMessage(msg.id)}>remove</div>
                    <div>copy</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div ref={messageEndRef} />
        </div>
      </Scrollbar>
    </div>
    
{/* Fotter */}
    
    <div className="message-footer  ">
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
                disabled={isLoadingMessage || !message.trim()}
                style={{
                  borderRadius: "50%",
                  padding: "10px",
                  height: "40px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    isLoadingMessage || !message.trim() ? "#ccc" : "#007bff",
                  border: "none",
                  color: "#fff",
                  fontSize: "18px",
                  transition: "background-color 0.3s ease",
                  cursor:
                    isLoadingMessage || !message.trim()
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isLoadingMessage ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-regular fa-paper-plane"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
    
  );
  
}
