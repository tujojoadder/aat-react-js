import React, { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";
import Spinner from '../../Spinner/Spinner';
import ImagePost from '../../home/Components/ImagePost/ImagePost';
import TextPost from '../../home/Components/TextPost/TextPost';
import BPost from '../../home/Components/BPost/BPost';
import { useGetSpecificUserPostQuery } from '../../../services/profileApi';

export default function ProfilePost({ userId }) {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  // Infinite scrolling setup
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetch posts using RTK Query
  const { data: userPosts, isFetching, isError, isSuccess } = useGetSpecificUserPostQuery({ page, userId });

  // Reset posts when `userId` changes
  useEffect(() => {
    setAllPosts([]);
    setPage(1);
    setHasMorePosts(true);
  }, [userId]);

  // Update post list and avoid duplicates
  useEffect(() => {
    if (isSuccess && userPosts?.data) {
      console.log("Fetched posts:", userPosts.data); // Debugging line to check fetched data

      if (userPosts.data.length === 0) {
        setHasMorePosts(false);
      } else {
        const newPosts = userPosts.data.filter(
          (post) => !allPosts.some((existingPost) => existingPost.post_id === post.post_id)
        );

        if (newPosts.length > 0) {
          setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
        }
      }
    }
  }, [userPosts, isSuccess, allPosts]);

  // Infinite scroll effect to load more posts
  useEffect(() => {
    if (inView && hasMorePosts && !isFetching && !isError) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMorePosts, isFetching, isError]);

  // Error Handling
  if (isError) {
    return <p className="text-center">Failed to load posts. Please try again later.</p>;
  }

  return (
    <div className="post-wrapper">
      {/* Display posts */}
      {allPosts.length === 0 && !isFetching && <p className="text-center">No posts available.</p>}
      {allPosts.map((post) => (
        <div key={post.post_id} className="post-container">
          {post.text_post && !post.image_post && <TextPost post={post} />}
          {!post.text_post && post.image_post && <ImagePost post={post} />}
          {post.text_post && post.image_post && <BPost post={post} />}
        </div>
      ))}

      {/* Infinite scroll trigger */}
      <div ref={ref} className="loading-trigger" style={{ height: "7vh", minHeight: "40px" }}>
        {isFetching && <Spinner />}
      </div>

      {/* Message when no more posts */}
      {!hasMorePosts && !isFetching && (
        <p className="text-center">No more posts available.</p>
      )}
    </div>
  );
}
