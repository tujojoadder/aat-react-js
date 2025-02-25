import React from "react";

function LockScreen() {
  return (
    <div style={styles.lockScreenContainer}>
      <div style={styles.lockScreenContent}>
        <i className="fas fa-lock" style={styles.lockIcon}></i>
        <h2 style={styles.lockText}>Profile is Locked</h2>
        <p style={styles.lockMessage}>
        This profile is private. You need to be friends to see the content.
        </p>
      </div>
    </div>
  );
}

// Styles
const styles = {
  lockScreenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
    padding: "20px",
    textAlign: "center",
    marginTop:'20px'
  },
  lockScreenContent: {
    maxWidth: "400px",
  },
  lockIcon: {
    fontSize: "48px",
    color: "#6c757d", // Gray color for the lock icon
    marginBottom: "16px",
  },
  lockText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#343a40", // Dark text color
    marginBottom: "8px",
  },
  lockMessage: {
    fontSize: "16px",
    color: "#6c757d", // Gray text color
  },
};

export default LockScreen;