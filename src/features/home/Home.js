import React, { useState, useEffect } from "react";
import "./Home.css";
import CreatePost from "./Components/CreatePost/CreatePost";

import TextPost from "./Components/TextPost/TextPost";
import ImagePost from "./Components/ImagePost/ImagePost";
import BPost from "./Components/BPost/BPost";
import HadithStatus from "./Components/HadithStatus/HadithStatus";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";
import { useInView } from "react-intersection-observer";
import { useGetPostsQuery } from "../../services/postApi";
import SkeletonLoader from "./Components/SkeletonLoader/SkeletonLoader";
import CreatePostSkeleton from "./Components/CreatePost/CreatePostSkeleton/CreatePostSkeleton";
import InsideSpinner from "../InsideSpinner/InsideSpinner";

export default function Home() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const { data, isFetching, isError, isSuccess } = useGetPostsQuery(page);

  useEffect(() => {
    if (isSuccess && data?.data) {
      if (data.data.length === 0) {
        setHasMorePosts(false);
      } else {
        const newPosts = data.data.filter(
          (newPost) => !allPosts.some((post) => post.post_id === newPost.post_id)
        );
        if (newPosts.length > 0) {
          console.log(newPosts);
          setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
        }
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (inView && !isFetching && !isError && hasMorePosts && isSuccess) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isFetching, isError, hasMorePosts, isSuccess]);

  return (
    <div className="friend-home main border-left border-right  mb-1 m-0 p-0" style={{ backgroundColor: "white",minHeight:'100vh' }}>
         <HeaderComponent />
      <HadithStatus />
      <div className="center-flex-container flex-item">
        <CreatePost />
        
        <div className="post-wrapper">
          {allPosts.map((post) => (
            <div key={post.post_id} className="post-container">
              {post.text_post && !post.image_post && <TextPost post={post} />}
              {/* Uncomment when image post components are ready */}
              {!post.text_post && post.image_post && <ImagePost post={post} />}
              {post.text_post && post.image_post && <BPost post={post} />}
            </div>
          ))}

          <div ref={ref} className="loading-trigger">
            {isFetching && <InsideSpinner/>}
          </div>
        </div>
      </div>
    </div>
  );
}
