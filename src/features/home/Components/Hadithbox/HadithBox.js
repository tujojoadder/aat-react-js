import React from "react";
import { useGetRandomHadithQuery, useSetDayhadithMutation } from "../../../../services/hadithApi";
import "./HadithBox.css";
import { useMediaQuery } from "react-responsive";

const HadithBox = () => {
  const { data: hadith, isFetching, isError, refetch } = useGetRandomHadithQuery();
  const isLg = useMediaQuery({ query: "(min-width: 1400px)" });

  let content;

  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (isError || !hadith || !hadith.data) {
    content = <p>No Hadith available</p>;
  } else {
    content = <p>{hadith.data.hadith}</p>;
  }

  return (
    <div className="hadith-box shadow-sm mb-2 mb-1 shadow-lg bg-white rounded border">
      <div className="hadith-head ms-0 ps-0">
        <button className="btn-add">
          <i className="fa-solid fa-plus"></i>
          {isLg ? "Add Day" : ""}
        </button>
        <div className="hadith-type" style={{ marginRight: "0.02rem" }}>
          <i
            style={{ marginRight: "0.2rem" }}
            className="fa-solid fa-book-open-reader fs-4"
          ></i>
          <span>{hadith && hadith.data ? hadith.data.book : "Hadith Type"}</span>
        </div>
        <div
          className={`btn-new ${isFetching ? "loading" : ""}`}
          onClick={() => refetch()}
        >
          <i className="fa-solid fa-rotate"></i>
        </div>
      </div>
      <div className="card-body px-3 pt-2">
        <div className="card-content">
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default HadithBox;
