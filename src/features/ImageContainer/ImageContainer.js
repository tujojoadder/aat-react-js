import React from 'react';
import image from "./logo.jpg";
import image1 from "./logo1.png";

const imageStyle = {
  width: '100%',
  height: '100px', // Ensures the image fills the container height
  objectFit: 'cover', // Keeps the aspect ratio and covers the entire container
};

const ImageContainer = () => {
  return (
    <div className="container">
      <div className="row no-gutters">
        {/* Large and Medium Screens */}
        <div className="col-4">
          <div className="image-container">
            <img src={image} style={imageStyle} alt="Logo 1" />
          </div>
        </div>
        <div className="col-4">
          <div className="image-container">
            <img src={image1} style={imageStyle} alt="Logo 2" />
          </div>
        </div><div className="col-4">
          <div className="image-container">
            <img src={image} style={imageStyle} alt="Logo 4" />
          </div>
        </div><div className="col-4">
          <div className="image-container">
            <img src={image} style={imageStyle} alt="Logo 4" />
          </div>
        </div>
        <div className="col-4">
          <div className="image-container">
            <img src={image} style={imageStyle} alt="Logo 3" />
          </div>
        </div><div className="col-4">
          <div className="image-container">
            <img src={image} style={imageStyle} alt="Logo 4" />
          </div>
        </div><div className="col-4">
          <div className="image-container">
            <img src={image} style={imageStyle} alt="Logo 4" />
          </div>
        </div><div className="col-4">
          <div className="image-container">
            <img src={image} style={imageStyle} alt="Logo 4" />
          </div>
        </div>
        <div className="col-4">
          <div className="image-container">
            <img src={image} style={imageStyle} alt="Logo 4" />
          </div>
        </div><div className="col-4">
          <div className="image-container">
            <img src={image} style={imageStyle} alt="Logo 4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageContainer;
