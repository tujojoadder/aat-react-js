import React, { useState } from 'react';
import image from "./logo.jpg";
import image1 from "./logo1.png";

const ImageContainer = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (src, alt) => {
    setModalImage({ src, alt });
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');

      // Create and add backdrop
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  };

  const closeModal = () => {
    setModalImage(null);
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');

      // Remove backdrop
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        document.body.removeChild(backdrop);
      }
    }
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

      {/* Bootstrap Modal */}
      <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content " style={{ border: 'none' }}>
            <div className="modal-body p-0" style={{marginTop:'7vh'}}>
              {modalImage && (
                <>
                  <img src={modalImage.src} className="img-fluid w-100" alt={modalImage.alt} style={{ maxHeight: '75vh', objectFit: 'contain' }} />
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={closeModal}
                    >
                      <i className="fas fa-times me-1"></i> Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
