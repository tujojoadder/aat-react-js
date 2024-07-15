import React, { useState } from 'react';
import './ProfileManage.css';

export default function ProfileManage() {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    relationshipStatus: '',
    gender: '',
    birthdate: '',
    work: '',
    education: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Profile Updated:', profileImage, coverImage, userInfo);
  };

  return (
    <div className="friend-home main  mb-5" style={{ backgroundColor: "white",minHeight:'100vh' }}>
    <div className="profile-update-container container mt-5 ">
      <h2 className="text-center mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="profileImage" className="form-label">Profile Photo</label>
            <select className="form-select" id="profileImage" onChange={(e) => setProfileImage(e.target.value)}>
              <option value="">Select Profile Photo</option>
              <option value="photo1.jpg">Photo 1</option>
              <option value="photo2.jpg">Photo 2</option>
              <option value="photo3.jpg">Photo 3</option>
            </select>
            {profileImage && <img src={`/images/${profileImage}`} alt="Profile Preview" className="img-thumbnail mt-2" />}
          </div>
          <div className="col-md-6">
            <label htmlFor="coverImage" className="form-label">Cover Photo</label>
            <select className="form-select" id="coverImage" onChange={(e) => setCoverImage(e.target.value)}>
              <option value="">Select Cover Photo</option>
              <option value="cover1.jpg">Cover 1</option>
              <option value="cover2.jpg">Cover 2</option>
              <option value="cover3.jpg">Cover 3</option>
            </select>
            {coverImage && <img src={`/images/${coverImage}`} alt="Cover Preview" className="img-thumbnail mt-2" />}
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
    </div>
  );
}
