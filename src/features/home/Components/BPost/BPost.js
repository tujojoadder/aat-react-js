import React, { useEffect, useRef, useState } from "react";
import image from "./logo.jpg";
import CommentedImage from "../../../CommentedMedia/CommentedImage/CommentedImage";
import TextComment from "../TextComment/TextComment";
import Comment from "../Comment/Comment/Comment";
import CommentedBothPosts from "../../../CommentedMedia/CommentedBothposts/CommentedBothPosts";

export default function BPost() {
  
  /* comment width */
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 650);
  const [isMid, setIsMid] = useState(
    window.innerWidth > 650 && window.innerWidth <= 1200
  );
  const [isLg, setIsLg] = useState(
    window.innerWidth > 1200 && window.innerWidth <= 1450
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  const updateWidth = () => {
    setIsSmall(window.innerWidth <= 650);
    setIsMid(window.innerWidth > 650 && window.innerWidth <= 1200);
    setIsLg(window.innerWidth > 1200 && window.innerWidth <= 1450);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", handleModalShow);
      modalElement.addEventListener("hidden.bs.modal", handleModalHide);
      return () => {
        modalElement.removeEventListener("shown.bs.modal", handleModalShow);
        modalElement.removeEventListener("hidden.bs.modal", handleModalHide);
      };
    }
  }, []);

  const handleModalShow = () => {
    setIsModalOpen(true);
  };

  const handleModalHide = () => {
    setIsModalOpen(false);
  };

  /* Text */
  const [isExpanded, setIsExpanded] = useState(false);
  const fullText =
    " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum totam quisquam earum architecto neque incidunt modi. Nisi, veritatis. Officia temporibus, sit laborum blanditiis deserunt, illum delectus harum a deleniti hic nobis odit nesciunt. Voluptate culpa molestias magni et beatae quod repellendus. Quas consequuntur quo voluptates? Sapiente cupiditate quae commodi consectetur error enim repudiandae eligendi deserunt voluptatem. Nostrum, maiores! Suscipit pariatur dolore architecto qui ullam provident, explicabo earum animi ad odit illo vitae sit. Tenetur dolorum repudiandae non sequi necessitatibus quibusdam doloremque voluptates pariatur dolore ad ea consequatur, ab atque architecto eligendi est beatae dicta alias debitis? Ratione minima incidunt facilis eius. Illo, rerum repellat excepturi odit quia commodi. Voluptate, omnis. Perspiciatis libero reprehenderit fugit pariatur magni corporis quam odit distinctio amet sit consectetur, maxime ullam iure earum quo tenetur fugiat laborum ut eligendi sunt vero? Atque aliquid error nobis aspernatur sapiente ab, fugiat expedita delectus quibusdam iure illum et aperiam nulla tenetur perspiciatis porro exercitationem eius, ipsam soluta vero odio! Atque quod unde earum veniam dicta. Nostrum, atque consequatur nisi quia at iusto ratione, odio minima voluptate porro quae, quaerat ipsa. Nobis eligendi veniam velit odit rerum blanditiis similique! Aliquid, officia tempore ab velit animi deserunt sapiente aut nostrum quis debitis. Itaque, dolores illo atque rerum eius minima laborum nisi quidem ducimus harum earum excepturi autem pariatur in repudiandae obcaecati exercitationem commodi! Voluptatibus asperiores veritatis, dolor sed sapiente perspiciatis culpa delectus rem impedit vitae exercitationem provident quasi nihil aliquid, tempore consequuntur minima magni nemo minus eaque at ab cum? Excepturi, ducimus nam! Eligendi ipsam voluptates deserunt veniam quis iste, maiores ad quo tenetur maxime sapiente quas est. Laudantium consequuntur accusamus rerum, repudiandae at dolore iusto. Autem adipisci voluptas fugit alias explicabo eligendi repellat doloribus illum ex vel ipsa nostrum inventore temporibus unde cumque fuga, animi quis ipsam impedit consequuntur blanditiis? Blanditiis labore nobis eaque laboriosam, voluptates ipsa sint, quas maiores beatae aperiam, amet laudantium reprehenderit quod tempora esse excepturi itaque. Rem provident laboriosam natus voluptatum aliquid dolorum nisi obcaecati quas quasi aperiam molestias earum beatae velit, sequi illo atque debitis eveniet placeat accusantium! Pariatur autem quaerat cumque sunt illo, voluptatum et architecto, porro dolorum ipsum quidem adipisci eaque recusandae facere neque quibusdam tenetur voluptatem molestias nihil dolor expedita culpa quos. Molestias, laboriosam recusandae autem ab temporibus, adipisci fugit porro voluptate sit veniam at eos minima maxime ratione. Atque totam placeat quas eum nesciunt rerum maxime, doloribus laudantium, quisquam, ipsam quaerat qui! Cumque unde porro quidem quia id accusamus libero. Dolore accusamus commodi aliquid ex nisi quos molestias minima cumque corporis porro? Doloremque id quis autem alias voluptatum nihil corrupti velit impedit incidunt nobis ab error, repellat reprehenderit necessitatibus quasi. Beatae sed ipsam placeat earum tenetur magnam vel cum quis aliquam consequuntur eveniet iusto cumque aperiam, minus in maxime vero nemo! Excepturi sunt recusandae, facilis rerum veniam nam velit facere, sequi, culpa nostrum veritatis! Molestiae fugiat quia illo hic harum illum pariatur minima ad! Tempore neque voluptas labore corporis praesentium ducimus placeat repellat a dolores maxime, ad, blanditiis nihil quo rerum?";
  const previewText = fullText.substring(0, 175);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const [commentsHeight, setCommentsHeight] = useState("80vh"); // Default height for medium devices

  // Function to update the height based on window width
  const updateHeight = () => {
    if (window.innerWidth < 576) {
      setCommentsHeight("72vh"); // Small devices (sm) like mobile phones
    } else {
      setCommentsHeight("81vh"); // Medium devices (md) like tablets and desktops
    }
  };

  // Effect to update height when component mounts and on window resize
  useEffect(() => {
    updateHeight(); // Initial height update

    // Event listener for window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  return (
    <div class="posts ">
      <div class="user-pics">
        <img src={image} alt="user1" />
      </div>
      <div class="user-content-box ">
        <div className="user-names" style={{ marginTop: "2px" }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">Turjo Joadder </h1>
            <p className="user-name m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time me-4" style={{ marginTop: "18px" }}>
            {" "}
            2hrs
          </p>
        </div>
        <div class="user-content  " style={{ marginTop: "-12px" }}>
          <p style={{ margin: "0px" }} className="pb-2">
            {isExpanded ? fullText : previewText}
            {fullText.length > 175 && (
              <span
                onClick={toggleText}
                style={{ color: "blue", cursor: "pointer" }}
              >
                {isExpanded ? " See less" : "... See more"}
              </span>
            )}{" "}
          </p>
          <img
            style={{ Width: "100%", maxHeight: "65vh" }}
            src={image}
            alt="content1"
          />
        </div>
        <div className="content-icons  px-2 ">
          <i
            className=" far fa-heart red  "
            data-bs-toggle="modal"
            data-bs-target="#BPostModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down ps-md-3"> 536</i>

          <i className="ps-md-3 far fa-comment blue "> 1.6k</i>
          <i class="fa-solid fa-chevron-up ps-md-3 pe-4"></i>
        </div>
      </div>

      {/* Modal */}
      <div
        style={{ overflowY: "hidden" }}
        className="modal fade "
        id="BPostModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog ">
          <div className="modal-content ">
          {isModalOpen && (
                <>
                  <div
                    className="comments px-md-4 "
                    style={{
                      height: "100vh",
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    <CommentedBothPosts />
                    <TextComment />
                    <TextComment />
                    <TextComment />
                    <TextComment />
                    <TextComment />
                    <TextComment />
                    {/* Needed */}
                    <div style={{ paddingBottom: "20vh" }}></div>
                  </div>
                  {/* Footer */}
                  <div
                    className="card-footer p-0 m-0"
                    style={{
                      position: "fixed",
                      bottom: "0px",
                      width: isSmall
                        ? "100%"
                        : isMid
                        ? "69.8%"
                        : isLg
                        ? "69.9%"
                        : "44.9%",
                    }}
                  >
                    <Comment />
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
