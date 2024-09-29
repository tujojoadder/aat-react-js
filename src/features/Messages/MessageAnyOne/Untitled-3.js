{
  /* Current user Messages */
}
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
</div>;

{
  /* Distance user Messages */
}
