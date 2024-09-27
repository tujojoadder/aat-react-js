import React, { useEffect, useState, useRef } from "react";
import SendMessage from "../SendMessages/SendMessage";
import { Scrollbar } from "react-scrollbars-custom";
import "./MessageAnyOne.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReceiverId } from "../../home/HomeSlice";
import { useSendMessageMutation } from "../../../services/chatsApi";

export default function MessageAnyOne() {
  const receiverID = useSelector((state) => state.home.receiver_id); // Access receiver_id from Redux
  const userProfile = useSelector((state) => state.home.profile_picture); // Access user profile picture from Redux
  const [message, setMessage] = useState(""); // State to store the current message input
  const [messages, setMessages] = useState([]); // State to store the list of messages
  const [sendMessage, { isLoading }] = useSendMessageMutation(); // RTK query mutation hook

  const dispatch = useDispatch();
  const { id } = useParams();

  if (id) {
    dispatch(setReceiverId(id)); // Dispatch action only if id is not null or undefined
  }

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
    e.preventDefault(); // Prevent default form submission
    if (!message.trim()) return; // Prevent sending empty messages

    setMessage(""); // Clear the input field after sending the message

    try {
      // Send the message to the backend and capture the response
      const res = await sendMessage({
        receiver_id: receiverID,
        message,
      }).unwrap();



      // Update the messages array by appending the new message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message_id: res.data.id, // Unique ID for each message
          text: res.data.message,
          time: "8:55 AM, Today", // Placeholder for the time, you can replace this with actual time
        },
      ]);
    } catch (error) {
      console.error("Error:", error); // Log any error
    }
  };

  return (
    <div className="message-container friend-home main p-0 m-0 border-left border-right">
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

      <div className="message-body pt-3">
        <Scrollbar>
          <div id="msg_card_body">
            {messages.map((msg) => (
                 <div className="current-user-message mr-3">
                 <div className="d-flex justify-content-end mb-4 my">
                   <div className="msg_cotainer_send">
         {msg.text}
                     <span className="msg_time_send">8:55 AM, Today</span>
                     <i
                       className="fa fa-ellipsis-v msg-options-icon "
                       onClick={(e) => handleOptionClick(e,msg.message_id)}
                     ></i>
                     <div
                       className={`msg-options-menu ${
                         openMenuId === msg.message_id ? "show" : ""
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
                  onChange={(e) => setMessage(e.target.value)} // Capture input value
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
                disabled={isLoading || !message.trim()} // Disable button when loading or message is empty
                style={{
                  borderRadius: "50%",
                  padding: "10px",
                  height: "40px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    isLoading || !message.trim() ? "#ccc" : "#007bff", // Change button color when disabled
                  border: "none",
                  color: "#fff",
                  fontSize: "18px",
                  transition: "background-color 0.3s ease",
                  cursor:
                    isLoading || !message.trim() ? "not-allowed" : "pointer", // Show not-allowed cursor when disabled
                }}
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i> // Spinner icon during loading
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
