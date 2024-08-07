import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDetailsChecker from "./features/UserDetailsChecker/UserDetailsChecker";
import Home from "./features/home/Home";
import Login from "./features/Login/Login";
import Spinner from "./features/Login/Spinner/Spinner";
import ResetPassword from "./features/ResetPassword/ResetPassword";
import ForgotPassword from "./features/ResetPassword/ForgotPassword";
import NotFound from "./features/404/NotFound";
import Navbar from "./features/Navbars/Navbar";
import Homeleft from "./features/home/Homeleft";
import HadithDay from "./features/home/Components/HadithDay/HadithDay";
import Friends from "./features/Friends/Friends";
import FriendRight from "./features/Friends/FriendRight";
import FriendHome from "./features/Friends/FriendHome/FriendHome";
import FriendRightFriendRequest from "./features/Friends/FriendRightFriendRequest";
import FriendRightFriendSuggestions from "./features/Friends/FriendRightFriendSuggestions";
import FriendRightSentRequests from "./features/Friends/FriendRightSentRequests";
import FriendRightAllFriends from "./features/Friends/FriendRightAllFriends";
import Profile from "./features/Profile/Profile";
import NoUserSelected from "./features/Friends/NoUserSelected";
import GroupsHome from "./features/Groups/GroupsHome";
import GroupsHomeRight from "./features/Groups/GroupsHomeRight";
import GroupSuggestion from "./features/Groups/GroupSuggestion";
import GroupProfile from "./features/Groups/GroupProfile/GroupProfile";
import CreateGroup from "./features/Groups/CreateGroup/CreateGroup";
import GroupsYourGroups from "./features/Groups/GroupsYourGroups";
import GroupManage from "./features/Groups/GroupManage/GroupManage";
import NoUserSelectedAllFriends from "./features/Friends/NoUserSelectedAllFriends";
import NoUserSelectedSentRequest from "./features/Friends/NoUserSelectedSentRequest";
import NoUserSelectedSuggestion from "./features/Friends/NoUserSelectedSuggestion";
import PageHome from "./features/Page/PageHome";
import PageProfile from "./features/Page/PageProfile/PageProfile";
import PageManage from "./features/Page/PageManage/PageManage";
import PageHomeRight from "./features/Page/PageHomeRight";
import PageLiked from "./features/Page/PageLiked/PageLiked";
import CreatePage from "./features/Page/CreatePage/CreatePage";
import UpdatePage from "./features/Page/UpdatePage/UpdatePage";
import MessageHome from "./features/Messages/MessageHome";
import MessageHomeRight from "./features/Messages/MessageHomeRight";
import NoUserSelectedToMessage from "./features/Messages/NoUserSelectedToMessage/NoUserSelectedToMessage";
import MessageAnyOne from "./features/Messages/MessageAnyOne/MessageAnyOne";
import QuizHome from "./features/Quiz/QuizHome";
import IChannelHome from "./features/IChannels/IChannelHome";
import IChannelHomeRight from "./features/IChannels/IChannelHomeRight";
import IChannelFollowing from "./features/IChannels/IChannelFollowing/IChannelFollowing";
import YourPage from "./features/Page/YourPage/YourPage";
import YourIChannels from "./features/IChannels/YourIChannels/YourIChannels";
import IChannelProfile from "./features/IChannels/IChannelProfile/IChannelProfile";
import CreateIChannel from "./features/IChannels/CreateIChannel/CreateIChannel";
import IChannelsManage from "./features/IChannels/IChannelsManage/IChannelsManage";
import ProfileManage from "./features/Profile/ProfileManage/ProfileManage";
import MobileMenu from "./features/MobileMenu/MobileMenu";
import ConfirmModal from "./features/ConfirmModal/ConfirmModal";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setToastError } from "./features/home/HomeSlice";

