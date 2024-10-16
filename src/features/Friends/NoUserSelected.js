import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { NavLink, useLocation } from 'react-router-dom';
import SmallScreenUnFriendUserCard from './SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard';
import FriendsTabs from './FriendsTabs/FriendsTabs';
import FriendRequestBack from './FriendBack/FriendRequestBack/FriendRequestBack';

export default function NoUserSelected() {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
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
      <div className="d-block d-lg-none main px-0" style={{overflow:'hidden'}}>
        {/* FriendsTabs */}
        <div className="d-block d-lg-none">
          <FriendRequestBack/>
     
        </div>
       

          <div className="mb-5">
            {profiles.map((profile, index) => {
              const isActive = location.pathname === `/friends/requests/${profile.name}`;
              return (
                <NavLink key={index} to={`/friends/requests/${profile.name}`} className="text-decoration-none">
                  <div className="col-12 mb-2 m-0 p-0 w-100">
                   
                    <SmallScreenUnFriendUserCard
                      name={profile.name}
                      handle={profile.handle}
                      image={profile.image}
                      isActive={isActive}
                      type="friend_request"
                    />
                  </div>
                </NavLink>
              );
            })}
          </div>
        
      </div>

      {/* Content for large devices */}
      <div className="d-none d-lg-block border-start border-end" style={{height:'101vh'}}>
        <div style={styles.container} >
          <div style={styles.content}>
            <i className="fas fa-info-circle" style={styles.icon}></i>
            <h5 style={styles.message}>Select people's names to preview their profile.</h5>
          </div>
        </div>
      </div>
    </>
  );
}
