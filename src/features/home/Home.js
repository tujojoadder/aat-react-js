import React, { useState, useEffect } from "react";
import "./Home.css";
import HadithIteam from "./Components/HadithItem/HadithIteam";
import "./.././../all.css";
import "./.././../style.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import ImagePost from "./Components/ImagePost/ImagePost";
import HadithStatus from "./Components/HadithStatus/HadithStatus";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../services/hadithApi";
import BPost from "./Components/BPost/BPost";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";
import Spinner from "../Spinner/Spinner";

export default function Home() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true); // Track if there are more posts

  // Intersection observer hook to detect when the user has scrolled to the bottom
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the component is visible
    triggerOnce: false, // Keep observing
  });

  // Fetch the posts based on the current page
  const { data, isFetching, isError, isSuccess } = useGetPostsQuery(page);

  useEffect(() => {
    if (inView && !isFetching && !isError && hasMorePosts) {
      // Increase the page number when the bottom is reached
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isFetching, isError, hasMorePosts]);

  useEffect(() => {
    if (isSuccess && data?.data) {
      if (data.data.length === 0) {
        setHasMorePosts(false); // No more posts to load
      } else {
        // Filter out duplicates
        const newPosts = data.data.filter(
          (newPost) => !allPosts.some((post) => post.post_id === newPost.post_id)
        );
        // Append unique posts to allPosts
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
      {allPosts.map((post, index) => (
        <div key={post.post_id}>
          <h1>
            {index} -- {post.post_id}
          </h1>
        </div>
      ))}

      {/* The element that triggers loading more content when scrolled into view */}
      <div ref={ref} className="loading-trigger">
        {isFetching && <h1 className=""><Spinner/></h1>}
      </div>

    
 {/* Header for mobile(sm) */}
 <HeaderComponent/>
 {/* Hadith Status */}
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
 <BPost/>
 </div>
    </div>
  );
}
