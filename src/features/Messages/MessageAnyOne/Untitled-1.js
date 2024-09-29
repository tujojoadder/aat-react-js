{/* Current user Messages */}
            <div className="current-user-message">
              <div className="d-flex justify-content-end mb-4 my">
                <div className="msg_cotainer_send">
                  Hi Khalid
                  
                  
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
