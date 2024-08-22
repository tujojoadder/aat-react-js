import React, { useState } from 'react';
import './ProfileManage.css';
import ProfileHomeBack from '../ProfileHomeBack/ProfileHomeBack';
import { useSaveAboutMutation } from '../../../services/profileApi';
import { useDispatch } from 'react-redux';
import { setToastSuccess } from '../../home/HomeSlice';
import { handleApiError } from '../../handleApiError/handleApiError';

export default function ProfileManage() {

  const dispatch = useDispatch();

  // State for managing profile data
  const [about, setAbout] = useState({
    location: 'City, Country',
    relationshipStatus: 'Single',
    work: 'Job Title at Company',
    education: 'Degree/Field of Study at University',
  });

  // State for handling edit mode
  const [editMode, setEditMode] = useState(false);
  
  const [saveProfile, { isLoading, error }] = useSaveAboutMutation();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };




const handleSave = async (e) => {
  e.preventDefault();
  try {
    const res =  await saveProfile(about).unwrap();
    if (res.data) {
      dispatch(setToastSuccess({ toastSuccess: "About info updated sucessfully" }));
    } else if (res.error) {
      handleApiError(res.error, dispatch);
    }
  } catch (error) {
    handleApiError(error, dispatch);
  }
};



  return (
    <div className="friend-home main border-left border-right m-0 p-0" style={{ backgroundColor: "white", minHeight: '100vh', overflow: 'hidden' }}>
      <ProfileHomeBack />
      <div className="container pt-4">
        <h4 className="text-center">Manage Your About Info</h4>
        <div className="p-4">
          <div className="row">
            {/* Location */}
            <div className="col-12 mb-3">
              <label className="form-label">
                <i className="fas fa-map-marker-alt me-2"></i> Location
              </label>
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={about.location}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{about.location}</p>
              )}
            </div>
            {/* Relationship Status */}
            <div className="col-12 mb-3">
              <label className="form-label">
                <i className="fas fa-heart me-2"></i> Relationship Status
              </label>
              {editMode ? (
                <select
                  className="form-select"
                  name="relationshipStatus"
                  value={about.relationshipStatus}
                  onChange={handleInputChange}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              ) : (
                <p>{about.relationshipStatus}</p>
              )}
            </div>
            {/* Work */}
            <div className="col-12 mb-3">
              <label className="form-label">
                <i className="fas fa-briefcase me-2"></i> Work
              </label>
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="work"
                  value={about.work}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{about.work}</p>
              )}
            </div>
            {/* Education */}
            <div className="col-12 mb-3">
              <label className="form-label">
                <i className="fas fa-graduation-cap me-2"></i> Education
              </label>
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="education"
                  value={about.education}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{about.education}</p>
              )}
            </div>
          </div>
          {/* Edit/Save Button */}
          <div className="text-center">
            {editMode ? (
              <button className="btn btn-success" onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={toggleEditMode}>
                Edit Profile
              </button>
            )}
            {error && <p className="text-danger">Failed to save About info: {error.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
