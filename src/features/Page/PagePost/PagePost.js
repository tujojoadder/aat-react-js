import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Spinner from "../../Spinner/Spinner";

import ImagePost from "../../home/Components/ImagePost/ImagePost";
import TextPostSkeleton from "../../home/Components/TextPost/TextPostSkeleton/TextPostSkeleton";
import BPost from "../../home/Components/BPost/BPost";
import { useGetSpecificPagePostQuery } from "../../../services/pagesApi";
import TextPost from "../../home/Components/TextPost/TextPost";
import PageTextPost from "../PageTextPost/PageTextPost";
import PageImagePost from "../PageImagePost/PageImagePost";
import PageBPost from "../PageBPost/PageBPost";

export default function PagePost({ pageId, joinStatus }) {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  // Infinite scrolling setup
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetch posts using RTK Query
  const {
    data: userPosts,
    isFetching,
    isError,
    isSuccess,
  } = useGetSpecificPagePostQuery({ page, pageId });

  // Reset posts when `pageId` changes
  useEffect(() => {
    setAllPosts([]);
    setPage(1);
    setHasMorePosts(true);
  }, [pageId]);

  // Update post list and avoid duplicates
  useEffect(() => {
    if (isSuccess && userPosts?.data) {
      if (userPosts.data.length === 0) {
        setHasMorePosts(false);
      } else {
        const newPosts = userPosts.data.filter(
          (post) =>
            !allPosts.some(
              (existingPost) => existingPost.post_id === post.post_id
            )
        );

        if (newPosts.length > 0) {
          setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
        }
      }
    }
  }, [userPosts, isSuccess, allPosts]);

  if (isSuccess) {
    console.log(userPosts);
  }

  // Infinite scroll effect to load more posts
  useEffect(() => {
    if (inView && hasMorePosts && !isFetching && !isError) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMorePosts, isFetching, isError]);

  // Error Handling
  if (isError) {
    return (
      <p className="text-center">
        Failed to load posts. Please try again later.
      </p>
    );
  }

  return (
    <div className="post-wrapper">
      {/*      {joinStatus &&  <CreateGroupPost pageId={pageId}/>}
       */}

      {/* Display posts */}
      {allPosts.length === 0 && !isFetching && (
        <h4 className="text-center" style={{ color: "#592529" }}>
          No Posts to show
        </h4>
      )}
      {allPosts.map((post) => (
        <div key={post.post_id} className="post-container">
          {/*           {post.text_post && !post.image_post && <TextPost post={post} />}
          {!post.text_post && post.image_post && <ImagePost post={post} />}
          {post.text_post && post.image_post && <BPost post={post} />} */}

          {post.text_post && !post.image_post && <PageTextPost post={post} />}
          {!post.text_post && post.image_post && <PageImagePost post={post} />}
          {post.text_post && post.image_post && <PageBPost post={post} />}
        </div>
      ))}

      {/* Infinite scroll trigger */}
      <div
        ref={ref}
        className="loading-trigger"
        style={{ height: "7vh", minHeight: "40px" }}
      >
        {isFetching && <Spinner />}
      </div>
    </div>
  );
}
