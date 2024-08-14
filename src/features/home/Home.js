import React, { useState, useEffect } from "react";
import "./Home.css";
import HadithIteam from "./Components/HadithItem/HadithIteam";
import "./.././../all.css";
import "./.././../style.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import ImagePost from "./Components/ImagePost/ImagePost";
import HadithStatus from "./Components/HadithStatus/HadithStatus";
import { Scrollbars } from "react-custom-scrollbars";
import Friends from "../Friends/Friends";
import BPost from "./Components/BPost/BPost";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";
import MobileMenu from "../MobileMenu/MobileMenu";
import FriendRequestBack from "../Friends/FriendBack/FriendRequestBack/FriendRequestBack";
import FriendSuggestionBack from "../Friends/FriendBack/FriendSuggestionBack/FriendSuggestionBack";
import IChannelCreateBack from "../IChannels/iChannelBack/iChannelCreateBack/IChannelCreateBack";
import HadithDay from "./Components/HadithDay/HadithDay";
import Try from "./Components/Try/Try";
import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../services/hadithApi";

export default function Home() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);

  // Fetch the posts based on the current page
  const { data, isFetching, isSuccess } = useGetPostsQuery(page, {
    selectFromResult: ({ data, isSuccess }) => ({
      data: data?.data,
      isSuccess,
    }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      const newPosts = data.filter(
        (newPost) => !allPosts.some((post) => post.post_id === newPost.post_id)
      );

      if (newPosts.length) {
        setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
    }
  }, [data, isSuccess]);

  const name = useSelector((state) => state.home.toastSuccess);


  return (
    <div
      className="p-0 m-0 home-container main"
      style={{ width: "100%", backgroundColor: "#f8f9fa" }}
    >
      <button onClick={() => setPage(page + 1)} disabled={isFetching}>
        Next
      </button>

      {allPosts.map(({ post_id }) => (
        <div key={post_id}>
          <p>{post_id}</p>
        </div>
      ))}

      {/* Header for mobile(sm) */}
      <HeaderComponent />
      {/*    Hadith Status */}
      <HadithStatus />

      <div className="center-flex-container flex-item">
        {/* Create post */}
        <CreatePost />

        {name}
        {/* Text post */}
        <TextPost />
        <BPost />

        <ImagePost />
        <TextPost />
        <TextPost />
        <ImagePost />
        <BPost />
      </div>
    </div>
  );
}
