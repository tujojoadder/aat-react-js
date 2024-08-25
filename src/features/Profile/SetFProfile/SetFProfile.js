import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "../../Spinner/Spinner";
import { useGetFProfilePhotosQuery, useSetFProfileMutation } from "../../../services/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { handleApiError } from "../../handleApiError/handleApiError";
import { setProfile_picture, setToastSuccess } from "../../home/HomeSlice";

export default function SetFProfile() {
const dispatch = useDispatch();

const [
  SetFProfileMutation,
  {
    isSuccess: useSetFProfileMutationSucess,
    isLoading: useSetFProfileMutationLoading,
    isError: useSetFProfileMutationError,
  isFetching: useSetFProfileMutationisFetching,
  refetch: useSetFProfileMutationrefetch,
  },
] = useSetFProfileMutation();


  /*    handleSetFProfile */
  const handleSetFProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await SetFProfileMutation({
        image_id: modalImage.id,
      }).unwrap();
      if (res.data) {
        dispatch(
          setToastSuccess({
            toastSuccess: "Profile Picture updated Successfully",
          })
        );
        //set cureent cover photo
        dispatch(setProfile_picture({ profile_picture: res.data.image_url }));
        //show message

        //close Modal
        setModalImage(null);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };


  const [modalImage, setModalImage] = useState(null);
  const openModal = (src, alt,id) => {
    setModalImage({ src, alt,id });
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
  } = useGetFProfilePhotosQuery({ photoPage });

  if (useGetSpecificUserPhotoQueryIsSuccess) {
    console.log(useGetSpecificUserPhotoQueryData);
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
            !allPhotos.some(
              (post) => post.profile_picture_id === newPost.profile_picture_id
            )
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
        {allPhotos.length === 0 && !useGetSpecificUserPhotoQueryIsFetching && (
          <h4 className="text-center" style={{ color: "#592529" }}>
            No Photos to show
          </h4>
        )}
        {allPhotos.map((photo, index) => (
          <div className="col-6 col-md-4 mb-4" key={index}>
            {" "}
            {/* Update col class here */}
            <div className="image-container">
              <img
                src={photo?.image_url} // Assuming 'url' is the correct key for the image URL
                className="img-fluid rounded shadow-sm cursor-pointer"
                style={{ height: "260px", width: "100%" }}
                alt={photo.caption || `Photo ${index + 1}`}
                onClick={() => openModal(  photo?.image_url,
                  photo?.caption,
                  photo?.profile_picture_id)}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Spinner Scroll */}
      <div
        ref={photoRef}
        className="loading-trigger"
        style={{ height: "7vh", minHeight: "40px" }}
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
                 
                {/*  Close button */}
                  <button
                    type="button"
                    className="btn btn-outline-dark custom-close-button"
                    onClick={closeModal}
                  >
                    <i className="fas fa-times me-1"></i> Close
                  </button>


{/* Set FProfile picture button */}
<button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSetFProfile}
                    disabled={useSetFProfileMutationLoading}
                  >
                    {useSetFProfileMutationLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-1"></i>{" "}
                        Setting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check me-1"></i> Set as profile
                        Picture
                      </>
                    )}
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
}
