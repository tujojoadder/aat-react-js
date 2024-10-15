import React, { useState, useEffect } from "react";
import "./Home.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import ImagePost from "./Components/ImagePost/ImagePost";
import BPost from "./Components/BPost/BPost";
import HadithStatus from "./Components/HadithStatus/HadithStatus";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";
import CreatePostSkeleton from "./Components/CreatePost/CreatePostSkeleton/CreatePostSkeleton";
import Spinner from "../Spinner/Spinner";
import { useInView } from "react-intersection-observer";
import { useGetPostsQuery } from "../../services/postApi";
import echo from "../../echo";

export default function Home() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  //face new data
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const { data, isFetching, isError, isSuccess } = useGetPostsQuery(page);

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

  useEffect(() => {
    echo.channel("ab").listen("Hello", (e) => {
      console.log(e);
    });

    echo.private("ab-private").listen("HelloPrivatEvent", (e) => {
      console.log(e);
    });

    echo
      .join("ab-presence")
      .here((users) => {
        console.log("Currently present users:", users);
      })
      .joining((user) => {
        console.log("User joined:", user);
      })
      .leaving((user) => {
        console.log("User left:", user);
      })
      .listen("HelloPresenceEvent", (e) => {
        console.log(e);
      });
  }, []);

  return (
    <div
      className="friend-home main border-start border-end mb-1 m-0 p-0"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      <HeaderComponent />
      <HadithStatus />

      <div className="center-flex-container flex-item">
        {isFetching ? <CreatePostSkeleton /> : <CreatePost />}{" "}
        {/* Conditionally render the skeleton */}
        <div className="home py-2  " style={{ marginTop: "-1vh" }}>
          <h1>Home</h1>
        </div>
        <div className="post-wrapper">
          {allPosts.map((post) => (
            <div key={post.post_id} className="post-container">
              {post.text_post && !post.image_post && <TextPost post={post} />}
              {!post.text_post && post.image_post && <ImagePost post={post} />}
              {post.text_post && post.image_post && <BPost post={post} />}
            </div>
          ))}

          <div
            ref={ref}
            className="loading-trigger"
           
          >
            {isFetching && <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
}
