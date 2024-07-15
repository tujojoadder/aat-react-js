import "./MessageAnyOne.css";
import { Scrollbars } from "react-custom-scrollbars";
import React, { useEffect, useState, useRef } from "react";
import SendMessage from "../SendMessages/SendMessage";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function MessageAnyOne() {
  const [commentsHeight, setCommentsHeight] = useState("80vh"); // Default height for medium devices
  const [isExtraSmall, setIsExtraSmall] = useState(window.innerWidth <= 576);
  const [isSmall, setIsSmall] = useState(
    window.innerWidth > 576 && window.innerWidth <= 788
  );
  const [isMedium, setIsMedium] = useState(
    window.innerWidth > 788 && window.innerWidth < 992
  );
  const [openMenuId, setOpenMenuId] = useState(null); // State to track which menu is open
  const menuRef = useRef(null); // Reference to track the menu container

  // Function to handle clicks outside the menu
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenMenuId(null); // Close the menu if clicked outside of it
    }
  };

  // Function to handle clicks on the options icon
  const handleOptionClick = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    // Update isSmall and isMedium states when window size changes
    const handleResize = () => {
      setIsExtraSmall(window.innerWidth <= 576);
      setIsSmall(window.innerWidth > 576 && window.innerWidth <= 788);
      setIsMedium(window.innerWidth > 788 && window.innerWidth < 992);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup: Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (

        <div className="friend-home main  mb-5" style={{ backgroundColor: "white",minHeight:'100vh' }}>
     

    <div
      className="chat   p-0 m-0 border-start border-end  "
      style={{
        
        height: "0vh",
        position: "fixed",
        width: isExtraSmall
          ? "100%"
          : isSmall
          ? "70%"
          : isMedium
          ? "65%"
          : "42%",
     
      }}
    >
      <div className="ms-card m-0 p-0  pt-4 pb-4">
       

        <Scrollbars
          style={{
            width: "100.5%",
            backgroundColor: "#e9ecef",
           
            backgroundColor: "#ffffff",
          }}
        >
          <div
            className="card-body msg_card_body p-2 pe-3  mb-5  mt-5 "
            style={{ height: "auto", overflow: "hidden" }}
          >
            {/* Messages */}
            <div className="d-flex justify-content-start mb-4 others">
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
            <div className="d-flex justify-content-end mb-4 my">
              <div className="msg_cotainer_send">
                Hi Khalid i am good tnx how about you Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Enim vel quaerat dolor voluptates
                dolore labore molestiae numquam. Laboriosam quaerat, esse nisi
                vel sapiente, sunt cum maiores praesentium ipsam sit
                repudiandae??
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
              <div className="img_cont_msg">
                <img
                  src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256"
                  className="rounded-circle user_img_msg"
                />
              </div>
            </div>

            <div className="d-flex justify-content-end mb-4 my">
              <div className="msg_cotainer_send">
                Ok, thank you have a good day
                <span className="msg_time_send">9:10 AM, Today</span>
                <i
                  className="fa fa-ellipsis-v msg-options-icon"
                  onClick={(e) => handleOptionClick(e, "options-3")}
                ></i>
                <div
                  className={`msg-options-menu ${
                    openMenuId === "options-3" ? "show" : ""
                  }`}
                  id="options-3"
                  ref={menuRef}
                >
                  <div>Remove</div>
                  <div>Copy</div>
                </div>
              </div>
              <div className="img_cont_msg">
                <img
                  src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256"
                  className="rounded-circle user_img_msg"
                />
              </div>
            </div>

            <div className="d-flex justify-content-start mb-4 others">
              <div className="img_cont_msg">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-circle user_img_msg"
                />
              </div>
              <div className="msg_cotainer">
                Hi, how are you samim? Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Cupiditate illum culpa repudiandae magnam,
                deserunt facere ducimus sequi quo voluptatum provident
                laboriosam ipsam assumenda aperiam expedita, officiis quam ipsa
                minima molestiae. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nobis eos, voluptatem, nostrum amet dolores
                natus voluptatum aperiam totam nemo debitis neque maiores
                incidunt ipsum autem explicabo! Recusandae alias voluptas
                assumenda.
                <span className="msg_time">8:40 AM, Today</span>
                <i
                  className="fa fa-ellipsis-v msg-options-icon"
                  onClick={(e) => handleOptionClick(e, "options-4")}
                ></i>
                <div
                  className={`msg-options-menu ${
                    openMenuId === "options-4" ? "show" : ""
                  }`}
                  id="options-4"
                  ref={menuRef}
                >
                  <div>Remove</div>
                  <div>Copy</div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start mb-4 others">
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
                  onClick={(e) => handleOptionClick(e, "options-5")}
                ></i>
                <div
                  className={`msg-options-menu ${
                    openMenuId === "options-5" ? "show" : ""
                  }`}
                  id="options-5"
                  ref={menuRef}
                >
                  <div>Remove</div>
                  <div>Copy</div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-start mb-4 others">
              <div className="img_cont_msg">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-circle user_img_msg"
                />
              </div>
              <div className="msg_cotainer">
                Hi, how are you samim? Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Cupiditate illum culpa repudiandae magnam,
                deserunt facere ducimus sequi quo voluptatum provident
                laboriosam ipsam assumenda aperiam expedita, officiis quam ipsa
                minima molestiae. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nobis eos, voluptatem, nostrum amet dolores
                natus voluptatum aperiam totam nemo debitis neque maiores
                incidunt ipsum autem explicabo! Recusandae alias voluptas
                assumenda.
                <span className="msg_time">8:40 AM, Today</span>
                <i
                  className="fa fa-ellipsis-v msg-options-icon"
                  onClick={(e) => handleOptionClick(e, "options-6")}
                ></i>
                <div
                  className={`msg-options-menu ${
                    openMenuId === "options-6" ? "show" : ""
                  }`}
                  id="options-6"
                  ref={menuRef}
                >
                  <div>Remove</div>
                  <div>Copy</div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-4 my">
              <div className="msg_cotainer_send">
                Ok, thank you have a good day
                <span className="msg_time_send">9:10 AM, Today</span>
                <i
                  className="fa fa-ellipsis-v msg-options-icon"
                  onClick={(e) => handleOptionClick(e, "options-3")}
                ></i>
                <div
                  className={`msg-options-menu ${
                    openMenuId === "options-3" ? "show" : ""
                  }`}
                  id="options-3"
                  ref={menuRef}
                >
                  <div>Remove</div>
                  <div>Copy</div>
                </div>
              </div>
              <div className="img_cont_msg">
                <img
                  src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256"
                  className="rounded-circle user_img_msg"
                />
              </div>
            </div>
          </div>
        </Scrollbars>
{/* Fotter */}
        <div
          className="card-footer p-0 m-0 "
          style={{
            position: "fixed",
            bottom: "0px",
            width: isExtraSmall
              ? "100%"
              : isSmall
              ? "70%"
              : isMedium
              ? "65%"
              : "42%",
          }}
        >
          <SendMessage />
        </div>

{/* Header */}

<div
          className="card-footer p-0 m-0 "
          style={{
            position: "fixed",
            top: "0px",
            width: isExtraSmall
              ? "100%"
              : isSmall
              ? "70%"
              : isMedium
              ? "65%"
              : "42%",
          }}
        >
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
            <div className="user-content-text-box ">
              <div className="user-names-text" style={{ marginTop: "2px" }}>
                <div className="name-column ">
                  <h1 className="full-name-text m-0 p-0">Mohammad </h1>
                  <p className="user-name-text m-0 p-0 ">@eric_alvareeric</p>
                </div>
              </div>
            </div>
          </div>

        </div>







      </div>
    </div>
    </div>
  );
}
