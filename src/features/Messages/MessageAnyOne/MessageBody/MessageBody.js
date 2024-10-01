import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';
import { useLoadChatQuery } from '../../../../services/chatsApi';
import { formatPostDate } from '../../../../utils/dateUtils';

export default function MessageBody({ userId }) {
  const authId = useSelector((state) => state.home.user_id);
  const receiverID = useSelector((state) => state.home.receiver_id);
  const [messages, setMessages] = useState([]);
  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);

  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isLoading: useGetAuthUserfriendRequestQueryLoading,
    isError: useGetAuthUserfriendRequestQueryError,
    isFetching: useGetAuthUserfriendRequestQueryFetching,
    refetch: useGetAuthUserfriendRequestQueryRefetch,
  } = useLoadChatQuery({ page: friendRequestPage, receiver_id: userId });

  // Reset messages and page when receiverID or userId changes
  useEffect(() => {
    setMessages([]);
    setFriendRequestPage(1);
    setHasMoreFriendRequest(true);
  }, [userId, receiverID]);

  // Fetch older messages when the "Load Older Messages" button is clicked
  const loadOlderMessages = () => {
    if (
      !useGetAuthUserfriendRequestQueryFetching &&
      !useGetAuthUserfriendRequestQueryError &&
      hasMoreFriendRequest &&
      useGetAuthUserfriendRequestQuerySuccess
    ) {
      console.log('Fetching previous messages...');
      setFriendRequestPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (
      useGetAuthUserfriendRequestQuerySuccess &&
      useGetAuthUserfriendRequestQueryData?.chat?.data
    ) {
      if (useGetAuthUserfriendRequestQueryData.chat.data.length < 3) {
        setHasMoreFriendRequest(false); // No more older messages to load
      }
      const newMessages = useGetAuthUserfriendRequestQueryData.chat.data.filter(
        (newMessage) =>
          !messages.some((message) => message.id === newMessage.id)
      );
      if (newMessages.length > 0) {
        setMessages((prevMessages) => [...newMessages, ...prevMessages]); // Prepend older messages
      }
    }
  }, [
    useGetAuthUserfriendRequestQuerySuccess,
    useGetAuthUserfriendRequestQueryData,
  ]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const messageEndRef = useRef(null); // Create a ref for the last message

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

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (messageEndRef.current && friendRequestPage == 1) {
      messageEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  return (
    <div className="message-body" style={{ overflowX: 'hidden' }}>
      <Scrollbar>
        <div id="msg_card_body" style={{ overflowX: 'hidden' }}>
          {/* Button to load older messages */}
          {hasMoreFriendRequest && useGetAuthUserfriendRequestQuerySuccess && (
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
              key={msg.id} // Ensure each message has a unique key
              className={
                authId === msg.sender_id
                  ? 'current-user-message pe-3'
                  : 'distance-user-message ps-3'
              } // Conditional class name
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
                    authId === msg.sender_id
                      ? 'msg_cotainer_send'
                      : 'msg_cotainer'
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
                    <div>remove</div>
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
  );
}
