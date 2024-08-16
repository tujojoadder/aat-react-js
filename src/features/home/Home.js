import React, { useState, useEffect } from "react";
import "./Home.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import HadithStatus from "./Components/HadithStatus/HadithStatus";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";
import { useInView } from "react-intersection-observer";
import { useGetPostsQuery } from "../../services/postApi";
import InsideSpinner from "../InsideSpinner/InsideSpinner";
import TextPostSkeleton from "./Components/TextPost/TextPostSkeleton/TextPostSkeleton";
import ImagePost from "./Components/ImagePost/ImagePost";
import ImagePostSkeleton from "./Components/ImagePost/ImagePostSkeleton/ImagePostSkeleton";

export default function Home() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(new Set()); // Track loading state

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
          setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
          // Set all new posts as loading initially
          setLoadingPosts(new Set(newPosts.map(post => post.post_id)));
        }
      }
      setIsInitialFetch(false);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (inView && !isFetching && !isError && hasMorePosts && isSuccess) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isFetching, isError, hasMorePosts, isSuccess]);

  // Mark a post as loaded
  const handlePostLoaded = (postId) => {
    setLoadingPosts(prev => {
      const newSet = new Set(prev);
      newSet.delete(postId);
      return newSet;
    });
  };

  return (
    <div className="friend-home main border-left border-right mb-1 m-0 p-0" style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <HeaderComponent />
      <HadithStatus />
      <div className="center-flex-container flex-item">
        <CreatePost />
        <div className="post-wrapper">
          {allPosts.map((post) => (
            <div key={post.post_id} className="post-container">
              {isFetching &&  loadingPosts.has(post.post_id) && !post.image_post && <TextPostSkeleton />}
              {isFetching && loadingPosts.has(post.post_id) && post.image_post && <ImagePostSkeleton />}
              
              {!loadingPosts.has(post.post_id) && post.text_post && !post.image_post && (
                <TextPost post={post} onLoad={() => handlePostLoaded(post.post_id)} />
              )}
              {!loadingPosts.has(post.post_id) && !post.text_post && post.image_post && (
                <ImagePost post={post} onLoad={() => handlePostLoaded(post.post_id)} />
              )}
            </div>
          ))}


          {/* Trigger for loading more posts */}
          {hasMorePosts && (
            <div ref={ref} className="loading-trigger" >
              {isFetching && <InsideSpinner />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
