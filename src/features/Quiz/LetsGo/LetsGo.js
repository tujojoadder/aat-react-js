import React from "react";
import "./LetsGo.css"; // Import the custom CSS file
import { useDispatch } from "react-redux";
import { setStorySeen } from "../QuizSlice";

export default function LetsGo() {
  const dispatch = useDispatch();

  const handleLetsGo = () => {
    dispatch(setStorySeen());
  };

  return (
    <div className="letsgo-container ">
      <button className="letsgo-button" onClick={handleLetsGo}>Let's Go</button>
    </div>
  );
}