function App() {
  const dispatch = useDispatch();
  const toastError = useSelector((state) => state.home.toastError);
  useEffect(() => {
    if (toastError) {
      toast.error(toastError, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
   /*  Clean toastError */
    dispatch(setToastError({ toastError: "" }));
  }, [toastError]);
  return (
    <BrowserRouter>
      <ConfirmModal />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        limit={3}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <UserDetailsChecker>
        <Routes>
          {/* Private Routes with Navbar */}
          <Route path="/" exact element={<Navbar />}>
            <Route index exact element={<Home />} />
            <Route index exact element={<Homeleft />} />
            {/* Home */}
            <Route path="friends" exact element={<FriendHome />} />
            <Route path="friends" exact element={<FriendRight />} />

            {/* Friends */}
            <Route path="friends" exact element={<FriendHome />} />
            <Route path="friends" exact element={<FriendRight />} />

            {/* Friends---> requests */}
            <Route path="friends/requests" exact element={<NoUserSelected />} />
            <Route
              path="friends/requests"
              exact
              element={<FriendRightFriendRequest />}
            />
            <Route path="friends/requests/:id" exact element={<Profile />} />
            <Route
              path="friends/requests/:id"
              exact
              element={<FriendRightFriendRequest />}
            />

            {/* Friends---> suggestions */}
            <Route
              path="friends/suggestions"
              exact
              element={<NoUserSelectedSuggestion />}
            />
            <Route
              path="friends/suggestions"
              exact
              element={<FriendRightFriendSuggestions />}
            />
            <Route path="friends/suggestions/:id" exact element={<Profile />} />
            <Route
              path="friends/suggestions/:id"
              exact
              element={<FriendRightFriendSuggestions />}
            />

            {/* Friends---> sent-requests */}
            <Route
              path="friends/sent-requests"
              exact
              element={<NoUserSelectedSentRequest />}
            />
            <Route
              path="friends/sent-requests"
              exact
              element={<FriendRightSentRequests />}
            />
            <Route
              path="friends/sent-requests/:id"
              exact
              element={<Profile />}
            />
            <Route
              path="friends/sent-requests/:id"
              exact
              element={<FriendRightSentRequests />}
            />

            {/* Friends---> all friends */}
            <Route
              path="friends/all-friends"
              exact
              element={<NoUserSelectedAllFriends />}
            />
            <Route
              path="friends/all-friends"
              exact
              element={<FriendRightAllFriends />}
            />
            <Route path="friends/all-friends/:id" exact element={<Profile />} />
            <Route
              path="friends/all-friends/:id"
              exact
              element={<FriendRightAllFriends />}
            />

            {/* Profile */}
            <Route path="profile" exact element={<Profile />} />
            <Route path="profile" exact element={<Homeleft />} />
            {/* Profile --->manage */}
            <Route path="profile/manage" exact element={<ProfileManage />} />

            {/* Groups */}
            <Route path="groups" exact element={<GroupsHome />} />
            <Route path="groups" exact element={<GroupsHomeRight />} />

            {/* Groups---> profile */}
            <Route path="groups/:id" exact element={<GroupProfile />} />
            <Route path="groups/:id" exact element={<GroupsHomeRight />} />
            <Route path="groups/mygroup/:id" exact element={<GroupProfile />} />
            <Route
              path="groups/mygroup/:id"
              exact
              element={<GroupsHomeRight />}
            />
            {/* Groups---> suggestions */}
            <Route
              path="groups/suggestions"
              exact
              element={<GroupSuggestion />}
            />
            <Route
              path="groups/suggestions"
              exact
              element={<GroupsHomeRight />}
            />

            {/* Groups---> create group */}
            <Route path="groups/create" exact element={<CreateGroup />} />
            <Route path="groups/create" exact element={<GroupsHomeRight />} />

            {/* Groups---> your group */}
            <Route path="groups/joinned" exact element={<GroupsYourGroups />} />
            <Route path="groups/joineed" exact element={<GroupsHomeRight />} />

            {/* Groups---> manage group */}
            <Route path="groups/:id/manage" exact element={<GroupManage />} />
            <Route
              path="groups/:id/manage"
              exact
              element={<GroupsHomeRight />}
            />

            {/* Page */}
            <Route path="page" exact element={<PageHome />} />
            <Route path="page" exact element={<PageHomeRight />} />

            {/* Page---> profile */}
            <Route path="page/:id" exact element={<PageProfile />} />
            <Route path="page/:id" exact element={<PageHomeRight />} />
            <Route path="page/mypage/:id" exact element={<PageProfile />} />

            {/* Page---> manage */}
            <Route path="page/:id/manage" exact element={<PageManage />} />

            {/* Page---> Liked */}
            <Route path="page/liked" exact element={<PageLiked />} />
            <Route path="page/liked" exact element={<PageHomeRight />} />
            {/* Page---> Created */}
            <Route path="page/created" exact element={<YourPage />} />
            <Route path="page/created" exact element={<PageHomeRight />} />

            {/* Page---> create page */}
            <Route path="page/create" exact element={<CreatePage />} />
            <Route path="page/create" exact element={<PageHomeRight />} />
            {/* Page---> update page */}
            <Route path="page/update" exact element={<UpdatePage />} />

            {/* Messages */}
            <Route path="message" exact element={<NoUserSelectedToMessage />} />
            <Route path="message" exact element={<MessageHomeRight />} />
            {/* Message---> to anyone */}
            <Route path="message/:id" exact element={<MessageAnyOne />} />
            <Route path="message/:id" exact element={<MessageHomeRight />} />

            {/* Quiz */}
            <Route path="quiz" exact element={<QuizHome />} />

            {/* iChannel */}
            <Route path="ichannel" exact element={<IChannelHome />} />
            <Route path="ichannel" exact element={<IChannelHomeRight />} />
            {/* iChannel---> following */}
            <Route
              path="ichannel/following"
              exact
              element={<IChannelFollowing />}
            />
            <Route
              path="ichannel/following"
              exact
              element={<IChannelHomeRight />}
            />

            {/* iChannel---> Created */}
            <Route path="ichannel/created" exact element={<YourIChannels />} />
            <Route
              path="ichannel/created"
              exact
              element={<IChannelHomeRight />}
            />

            {/* iChannel---> profile */}
            <Route path="ichannel/:id" exact element={<IChannelProfile />} />
            <Route path="ichannel/:id" exact element={<IChannelHomeRight />} />

            {/* iChannel---> Create */}
            <Route path="ichannel/create" exact element={<CreateIChannel />} />
            <Route
              path="ichannel/create"
              exact
              element={<IChannelHomeRight />}
            />

            {/* iChannel---> manage */}
            <Route
              path="ichannel/:id/manage"
              exact
              element={<IChannelsManage />}
            />

            {/* Mobile Menu */}
            <Route path="menu" exact element={<MobileMenu />} />
          </Route>

          {/* Public routes */}
          <Route path="/" exact element={<Home />} />
          <Route path="/day" exact element={<HadithDay />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/spinner" exact element={<Spinner />} />
          <Route path="/forgotpassword" exact element={<ForgotPassword />} />
          <Route
            path="/resetpassword/:token"
            exact
            element={<ResetPassword />}
          />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </UserDetailsChecker>
    </BrowserRouter>
  );
}

export default App;
