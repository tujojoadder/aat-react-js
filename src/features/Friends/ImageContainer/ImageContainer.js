import React, { useEffect, useState } from "react";
import "./ImageContainer.css"; // Ensure you create and import this CSS file

import { useInView } from "react-intersection-observer";
import Spinner from "../../Spinner/Spinner";
import { useGetSpecificUserPhotoQuery } from "../../../services/profileApi";

const ImageContainer = ({ id }) => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (src, alt) => {
    setModalImage({ src, alt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  /* Getting Photo data */
  const [photoPage, setPhotoPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState([]);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);

  // Get reference and visibility state
  const { ref: photoRef, inView: photoInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetch data using dynamic query
  const {
    data: useGetSpecificUserPhotoQueryData,
    isFetching: useGetSpecificUserPhotoQueryIsFetching,
    isError: useGetSpecificUserPhotoQueryIsError,
    isSuccess: useGetSpecificUserPhotoQueryIsSuccess,
  } = useGetSpecificUserPhotoQuery({ photoPage, id });

  if (useGetSpecificUserPhotoQueryIsSuccess) {
    console.log("photo" + useGetSpecificUserPhotoQueryData);
  }

  // Effect to process fetched data
  useEffect(() => {
    if (
      useGetSpecificUserPhotoQueryIsSuccess &&
      useGetSpecificUserPhotoQueryData?.data
    ) {
      if (useGetSpecificUserPhotoQueryData.data.length === 0) {
        setHasMorePhotos(false);
      } else {
        const newPhotos = useGetSpecificUserPhotoQueryData.data.filter(
          (newPost) =>
            !allPhotos.some((post) => post.post_id === newPost.post_id)
        );
        if (newPhotos.length > 0) {
          setAllPhotos((prevPosts) => [...prevPosts, ...newPhotos]);
        }
      }
    }
  }, [useGetSpecificUserPhotoQueryData, useGetSpecificUserPhotoQueryIsSuccess]);

  // Effect to handle infinite scroll logic
  useEffect(() => {
    if (
      photoInView &&
      !useGetSpecificUserPhotoQueryIsFetching &&
      !useGetSpecificUserPhotoQueryIsError &&
      hasMorePhotos &&
      useGetSpecificUserPhotoQueryIsSuccess
    ) {
      setPhotoPage((prevPage) => prevPage + 1);
    }
  }, [
    photoInView,
    useGetSpecificUserPhotoQueryIsFetching,
    useGetSpecificUserPhotoQueryIsError,
    hasMorePhotos,
    useGetSpecificUserPhotoQueryIsSuccess,
  ]);

  return (
    <div className="container py-4" style={{ border: "none" }}>
      <div className="row">
        {allPhotos.map((photo, index) => (
          <div className="col-4 mb-4" key={index}>
            <div className="image-container">
              <img
                src={photo?.image_post?.post_url} // Assuming 'url' is the correct key for the image URL
                className="img-fluid rounded shadow-sm cursor-pointer"
                style={{ height: "115px", width: "100%" }}
                alt={photo.caption || `Photo ${index + 1}`}
                onClick={() =>
                  openModal(photo?.image_post?.post_url, photo.caption)
                }
              />
            </div>
          </div>
        ))}
      </div>
    {/*   //Spinner Scroll */}
      <div
        ref={photoRef}
        className="loading-trigger"
        style={{height:'7vh',minHeight:'40px'}}
      >
        {useGetSpecificUserPhotoQueryIsFetching && <Spinner />}
      </div>
      {/* Modal for Viewing Image */}
      {modalImage && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div
              className="modal-content custom-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-body p-0" style={{ marginTop: "7vh" }}>
                <img
                  src={modalImage.src}
                  className="img-fluid w-100"
                  alt={modalImage.alt}
                  style={{ maxHeight: "75vh", objectFit: "contain" }}
                />
                <div className="d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-dark custom-close-button"
                    onClick={closeModal}
                  >
                    <i className="fas fa-times me-1"></i> Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
