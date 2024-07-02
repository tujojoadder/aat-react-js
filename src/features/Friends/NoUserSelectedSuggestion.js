
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { NavLink, useLocation } from 'react-router-dom';
import SendFriendRequest from '../home/Components/SendFriendRequest/SendFriendRequest';
import FriendsTabs from './FriendsTabs/FriendsTabs';

export default function NoUserSelectedSuggestion() {
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

  const profiles = [
    {
        name: 'MarkfdRockwell',
        handle: '@mark_rockwell',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JanedfbDoe',
        handle: '@jane_doe',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JohnfSmith',
        handle: '@john_smith',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },{
        name: 'MarkfdRockwell',
        handle: '@mark_rockwell',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JanedfbDoe',
        handle: '@jane_doe',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JohnfSmith',
        handle: '@john_smith',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },{
        name: 'MarkfdRockwell',
        handle: '@mark_rockwell',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JanedfbDoe',
        handle: '@jane_doe',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JohnfSmith',
        handle: '@john_smith',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },{
        name: 'MarkfdRockwell',
        handle: '@mark_rockwell',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JanedfbDoe',
        handle: '@jane_doe',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JohnfSmith',
        handle: '@john_smith',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },{
        name: 'MarkfdRockwell',
        handle: '@mark_rockwell',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JanedfbDoe',
        handle: '@jane_doe',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
      {
        name: 'JohnfSmith',
        handle: '@john_smith',
        image: 'https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg',
      },
  ];

  const location = useLocation();

  return (
    <>
      {/* Content for small and medium devices */}
      <div className="d-block d-lg-none main px-0 " >
 {/* FriendsTabs */}
 <div className="d-block d-lg-none">
          <FriendsTabs />
        </div>
            <h5 className="ms-3">Friend Suggestions</h5>
              <div className="mb-5 " >
                {profiles.map((profile, index) => {
                  const isActive = location.pathname === `/friends/suggestions/${profile.name}`;
                  return (
                    <NavLink
                      key={index}
                      to={`/friends/suggestions/${profile.name}`}
                      className="text-decoration-none"
                      
                    >
                      <div className="col-12 mb-2 p-0 " >
                        <SendFriendRequest
                          name={profile.name}
                          handle={profile.handle}
                          image={profile.image}
                          isActive={isActive}
                         
                        />
                      </div>
                    </NavLink>
                  );
                })}
              </div>

      </div>

      {/* Content for large devices */}
      <div className="d-none d-lg-block">
        <div style={styles.container} className="border">
          <div style={styles.content}>
            <i className="fas fa-info-circle" style={styles.icon}></i>
            <h5 style={styles.message}>Select people's names to preview their profile.</h5>
          </div>
        </div>
      </div>
    </>
  );
}
