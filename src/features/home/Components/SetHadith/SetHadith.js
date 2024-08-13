import React, { useState, useEffect } from "react";
import "./SetHadith.css";
import SetHadithContent from "./SetHadithContent";

export default function SetHadith() {
  return (
    <div className="hadith-day-container" style={{ overflowX: "hidden" }}>
      <div className="hadith-day-content">
        <SetHadithContent />
      </div>
    </div>
  );
}
