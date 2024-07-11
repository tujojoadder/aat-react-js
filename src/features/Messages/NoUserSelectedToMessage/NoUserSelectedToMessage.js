
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { NavLink, useLocation } from 'react-router-dom';
import SmallScreenUnFriendUserCard from '../../Friends/SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard';

export default function NoUserSelectedToMessage() {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      color: '#555',
      fontFamily: 'Arial, sans-serif',
      position:'fixed',
      width:'42%',
     
      
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    icon: {
      fontSize: '24px',
      color: '#007bff',
      marginBottom: '10px',
    },
    message: {
      margin: '0',
      fontSize: '16px',
    },
  };

 

  return (
    <>
    

      {/* Content for large devices */}
      <div className="d-none d-lg-block " style={{ marginLeft:'-15px',marginRight:'-15px' }}>
        <div style={styles.container} className="border">
          <div style={styles.content}>
            <i className="fa-solid fa-envelope" style={styles.icon}></i>


            <h5 style={styles.message}>Select people's or group's names to sent message.</h5>
          </div>
        </div>
      </div>
    </>
  );
}
