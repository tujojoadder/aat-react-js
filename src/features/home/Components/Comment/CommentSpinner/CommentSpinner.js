import React from "react";

const CommentSpinner = ({ size = "50px", color = "#007bff", marginTop = "10px" }) => {
  const spinnerStyle = {
    display: "block", // Make it a block element for proper centering
    width: size,
    height: size,
    margin: `${marginTop} auto 0`, // Center horizontally and add top margin
    border: `5px solid #f3f3f3`, // Light grey
    borderTop: `5px solid ${color}`, // Custom color for the top
    borderRadius: "50%", // Circular shape
    animation: "spin 1s linear infinite", // Animation
  };

  return <div style={spinnerStyle} />;
};

// CSS animation as a string for the @keyframes
const spinnerAnimation = `
@keyframes spin {
  0% {
    transform: rotate(0deg); /* Start position */
  }
  100% {
    transform: rotate(360deg); /* End position */
  }
}`;

// Create a style element and append to the head for the animation
const styleElement = document.createElement("style");
styleElement.textContent = spinnerAnimation;
document.head.appendChild(styleElement);

export default CommentSpinner;
