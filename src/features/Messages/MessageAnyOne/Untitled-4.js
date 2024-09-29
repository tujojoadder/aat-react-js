<div className="distance-user-message">
  {" "}
  ---
  <div className="d-flex justify-content-start/justify-content-end mb-4 others/my ">
    <div className="img_cont_msg">
      <img
        src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
        className="rounded-circle user_img_msg"
      />
    </div>
    <div className="msg_cotainer/msg_cotainer_send">
      Hi, how are you samim?
      <span className="msg_time/msg_time_send">8:40 AM, Today</span>
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
</div>;
