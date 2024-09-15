import React from "react";
import {
  NavLink,
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Scrollbars } from "react-custom-scrollbars";
import Homeleft from "../home/Homeleft";
import "./Navbar.css";
import Home from "../home/Home";
import Friends from "../Friends/Friends";
import FriendRight from "../Friends/FriendRight";
import FriendHome from "../Friends/FriendHome/FriendHome";
import FriendRightFriendRequest from "../Friends/FriendRightFriendRequest";
import FriendRightFriendSuggestions from "../Friends/FriendRightFriendSuggestions";
import FriendRightSentRequests from "../Friends/FriendRightSentRequests";
import FriendRightAllFriends from "../Friends/FriendRightAllFriends";
import Profile from "../Profile/Profile";
import NoUserSelected from "../Friends/NoUserSelected";
import GroupsHome from "../Groups/GroupsHome";
import GroupsHomeRight from "../Groups/GroupsHomeRight";
import GroupSuggestion from "../Groups/GroupSuggestion";
import GroupProfile from "../Groups/GroupProfile/GroupProfile";
import GroupProfileRight from "../Groups/GroupProfile/GroupProfileRight";
import CreateGroup from "../Groups/CreateGroup/CreateGroup";
import CreateGroupRight from "../Groups/CreateGroup/CreateGroupRight";
import GroupManage from "../Groups/GroupManage/GroupManage";
import NoUserSelectedSuggestion from "../Friends/NoUserSelectedSuggestion";
import NoUserSelectedSentRequest from "../Friends/NoUserSelectedSentRequest";
import NoUserSelectedAllFriends from "../Friends/NoUserSelectedAllFriends";
import PageHome from "../Page/PageHome";
import PageProfile from "../Page/PageProfile/PageProfile";
import PageManage from "../Page/PageManage/PageManage";
import PageHomeRight from "../Page/PageHomeRight";
import PageLiked from "../Page/PageLiked/PageLiked";
import CreatePage from "../Page/CreatePage/CreatePage";
import UpdatePage from "../Page/UpdatePage/UpdatePage";
import PageProfileRight from "../Page/PageProfileRight/PageProfileRight";
import MessageHome from "../Messages/MessageHome";
import MessageHomeRight from "../Messages/MessageHomeRight";
import NoUserSelectedToMessage from "../Messages/NoUserSelectedToMessage/NoUserSelectedToMessage";
import MessageAnyOne from "../Messages/MessageAnyOne/MessageAnyOne";
import QuizHome from "../Quiz/QuizHome";
import IChannelHome from "../IChannels/IChannelHome";
import IChannelHomeRight from "../IChannels/IChannelHomeRight";
import IChannelFollowing from "../IChannels/IChannelFollowing/IChannelFollowing";
import YourPage from "../Page/YourPage/YourPage";
import YourIChannels from "../IChannels/YourIChannels/YourIChannels";
import IChannelProfile from "../IChannels/IChannelProfile/IChannelProfile";
import CreateIChannel from "../IChannels/CreateIChannel/CreateIChannel";
import IChannelsManage from "../IChannels/IChannelsManage/IChannelsManage";
import ProfileManage from "../Profile/ProfileManage/ProfileManage";
import MobileMenu from "../MobileMenu/MobileMenu";
import MyPages from "../Page/MyPages/MyPages";
import UserDetails from "./UserDetails/UserDetails";
import HadithBox from "../home/Components/Hadithbox/HadithBox";
import MyProfile from "../Profile/MyProfile/MyProfile";
import SetProfile from "../Profile/SetProfile/SetProfile";
import SetCoverPhoto from "../Profile/SetCoverPhoto/SetCoverPhoto";
import GroupManageright from "../Groups/GroupManage/GroupManageright";
import GroupsMyGroups from "../Groups/GroupsMyGroups";
import GroupsJoinedGroups from "../Groups/GroupsJoinedGroups";
import PageManageRight from "../Page/PageManageRight/PageManageRight";

