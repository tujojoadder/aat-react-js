
import './MessageAnyOne.css';
import { Scrollbars } from "react-custom-scrollbars";
import React, { useEffect, useState } from "react";
import SendMessage from '../SendMessages/SendMessage';

export default function MessageAnyOne() {
    const [commentsHeight, setCommentsHeight] = useState("80vh"); // Default height for medium devices
    const [isSmallOrMedium, setIsSmallOrMedium] = useState(
      window.innerWidth < 992
    ); // Default check for small or medium devices
  
    // Function to update the height based on window width
    const updateDimensions = () => {
      if (window.innerWidth < 576) {
        setCommentsHeight("73vh"); // Small devices (sm) like mobile phones
      } else {
        setCommentsHeight("81vh"); // Medium devices (md) like tablets and desktops
      }
  
      setIsSmallOrMedium(window.innerWidth < 992); // Check if the device is small or medium
    };
  
    // Effect to update dimensions when component mounts and on window resize
    useEffect(() => {
      updateDimensions(); // Initial height and width update
  
      // Event listener for window resize
      window.addEventListener("resize", updateDimensions);
  
      // Cleanup function to remove event listener
      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }, []); // Empty dependency array ensures effect runs only on mount and unmount
  
    
  
    const [isLargeDevice, setIsLargeDevice] = useState(false); // State to check if the device is large
  
    useEffect(() => {
      // Check if the window width is larger than 992px when the component mounts
      const initialCheck = window.innerWidth >= 992;
      setIsLargeDevice(initialCheck);
    }, []); // Empty dependency array ensures this runs only on mount
  
  return (
<div
      className="chat main p-0 m-0 border-start border-end"
      style={{ height: "100vh" }}
    >
      <div className="ms-card m-0 p-0 ">
        <div className="card-header msg_head" style={{  }}>
          <div
            className="posts m-0 pt-2 p-0 border-bottom"
            style={{ height: "10vh", borderRadius: "0px",backgroundColor:'#ffff',border:'none' ,minHeight:'60px'}}
          >
            <i class="fa-solid fa-arrow-left text-dark fs-4 p-3 pe-1 "></i>
            <div className="user-pics pt-1">
              <img
                src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                className="rounded-circle user_img_msg"
                alt="user3"
              />
            </div>
            <div className="user-content-text-box pt-2">
              <div className="user-names-text" style={{ marginTop: "2px" }}>
                <div className="name-column ">
                  <h1 className="full-name-text m-0 p-0">Mohammad </h1>
                  <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Scrollbars
          style={{
            width: "100%",
            height: commentsHeight,
            backgroundColor: "#e9ecef",
            marginBottom:'-1vh'
          }}
        >
          
          <div className="card-body msg_card_body p-3" style={{ height: "auto" }}>
            {/* Messages */}
            <div className="d-flex justify-content-start mb-4">
              <div className="img_cont_msg">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-circle user_img_msg"
                />
              </div>
              <div className="msg_cotainer">
                Hi, how are you samim?
                <span className="msg_time">8:40 AM, Today</span>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-4">
              <div className="msg_cotainer_send">
                Hi Khalid i am good tnx how about you Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Enim vel quaerat dolor voluptates
                dolore labore molestiae numquam. Laboriosam quaerat, esse nisi
                vel sapiente, sunt cum maiores praesentium ipsam sit
                repudiandae??
                <span className="msg_time_send">8:55 AM, Today</span>
              </div>
              <div className="img_cont_msg">
                <img
                  src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256"
                  className="rounded-circle user_img_msg"
                />
              </div>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <div className="img_cont_msg">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-circle user_img_msg"
                />
              </div>
              <div className="msg_cotainer">
                I am good too, thank you for your chat template
                <span className="msg_time">9:00 AM, Today</span>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-4">
              <div className="msg_cotainer_send">
                You are welcome
                <span className="msg_time_send">9:05 AM, Today</span>
              </div>
              <div className="img_cont_msg">
                <img
                  src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256"
                  className="rounded-circle user_img_msg"
                />
              </div>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <div className="img_cont_msg">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-circle user_img_msg"
                />
              </div>
              <div className="msg_cotainer">
                I am looking for your next templates
                <span className="msg_time">9:07 AM, Today</span>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-4">
              <div className="msg_cotainer_send">
                Ok, thank you have a good day
                <span className="msg_time_send">9:10 AM, Today</span>
              </div>
              <div className="img_cont_msg">
                <img
                  src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256"
                  className="rounded-circle user_img_msg"
                />
              </div>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <div className="img_cont_msg">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-circle user_img_msg"
                />
              </div>
              <div className="msg_cotainer">
                Bye, see you
                <span className="msg_time">9:12 AM, Today</span>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-4">
              <div className="msg_cotainer_send">
                Ok, thank you have a good day
                <span className="msg_time_send">9:10 AM, Today</span>
              </div>
              <div className="img_cont_msg">
                <img
                  src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256"
                  className="rounded-circle user_img_msg"
                />
              </div>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <div className="img_cont_msg">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-circle user_img_msg"
                />
              </div>
              <div className="msg_cotainer">
                Bye, see you
                <span className="msg_time">9:12 AM, Today</span>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-4">
              <div className="msg_cotainer_send">
                Ok, thank you have a good day
                <span className="msg_time_send">9:10 AM, Today</span>
              </div>
              <div className="img_cont_msg">
                <img
                  src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256"
                  className="rounded-circle user_img_msg"
                />
              </div>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <div className="img_cont_msg">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-circle user_img_msg"
                />
              </div>
              <div className="msg_cotainer">
                Bye, see you
                <span className="msg_time">9:12 AM, Today</span>
              </div>
            </div>
          </div>
        </Scrollbars>

        <div className="card-footer p-0 m-0">
        <SendMessage/>
        </div>
      </div>
    </div>
  )
}
