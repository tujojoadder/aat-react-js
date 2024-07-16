import React, { useState } from 'react';
import image from "./logo.jpg";
import image1 from "./logo1.png";
import './ImageContainer.css'; // Ensure you create and import this CSS file

const ImageContainer = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (src, alt) => {
    setModalImage({ src, alt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="container py-4" style={{ border: 'none' }}>
      <div className="row">
        {[image, image1, image, image1, image, image1, image, image1].map((src, index) => (
          <div className="col-4 mb-4" key={index}>
            <div className="image-container">
              <img
                src={src}
                className="img-fluid rounded shadow-sm cursor-pointer"
                style={{ height: '115px', width: '100%' }}
                alt={`Logo ${index + 1}`}
                onClick={() => openModal(src, `Logo ${index + 1}`)}
              />
            </div>
          </div>
        ))}
      </div>

      {modalImage && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={closeModal}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content custom-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-body p-0" style={{ marginTop: '7vh' }}>
                <img
                  src={modalImage.src}
                  className="img-fluid w-100"
                  alt={modalImage.alt}
                  style={{ maxHeight: '75vh', objectFit: 'contain' }}
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
