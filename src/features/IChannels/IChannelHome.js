

import React, { useState, useEffect } from "react";
import "./IChannelHome.css";
import Spinner from "../Spinner/Spinner";
import { useInView } from "react-intersection-observer";

import { useGetRandomIaccountPostQuery } from "../../services/iaccountsApi";
import IChannelTextPost from "./IChannelTextPost/IChannelTextPost";
import IChannelBPost from "./IChannelBPost/IChannelBPost";
import IChannelImagePost from "./IChannelImagePost/IChannelImagePost";
export default function IChannelHome() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  //face new data
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const { data, isFetching, isError, isSuccess } =
    useGetRandomIaccountPostQuery(page);

    if (isSuccess) {
      console.log(data);
    }

  useEffect(() => {
    if (isSuccess && data?.data) {
      if (data.data.length === 0) {
        setHasMorePosts(false);
      } else {
        const newPosts = data.data.filter(
          (newPost) =>
            !allPosts.some((post) => post.post_id === newPost.post_id)
        );
        if (newPosts.length > 0) {
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
    <div
      className="friend-home main border-start border-end mb-1 m-0 p-0"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      <div className="center-flex-container flex-item">
        <div className="post-wrapper">
          {allPosts.map((post) => (
            <div key={post.post_id} className="post-container">


{post.text_post && post.image_post && <IChannelBPost post={post} />} 
{post.text_post && !post.image_post && <IChannelTextPost post={post} />}
{!post.text_post && post.image_post && <IChannelImagePost post={post} />}
            </div>
          ))}

          <div
            ref={ref}
            className="loading-trigger"
            style={{ minHeight: "30px" }}
          >
            {isFetching && <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
}