const Navbar = () => {
  const isNotSm = useMediaQuery({ minWidth: 576 }); // Bootstrap's sm breakpoint is 576px
  /*  for mt of left side bar */
  const isBig = useMediaQuery({ minHeight: 1650 }); // Bootstrap's sm breakpoint is 576px

  const location = useLocation();
  //for xs NAV BAR
  const isHome = location.pathname === "/";
  const isIchannel = location.pathname === "/ichannel";
  const isQuiz = location.pathname === "/quiz";
  const isNotification = location.pathname === "/notification";
  const isMessage = location.pathname === "/message";

  /* Hide Nav without head */
  const pathsToHideNav = ["/message/", "/ichannel/", "/some-other-path/"];
  const isInPathsToHideNav = pathsToHideNav.some((path) =>
    location.pathname.startsWith(path)
  );

  /* Hide Nav with head */
  const pathsToHideNavHead = ["/friends", "/menu", "/groups", "/page"];

  const isInPathsToHideNavHead = pathsToHideNavHead.some((path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100.5vh",
        minHeight: "300px",
        overflowX: "hidden",
      }}
    >
      <div className={isNotSm ? "container-sm  " : "ps-2 pe-2"}>
        {/* xs NAV BAR */}
        {!isInPathsToHideNav && !isInPathsToHideNavHead && (
          <nav
            className={`bg-light xs-nav fixed-bottom d-sm-none border-bottom`}
            style={{ minWidth: "270px" }}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col text-center">
                  <NavLink to="/">
                    <i
                      className="fa-solid fa-house fs-2 py-3"
                      style={{ color: isHome ? "#2f00ff" : "#B7BAC0" }}
                    ></i>
                  </NavLink>
                </div>
                <div className="col text-center">
                  <NavLink to="/ichannel" className="custom-link">
                    <i
                      style={{ color: isIchannel ? "#2f00ff" : "#B7BAC0" }}
                      className="fa-solid fa-mosque fs-2 py-3"
                    ></i>
                  </NavLink>
                </div>
                <div className="col text-center">
                  <NavLink to="/quiz" className="custom-link d-block">
                    <div
                      style={{
                        borderRadius: "50%",
                        padding: "10px",
                        marginTop: "0.5vh",
                        display: "inline-block",
                        backgroundColor: isQuiz ? "#2f00ff" : "#B7BAC0",
                      }}
                    >
                      <i
                        className="fa-solid fa-book-open-reader fs-1 "
                        style={{ color: "white", display: "block" }}
                      ></i>
                    </div>
                  </NavLink>
                </div>
                <div className="col text-center">
                  <NavLink to="/page" className="custom-link">
                    <i
                      className="fa-solid fa-bell fs-2 py-3"
                      style={{ color: isNotification ? "#2f00ff" : "#B7BAC0" }}
                    ></i>
                  </NavLink>
                </div>
                <div className="col text-center">
                  <NavLink to="/message" className="custom-link">
                    <i
                      style={{ color: isMessage ? "#2f00ff" : "#B7BAC0" }}
                      className="fa-solid fa-envelope fs-2 py-3"
                    ></i>
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>
        )}

        <div className="row">
          {/* LEFT SIDE BAR */}
          <div
            style={{ backgroundColor: "#fdfdfd", height: "100vh" }}
            className="p-0 d-none col-sm-2 d-sm-block col-md-2 col-lg-3 d-flex flex-column text-sm-end text-md-start align-items-lg-start left_sidebar"
          >
            <div
              className="pe-2  bg-body rounded "
              style={{
                width: "97%",
                height: "100vh",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {}{" "}
              <div
                className="mb-3   d-flex align-items-center justify-content-center mydiv "
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  margin: "auto",
                  marginTop: "6vh",
                  paddingBottom: "4vh",
                  backgroundColor: "white",
                }}
              >
                <span>
                  <i
                    className="fa-brands fa-paypal "
                    style={{
                      color: "#5f9ffc",
                      backgroundColor: "white",
                      fontSize: "3rem",
                    }}
                  ></i>
                </span>
              </div>
              <NavLink to="/" className="custom-link">
                <div className="d-flex align-items-center py-1 pl-5 my-2 custom-link mydiv">
                  <span>
                    <i className="fa-solid fa-house fs-3"></i>
                  </span>
                  <p className="d-none d-lg-block fs-4 ps-2 text">Home</p>
                </div>
              </NavLink>
              <NavLink to="/friends" className="custom-link">
                <div className="d-flex align-items-center py-1 my-2 pl-5 custom-link mydiv">
                  <span>
                    <i className="fas fa-user-friends fs-2"></i>
                  </span>
                  <p className="d-none d-lg-block fs-4 ps-2 text">Friends</p>
                </div>
              </NavLink>
              <NavLink to="/groups" className="custom-link">
                <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
                  <span>
                    <i className="fa-solid fa-users fs-2"></i>
                  </span>
                  <p className="d-none d-lg-block fs-4 ps-2 text">Groups</p>
                </div>
              </NavLink>
              <NavLink to="/page" className="custom-link">
                <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
                  <span>
                    <i className="fa-solid fa-flag fs-2"></i>
                  </span>
                  <p className="d-none d-lg-block fs-4 ps-2 text">Pages</p>
                </div>
              </NavLink>
              <NavLink to="/message" className="custom-link">
                <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
                  <span>
                    <i className="fa-solid fa-envelope fs-2"></i>
                  </span>
                  <p className="d-none d-lg-block fs-4 ps-2 text">Messages</p>
                </div>
              </NavLink>
              <NavLink to="/quiz" className="custom-link">
                <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
                  <span>
                    <i className="fa-solid fa-book-open-reader fs-2"></i>
                  </span>
                  <p className="d-none d-lg-block fs-4 ps-2 text">Quiz</p>
                </div>
              </NavLink>
              <NavLink to="/ichannel" className="custom-link">
                <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
                  <span>
                    <i className="fa-solid fa-mosque fs-2"></i>
                  </span>
                  <p className="d-none d-lg-block fs-4 ps-2 text">iChanel</p>
                </div>
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive && window.location.pathname === "/profile"
                    ? "custom-link active"
                    : "custom-link"
                }
              >
                <div className="d-flex align-items-center my-2 mb-3 py-1 pl-5 mydiv">
                  <span>
                    <i className="fa-solid fa-user fs-2"></i>
                  </span>
                  <p className="d-none d-lg-block fs-4 ps-2 text">Profile</p>
                </div>
              </NavLink>
              <button
                className="d-flex align-items-center pt-1 pl-5 my-2 custom-link mydiv"
                style={{
                  background: "none",
                  padding: "0",
                  margin: "0",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  marginLeft: "15px",
                  border: "solid 2px black",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  borderRadius: "30px",
                }}
                onClick={() => {
                  const optionsDiv = document.getElementById("moreOptions");
                  optionsDiv.style.display =
                    optionsDiv.style.display === "none" ? "block" : "none";
                }}
              >
                <i
                  style={{ color: "#333a42" }}
                  className="fa-solid fa-ellipsis-vertical fs-4 ms-1"
                ></i>
                <span
                  className="d-none d-lg-inline"
                  style={{
                    fontSize: "22px",
                    color: "#333a42",
                    paddingLeft: "7px",
                    paddingBottom: "4px",
                  }}
                >
                  More
                </span>
              </button>
              <div
                id="moreOptions"
                style={{
                  display: "none",
                  marginLeft: "15px",
                  marginTop: "10px",
                }}
              >
                <NavLink to="/terms" className="custom-link">
                  <div className="d-flex align-items-center py-1 pl-5 my-2 custom-link mydiv">
                    <span>
                      <i className="fa-solid fa-file-alt fs-2"></i>
                    </span>
                    <p className="d-none d-lg-block fs-4 ps-2 text">Terms</p>
                  </div>
                </NavLink>
                <NavLink to="/police" className="custom-link">
                  <div className="d-flex align-items-center py-1 pl-5 my-2 custom-link mydiv">
                    <span>
                      <i className="fa-solid fa-shield-alt fs-2"></i>
                    </span>
                    <p className="d-none d-lg-block fs-4 ps-2 text">Police</p>
                  </div>
                </NavLink>
              </div>
              {/* Account details */}
              <UserDetails />
            </div>
          </div>

          {/* Mid section */}
          <div className="col-12 col-sm-10 col-md-9 col-lg-6 main_bar ">
            <div className="row  d-flex justify-content-between align-items-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/friends" element={<FriendHome />} />

                {/*  <<---Friends-->> */}
                <Route path="/friends/requests/" element={<NoUserSelected />} />
                <Route
                  path="/friends/suggestions/"
                  element={<NoUserSelectedSuggestion />}
                />

                <Route
                  path="/friends/sent-requests/"
                  element={<NoUserSelectedSentRequest />}
                />
                <Route
                  path="/friends/all-friends/"
                  element={<NoUserSelectedAllFriends />}
                />

                <Route path="/friends/requests/:id" element={<Profile />} />
                <Route path="/friends/suggestions/:id" element={<Profile />} />
                <Route
                  path="/friends/sent-requests/:id"
                  element={<Profile />}
                />
                <Route path="/friends/all-friends/:id" element={<Profile />} />
                {/*Profile */}

                {/* view own profile */}
                <Route path="profile" exact element={<MyProfile />} />

                {/* view others profile */}
                <Route path="profile/:id" exact element={<Profile />} />

                {/* Profile --->manage */}
                <Route
                  path="profile/manage"
                  exact
                  element={<ProfileManage />}
                />

                {/* Set Profile  */}
                <Route
                  path="profile/manage/setprofile"
                  exact
                  element={<SetProfile />}
                />

          {/*<<--- Cover Photo ---> */}

          {/* Set Profile from database */}
          <Route path="profile/manage/setcoverphoto" exact element={<SetCoverPhoto />} />



                {/* Grouos */}
                <Route path="/groups" element={<GroupsHome />} />
                {/*  <<---Grouos-->>suggestions */}
                <Route
                  path="groups/suggestions"
                  exact
                  element={<GroupSuggestion />}
                />
                {/*  <<---Grouos-->>profile */}
                <Route path="/groups/:id" element={<GroupProfile />} />
                <Route path="/groups/mygroup/:id" element={<GroupProfile />} />
                {/*  <<---Groups-->>create */}
                <Route path="groups/create" exact element={<CreateGroup />} />
        
            {/*  <<---Groups-->>my group */}
            <Route
                  path="groups/mygroup"
                  exact
                  element={<GroupsMyGroups />}
                />

                  {/*  <<---Groups-->>joined group */}
               <Route
                  path="groups/joingroup"
                  exact
                  element={<GroupsJoinedGroups />}
                />

                {/*  <<---Groups-->>manage group */}
                <Route
                  path="groups/:id/manage"
                  exact
                  element={<GroupManage />}
                />

                {/* <<---Page-->> */}
                <Route path="/page" element={<PageHome />} />
                {/*  Page---> profile */}
                <Route path="page/:id" exact element={<PageProfile />} />
                <Route path="page/mypage/:id" exact element={<PageProfile />} />

                {/*  Page---> manage */}
                <Route path="page/:id/manage" exact element={<PageManage />} />
                {/*  Page---> Liked */}
                <Route path="page/liked" exact element={<PageLiked />} />
                {/*  Page---> create page */}
                <Route path="page/create" exact element={<CreatePage />} />
                {/*  Page---> Update page */}
                <Route path="page/update" exact element={<UpdatePage />} />
                {/*  Page---> Created */}
                <Route path="page/created" exact element={<YourPage />} />

                {/*    Messages */}
                <Route path="message" exact element={<MessageHome />} />
                {/*  Meaage---> to anyone */}
                <Route path="message/:id" exact element={<MessageAnyOne />} />

                {/* Quiz */}
                <Route path="quiz" exact element={<QuizHome />} />
                {/* iChannel */}
                <Route path="ichannel" exact element={<IChannelHome />} />
                {/*  iChannel---> following */}
                <Route
                  path="ichannel/following"
                  exact
                  element={<IChannelFollowing />}
                />
                {/*  iChannel---> following */}
                <Route
                  path="ichannel/following"
                  exact
                  element={<IChannelFollowing />}
                />
                {/*  iChannel---> created */}
                <Route
                  path="ichannel/created"
                  exact
                  element={<YourIChannels />}
                />
                {/*  iChannel---> profile */}
                <Route
                  path="ichannel/:id"
                  exact
                  element={<IChannelProfile />}
                />

                {/*  iChannel---> Create */}
                <Route
                  path="ichannel/create"
                  exact
                  element={<CreateIChannel />}
                />
                {/*  iChannel---> manage */}
                <Route
                  path="ichannel/:id/manage"
                  exact
                  element={<IChannelsManage />}
                />
                {/* Mobile Menu */}
                <Route path="menu" exact element={<MobileMenu />} />
              </Routes>
            </div>
          </div>

          {/* RIGHT SIDE BAR */}
          <div className=" col-lg-3 d-none d-lg-block w-25 h-25 right_side_bar">
            <Routes>
              <Route path="/" element={<Homeleft />} />
              {/* Friends--->friends */}
              <Route path="/friends" element={<FriendRight />} />
              {/* Friends--->requests */}
              <Route
                path="/friends/requests"
                element={<FriendRightFriendRequest />}
              />
              <Route
                path="/friends/requests/:id"
                element={<FriendRightFriendRequest />}
              />
              {/* Friends--->suggestions */}
              <Route
                path="/friends/suggestions"
                element={<FriendRightFriendSuggestions />}
              />
              <Route
                path="/friends/suggestions/:id"
                element={<FriendRightFriendSuggestions />}
              />
              {/* Friends--->sent-requests */}
              <Route
                path="/friends/sent-requests"
                element={<FriendRightSentRequests />}
              />
              <Route
                path="/friends/sent-requests/:id"
                element={<FriendRightSentRequests />}
              />
              {/* Friends--->all-friends */}
              <Route
                path="/friends/all-friends"
                element={<FriendRightAllFriends />}
              />
              <Route
                path="/friends/all-friends/:id"
                element={<FriendRightAllFriends />}
              />
              {/* Profile */}
              <Route path="/profile" element={<Homeleft />} />
              <Route path="profile/:id" exact element={<Homeleft />} />
              {/* Set Profile  */}
              <Route
                path="profile/manage/setprofile"
                exact
                element={<Homeleft />}
              />

            {/*<<--- Cover Photo ---> */}
             <Route path="profile/manage/setcoverphoto" exact element={<Homeleft />} />

              {/* Groups */}
              <Route path="/groups" element={<GroupsHomeRight />} />
              {/* Groups--->profile */}
              <Route path="groups/:id" exact element={<GroupProfileRight />} />
              <Route
                path="groups/mygroup/:id"
                exact
                element={<GroupsHomeRight />}
              />
              {/* Groups--->suggestions */}
              <Route
                path="groups/suggestions"
                exact
                element={<GroupsHomeRight />}
              />
              {/*  <<---Groups-->>create */}
              <Route path="groups/create" exact element={<GroupsHomeRight />} />

             {/*  <<---Groups-->>your group */}
            <Route path="groups/mygroup" exact element={<GroupsHomeRight />} />
                {/*  <<---Groups-->>joined group */}
                <Route
                  path="groups/joingroup"
                  exact
                  element={<GroupsHomeRight />}
                />
              {/*  <<---Groups-->>manage group */}
              <Route
                path="groups/:id/manage"
                exact
                element={<GroupManageright />}
              />
              {/*  <<---Page-->>home page */}
              <Route path="page" exact element={<PageHomeRight />} />
              {/*  Page---> Liked */}
              <Route path="page/liked" exact element={<PageHomeRight />} />
              {/*  Page---> my profile */}
              <Route path="page/mypage/:id" exact element={<PageHomeRight />} />
              <Route path="page/:id" exact element={<PageProfileRight />} />

              {/*  Page---> create page */}
              <Route path="page/create" exact element={<PageHomeRight />} />

              {/*  Page---> Created */}
              <Route path="page/created" exact element={<PageHomeRight />} />
            
            {/* Page-->Manage */}
            <Route path="page/:id/manage" exact element={<PageManageRight />} />
             
              {/*    Messages */}
              <Route path="message" exact element={<MessageHomeRight />} />
              {/*  Meaage---> to anyone */}
              <Route path="message/:id" exact element={<MessageHomeRight />} />

              {/* iChannel */}
              <Route path="ichannel" exact element={<IChannelHomeRight />} />
              {/*  iChannel---> following */}
              <Route
                path="ichannel/following"
                exact
                element={<IChannelHomeRight />}
              />

              {/*  iChannel---> Created */}
              <Route
                path="ichannel/created"
                exact
                element={<IChannelHomeRight />}
              />
              {/*  iChannel---> profile */}
              <Route
                path="ichannel/:id"
                exact
                element={<IChannelHomeRight />}
              />
              {/*  iChannel---> Create */}
              <Route
                path="ichannel/create"
                exact
                element={<IChannelHomeRight />}
              />

              {/*     <Route path="/page" element={<Home />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
