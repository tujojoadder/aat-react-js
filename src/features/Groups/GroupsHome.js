import React, { useState, useEffect } from "react";
import "./GroupsHome.css";
import Spinner from "../Spinner/Spinner";
import { useInView } from "react-intersection-observer";
import CreatePost from "../home/Components/CreatePost/CreatePost";
import TextPost from "../home/Components/TextPost/TextPost";
import ImagePost from "../home/Components/ImagePost/ImagePost";
import BPost from "../home/Components/BPost/BPost";
import CreatePostSkeleton from "../home/Components/CreatePost/CreatePostSkeleton/CreatePostSkeleton";
import { useGetRandomGroupPostQuery } from "../../services/groupsApi";
import GroupImagePost from "../home/Components/ImagePost/GroupImagePost/GroupImagePost";
import GroupTextPost from "../home/Components/TextPost/GroupTextPost/GroupTextPost";
import GroupBPost from "../home/Components/BPost/GroupBPost/GroupBPost";
export default function GroupsHome() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  //face new data
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const { data, isFetching, isError, isSuccess } =
    useGetRandomGroupPostQuery(page);

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
              {post.text_post && !post.image_post && <GroupTextPost post={post} />}
              {!post.text_post && post.image_post && <GroupImagePost post={post} />}
              {post.text_post && post.image_post && <GroupBPost post={post} />}
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
