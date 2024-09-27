import React, { useEffect, useState, useRef } from "react";
import SendMessage from "../SendMessages/SendMessage";
import { Scrollbar } from "react-scrollbars-custom";
import "./MessageAnyOne.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setReceiverId } from "../../home/HomeSlice";

export default function MessageAnyOne() {
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

  return (
    <div className="message-container friend-home main p-0 m-0  border-left border-right">
      <div className="message-header">
        <div
          className="posts m-0 py-2 p-0 border-bottom  bg-light rounded"
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
          <div className="user-content-text-box  ">
            <div className="user-names-text" style={{ marginTop: "2px" }}>
              <div className="name-column ">
                <h1 className="full-name-text m-0 p-0">Mohammad </h1>
                <p className="user-name-text m-0 p-0 ">@eric_alvareeric</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="message-body">
        <Scrollbar>
          <div className="msg_card_body">

            {/* Current user Messages */}
            <div className="current-user-message">
              <div className="d-flex justify-content-end mb-4 my">
                <div className="msg_cotainer_send">
                  Hi Khalid i am good tnx how about you Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Enim vel quaerat dolor
                  voluptates dolore labore molestiae numquam. Laboriosam
                  quaerat, esse nisi vel sapiente, sunt cum maiores praesentium
                  ipsam sit repudiandae??
                  <span className="msg_time_send">8:55 AM, Today</span>
                  <i
                    className="fa fa-ellipsis-v msg-options-icon"
                    onClick={(e) => handleOptionClick(e, "options-2")}
                  ></i>
                  <div
                    className={`msg-options-menu ${
                      openMenuId === "options-2" ? "show" : ""
                    }`}
                    id="options-2"
                    ref={menuRef}
                  >
                    <div>Remove</div>
                    <div>Copy</div>
                  </div>
                </div>
               
              </div>
            </div>

                {/* Distance user Messages */}

            <div className="distance-user-message">
              <div className="d-flex justify-content-start mb-4 others ">
                <div className="img_cont_msg">
                  <img
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    className="rounded-circle user_img_msg"
                  />
                </div>
                <div className="msg_cotainer">
                  Hi, how are you samim?
                  <span className="msg_time">8:40 AM, Today</span>
                  <i
                    className="fa fa-ellipsis-v msg-options-icon"
                    onClick={(e) => handleOptionClick(e, "options-1")}
                  ></i>
                  <div
                    className={`msg-options-menu ${
                      openMenuId === "options-1" ? "show" : ""
                    }`}
                    id="options-1"
                    ref={menuRef}
                  >
                    <div>Remove</div>
                    <div>Copy</div>
                  </div>
                </div>
              </div>
            </div>

            

            {/* More messages here... */}
          </div>
        </Scrollbar>
      </div>

      <div className="message-footer">
        <SendMessage />
      </div>
    </div>
  );
}
