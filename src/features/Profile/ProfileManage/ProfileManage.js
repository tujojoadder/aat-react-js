
import React, { useState } from 'react';
import './ProfileManage.css';

export default function ProfileManage() {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    bio: ''
  });

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

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
    <div className="profile-update-container container mt-5">
      <h2 className="text-center mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="profileImage" className="form-label">Profile Photo</label>
            <input type="file" className="form-control" id="profileImage" onChange={(e) => handleImageChange(e, setProfileImage)} />
            {profileImage && <img src={profileImage} alt="Profile Preview" className="img-thumbnail mt-2" />}
          </div>
          <div className="col-md-6">
            <label htmlFor="coverImage" className="form-label">Cover Photo</label>
            <input type="file" className="form-control" id="coverImage" onChange={(e) => handleImageChange(e, setCoverImage)} />
            {coverImage && <img src={coverImage} alt="Cover Preview" className="img-thumbnail mt-2" />}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={userInfo.name} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={userInfo.email} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea className="form-control" id="bio" name="bio" rows="3" value={userInfo.bio} onChange={handleInputChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
}
