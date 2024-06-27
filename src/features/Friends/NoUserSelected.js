import React from 'react';

export default function NoUserSelected() {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      color: '#555',
      fontFamily: 'Arial, sans-serif'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
    },
    icon: {
      fontSize: '24px',
      color: '#007bff',
      marginBottom: '10px'
    },
    message: {
      margin: '0',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container} className='border'> 
      <div style={styles.content}>
        <i className="fas fa-info-circle" style={styles.icon}></i>
        <h5 style={styles.message}>Select people's names to preview their profile.</h5>
      </div>
    </div>
  );
}
