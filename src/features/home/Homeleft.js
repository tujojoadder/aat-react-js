import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Homeleft.css";
import SendFriendRequest from "../components/SendFriendRequest";

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

            <div class="mb-3 haddis ">
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
                  paddingLeft: "30px",
                }}
              >
                <div className="" style={{ maxWidth: "290px" }}>
                  <h5 className="card-title">Primary card title</h5>
                  <p className="card-text">
                  এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেরূপ নূহ ও তাঁর পরবর্তী নবীদের (নবীদের) প্রতি ওয়াহী প্রেরণ করেছিলাম।’’ (সূরাহ্ আন-নিসা ৪/১৬৩)

১. ’আলক্বামাহ ইবনু ওয়াক্কাস আল-লায়সী (রহ.) হতে বর্ণিত। আমি ’উমার ইবনুল খাত্তাব (রাঃ)-কে মিম্বারের উপর দাঁড়িয়ে বলতে শুনেছিঃ আমি আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম-কে বলতে শুনেছিঃ কাজ (এর প্রাপ্য হবে) নিয়্যাত অনুযায়ী। আর মানুষ তার নিয়্যাত অনুযায়ী প্রতিফল পাবে। তাই যার হিজরত হবে ইহকাল লাভের অথবা কোন মহিলাকে বিবাহ করার উদ্দেশে- তবে তার হিজরত সে উদ্দেশেই হবে, যে জন্যে, সে হিজরত করেছে।] (৫৪, ২৫২৯, ৩৮৯৮, ৫০৭০, ৬৬৮৯, ৬৯৫৩; মুসলিম ২৩/৪৫ হাঃ ১৯০৭, আহমাদ ১৬৮) ( আধুনিক প্রকাশনী- ১, ইসলামিক ফাউন্ডেশন ১)


                  </p>
                </div>
              </div>
            </div>

            <div className=" p-2">
              <div>
                <div className="row">
                  <div className="col-8">
                    <h4>Suggested</h4>
                  </div>
                  <div className="col-4">
                    <h6 className="text-center pt-2 text-info"> <b>See All</b></h6>
                  </div>
                </div>
              </div>

              <SendFriendRequest />
              <SendFriendRequest />
              <SendFriendRequest />
              <SendFriendRequest />
              <SendFriendRequest />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
