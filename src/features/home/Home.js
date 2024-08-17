import React, { useState, useEffect } from "react";
import "./Home.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import HadithStatus from "./Components/HadithStatus/HadithStatus";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";
import { useInView } from "react-intersection-observer";
import { useGetPostsQuery } from "../../services/postApi";
import Spinner from "../Spinner/Spinner";
import ImagePost from "./Components/ImagePost/ImagePost";
export default function Home() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(new Set());

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
          setLoadingPosts(new Set(newPosts.map(post => post.post_id)));
        }
      }

      // Check if we've reached the last page
      if (page >= data.last_page) {
        setHasMorePosts(false);
      }
    }
  }, [data, isSuccess, page]);

  useEffect(() => {
    if (inView && !isFetching && !isError && hasMorePosts && isSuccess) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isFetching, isError, hasMorePosts, isSuccess]);

  const handlePostLoaded = (postId) => {
    setLoadingPosts(prev => {
      const newSet = new Set(prev);
      newSet.delete(postId);
      return newSet;
    });
  };

  return (
    <div className="friend-home main border-left border-right pb-1 mb-1 m-0 p-0" style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <HeaderComponent />
      <HadithStatus />
      <div className="center-flex-container flex-item">
        <CreatePost />
        <div className="post-wrapper">
          {allPosts.map((post) => (
            <div key={post.post_id} className="post-container">
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
            <div ref={ref} className="loading-trigger">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
