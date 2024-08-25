import React, { useEffect, useState } from "react";
import { useGetCoverPhotosQuery, useSetCoverPhotoMutation } from '../../../services/profileApi'
import { useInView } from "react-intersection-observer";
import Spinner from "../../Spinner/Spinner";
import { useDispatch } from "react-redux";
import { handleApiError } from "../../handleApiError/handleApiError";
import { setCover_photo, setToastSuccess } from "../../home/HomeSlice";
import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";
import LargeScreenBack from "../../LargeScreenBack/LargeScreenBack";
export default function SetCoverPhoto() {

  const dispatch = useDispatch();
  const [modalImage, setModalImage] = useState(null);
  const [photoPage, setPhotoPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState([]);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);

  const { ref: photoRef, inView: photoInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });



  const {
    data: useGetSpecificUserPhotoQueryData,
    isFetching: useGetSpecificUserPhotoQueryIsFetching,
    isError: useGetSpecificUserPhotoQueryIsError,
    isSuccess: useGetSpecificUserPhotoQueryIsSuccess,
  } = useGetCoverPhotosQuery({ photoPage });




  
  const [setCoverPhoto, { isLoading: isSettingCoverPhoto,isSuccess:isSuccessCoverPhoto }] = useSetCoverPhotoMutation();

 
  const openModal = (src, alt, id) => {
    setModalImage({ src, alt, id }); // Include id in the modalImage state
  };

  const closeModal = () => {
    setModalImage(null);
  };

  

const handleSetCoverPhoto = async (e) => {
  e.preventDefault();
  try {
    const res = await setCoverPhoto({ image_id: modalImage.id }).unwrap();
    if (res.data) {
    //set cureent cover photo
      dispatch(setCover_photo({ cover_photo: res.data.image_url }));
      //show message
     dispatch(setToastSuccess({ toastSuccess:'CoverPhoto successfully changed ' }));
     //close Modal
     setModalImage(null);
    } else if (res.error) {
      handleApiError(res.error, dispatch);
    }
  } catch (error) {
    handleApiError(error, dispatch);
  }
};





  useEffect(() => {
    if (useGetSpecificUserPhotoQueryIsSuccess && useGetSpecificUserPhotoQueryData?.data) {
      if (useGetSpecificUserPhotoQueryData.data.length === 0) {
        setHasMorePhotos(false);
      } else {
        const newPhotos = useGetSpecificUserPhotoQueryData.data.filter(
          (newPost) => !allPhotos.some((post) => post.cover_photo_id === newPost.cover_photo_id)
        );
        if (newPhotos.length > 0) {
          setAllPhotos((prevPosts) => [...prevPosts, ...newPhotos]);
        }
      }
    }
  }, [useGetSpecificUserPhotoQueryData, useGetSpecificUserPhotoQueryIsSuccess]);

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
    <div className="friend-home main border-left border-right m-0 p-0" style={{ backgroundColor: "white", minHeight: "100vh" }}>
          {/* Back button */}
          <SmallScreenBack text='Set your Cover photo' />
     <LargeScreenBack text='Set your Cover photo' />

     
     
      <div className="container py-4" style={{ border: "none" }}>
        <div className="row">
          {allPhotos.length === 0 && !useGetSpecificUserPhotoQueryIsFetching && (
            <h4 className="text-center" style={{ color: "#592529" }}>
              No Photos to show
            </h4>
          )}
          {allPhotos.map((photo, index) => (
            <div className="col-12 mb-4" key={index}>
              <div className="image-container">
                <img
                  src={photo?.image_url}
                  className="img-fluid rounded shadow-sm cursor-pointer"
                  style={{ height: "200px", width: "100%" }}
                  alt={photo.caption || `Photo ${index + 1}`}
                  onClick={() => openModal(photo?.image_url, photo.caption, photo.cover_photo_id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          ref={photoRef}
          className="loading-trigger"
          style={{ height: "7vh", minHeight: "40px" }}
        >
          {useGetSpecificUserPhotoQueryIsFetching && <Spinner />}
        </div>
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
                    
                    {/* //close button */}
                    <button
                      type="button"
                      className="btn btn-outline-dark me-2"
                      onClick={closeModal}
                    >
                      <i className="fas fa-times me-1"></i> Close
                    </button>

                    {/* Set Cover photo button */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSetCoverPhoto}
                      disabled={isSettingCoverPhoto}
                    >
                      {isSettingCoverPhoto ? (
                        <>
                          <i className="fas fa-spinner fa-spin me-1"></i> Setting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check me-1"></i> Set as Cover Photo
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
    </div>
  );
}
