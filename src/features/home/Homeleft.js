import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Homeleft.css";

export default function Homeleft() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const localStorageKey = "scrollPositionPage"; // Unique key for this component

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        parseInt(localStorage.getItem(localStorageKey)) || 0;
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = () => {
    localStorage.setItem(localStorageKey, scrollRef.current.scrollTop);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const goToTable = () => {
    navigate("/table");
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        ref={scrollRef}
        className="scroll-container"
        style={{ overflowY: "scroll", position: "fixed" }}
      >
        <div className="p-3">
          <div
            class="col-lg-3 d-none d-lg-block  w-25 h-25 right_side_bar"
            style={{ width: "300px" }} // Set a fixed width for the container
          >
            {/* search box  */}
            <div class="bg-opacity-10 bg-black rounded-pill mb-3">
              <div class="row d-flex align-items-center">
                <div class="col-2 text-end fs-4">
                  <span>
                    <i class="fa-solid fa-magnifying-glass ps-4"></i>
                  </span>
                </div>
                <div class="col-10">
                  <input
                    type="text"
                    class="form-control-lg border-0 me-1 w-75 bg-transparent"
                    placeholder="Search Twitter"
                  />
                </div>
              </div>
            </div>

            {/* hadis box */}

            <div class="mb-3 haddis">
              {/* Header */}
              <div
                class="hadis-head  bg-info d-flex justify-content-between"
                style={{ height: "50px" }}
              >
                {/* Copy button */}
                <button
                  style={{ borderRadius: "30px" }}
                  class="btn btn-info btn-sm btn-custom ml-3 my-2"
                >
                  Copy
                  <i class="fa-solid fa-copy"></i>
                </button>
                {/* New hadis button */}
                <div class="btn btn-info btn-sm mr-3 my-2 rounded-circle d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-rotate text-light"></i>
                </div>
              </div>

              <div
                className=" card-body custom-scroll bg-opacity-10 bg-black"
                style={{
                  height: "292px",
                  borderBottomRightRadius: "30px",
                  borderBottomLeftRadius: "30px",
                  paddingLeft:'30px'
                }}
              >

                <div className="" style={{  width: "290px", }}>
                <h5 className="card-title">Primary card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make
                  up the bulk of the card's content. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum.
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
