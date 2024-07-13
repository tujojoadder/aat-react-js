import React from "react";
import { NavLink, BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import GroupsYourGroups from "../Groups/GroupsYourGroups";
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
import CreatedPages from "../Page/CreatedPages/CreatedPages";
import MessageHome from "../Messages/MessageHome";
import MessageHomeRight from "../Messages/MessageHomeRight";
import NoUserSelectedToMessage from "../Messages/NoUserSelectedToMessage/NoUserSelectedToMessage";
import MessageAnyOne from "../Messages/MessageAnyOne/MessageAnyOne";
import QuizHome from "../Quiz/QuizHome";

const Navbar = () => {
  const isNotSm = useMediaQuery({ minWidth: 576 }); // Bootstrap's sm breakpoint is 576px
  const location = useLocation();
  const isMessagePage = location.pathname.startsWith("/message/");
  
  return (
    <Scrollbars style={{ width: "100%", height: "104vh", minHeight: "300px" }}>
      <div className={isNotSm ? "container-sm  " : "ms-3 me-3"} style={{}}>
        {/* xs NAV BAR */}
        {!isMessagePage && (
        <nav className={`bg-light xs-nav fixed-bottom d-sm-none border-bottom`}>
          <div className="container-fluid">
            <div className="row h-50">
              <div className="row">
                <div className="col-3 text-center">
                  <NavLink to="/" className="custom-link">
                    <i className="fa-solid fa-house fs-3 py-3"></i>
                  </NavLink>
                </div>
                <div className="col-3 text-center">
                  <NavLink to="/page" className="custom-link">
                    <i className="fa-solid fa-magnifying-glass fs-2 py-3"></i>
                  </NavLink>
                </div>
                <div className="col-3 text-center">
                  <NavLink to="/page" className="custom-link">
                    <i className="fa-solid fa-bell fs-2 py-3"></i>
                  </NavLink>
                </div>
                <div className="col-3 text-center">
                  <NavLink to="/page" className="custom-link">
                    <i className="fa-solid fa-envelope fs-2 py-3"></i>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
 )}
        <div className="row">
          {/* LEFT SIDE BAR */}
          <div
            style={{ backgroundColor: "#fdfdfd", height: "100vh" }}
            className="p-0  d-none col-sm-2 d-sm-block col-md-2 col-lg-3 d-flex flex-column text-sm-end text-md-start align-items-lg-start left_sidebar  "
          >
            <div
              className="pe-2 pt-5    bg-body rounded"
              style={{ width: "97%", height: "100vh" }}
            >
              <div className="  mb-3 d-flex align-items-center justify-content-center mydiv">
                <span>
                  <i className="fa-brands fa-twitter display-5 text-info"></i>
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
                    <i class="fa-solid fa-users fs-2"></i>
                  </span>
                  <p className="d-none d-lg-block fs-4 ps-2 text">Groups</p>
                </div>
              </NavLink>
              <NavLink to="/page" className="custom-link">
                <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
                  <span>
                  <i class="fa-solid fa-flag fs-2"></i>
                  
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
                    <i className="fa-solid fa-hourglass-half fs-2"></i>
                 </span>
                <p className="d-none d-lg-block fs-4 ps-2 text">Quiz</p>
              </div>
             </NavLink>



              <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
                <span>
                <i class="fa-solid fa-mosque  fs-2"></i>
                </span>
                <p className="d-none d-lg-block fs-4 ps-2 text">iChanel</p>
              </div>

              <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
                <span>
                  <i className="fa-solid fa-user fs-2"></i>
                </span>
                <p className="d-none d-lg-block fs-4 ps-2 text">Profile</p>
              </div>

              <div className="d-flex align-items-center my-2 py-1 pl-5 mydiv">
                <span>
                  <i className="fa-solid fa-ellipsis fs-2"></i>
                </span>
                <p className="d-none d-lg-block fs-4 ps-2 text">More</p>
              </div>
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
                <Route path="/friends/suggestions/" element={<NoUserSelectedSuggestion />} />
                <Route path="/friends/sent-requests/" element={<NoUserSelectedSentRequest />} />
                <Route path="/friends/all-friends/" element={<NoUserSelectedAllFriends />}
                />

                <Route path="/friends/requests/:id" element={<Profile />} />
                <Route path="/friends/suggestions/:id" element={<Profile />} />
                <Route path="/friends/sent-requests/:id" element={<Profile />} />
                <Route path="/friends/all-friends/:id" element={<Profile />} />

                {/* Grouos */}
                <Route path="/groups" element={<GroupsHome />} />
                 {/*  <<---Grouos-->>suggestions */}
                <Route path="groups/suggestions" exact element={<GroupSuggestion />} />               
                {/*  <<---Grouos-->>profile */}
                <Route path="/groups/:id" element={<GroupProfile />} />
                <Route path="/groups/mygroup/:id" element={<GroupProfile />} />
                {/*  <<---Groups-->>create */}
                <Route path="groups/create" exact element={<CreateGroup />} />
               {/*  <<---Groups-->>your group */}
               <Route path="groups/joined" exact element={<GroupsYourGroups />} />
               {/*  <<---Groups-->>manage group */}
                <Route path="groups/:id/manage" exact element={<GroupManage />} />
                


               {/* <<---Page-->> */}
               <Route path="/page" element={<PageHome />} />
               {/*  Page---> profile */}
               <Route path="page/:id" exact element={<PageProfile/>} />
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
                  <Route path="page/created" exact element={<CreatedPages />} />

             {/*    Messages */}
             <Route path="message" exact element={<MessageHome />} />
   {/*  Meaage---> to anyone */}
   <Route path="message/:id" exact element={<MessageAnyOne />} />

{/* Quiz */}
<Route path="quiz" exact element={<QuizHome />} />




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
              <Route path="/friends/requests" element={<FriendRightFriendRequest />} />
              <Route path="/friends/requests/:id" element={<FriendRightFriendRequest />} />
              {/* Friends--->suggestions */}
              <Route path="/friends/suggestions" element={<FriendRightFriendSuggestions />} />
              <Route path="/friends/suggestions/:id" element={<FriendRightFriendSuggestions />} />
              {/* Friends--->sent-requests */}
              <Route path="/friends/sent-requests" element={<FriendRightSentRequests />} />
              <Route path="/friends/sent-requests/:id" element={<FriendRightSentRequests />} />
              {/* Friends--->sent-requests */}
              <Route path="/friends/all-friends" element={<FriendRightAllFriends />} />
              <Route path="/friends/all-friends/:id" element={<FriendRightAllFriends />}/>
              {/* Groups */}
              <Route path="/groups" element={<GroupsHomeRight />} />
               {/* Groups--->profile */}
               <Route path="groups/:id" exact element={<GroupProfileRight />}/>
              <Route path="groups/mygroup/:id" exact element={<GroupsHomeRight />}/>
              {/* Groups--->suggestions */}
              <Route path="groups/suggestions" exact element={<GroupsHomeRight />}/>
                {/*  <<---Groups-->>create */}
                <Route path="groups/create" exact element={<GroupsHomeRight />} />
               {/*  <<---Groups-->>your group */}
               <Route path="groups/joined" exact element={<GroupsHomeRight />} />
               {/*  <<---Groups-->>manage group */}
               <Route path="groups/:id/manage" exact element={<GroupsHomeRight />} />
               {/*  <<---Page-->>home page */}
               <Route path="page" exact element={<PageHomeRight />} />
               {/*  Page---> Liked */}
               <Route path="page/liked" exact element={<PageHomeRight />} />
                {/*  Page---> my profile */}
               <Route path="page/mypage/:id" exact element={<PageHomeRight />} />
               <Route path="page/:id" exact element={<PageProfileRight/>} />

               {/*  Page---> create page */}
               <Route path="page/create" exact element={<PageHomeRight />} />

                  {/*  Page---> Created */}
                  <Route path="page/created" exact element={<PageHomeRight />} />
                  {/*    Messages */}
                  <Route path="message" exact element={<MessageHomeRight />} />

   {/*  Meaage---> to anyone */}
   <Route path="message/:id" exact element={<MessageHomeRight />} />





              {/*     <Route path="/page" element={<Home />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

export default Navbar;
