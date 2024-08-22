import React, { useState } from "react";
import "./ProfileManage.css";
import ProfileHomeBack from "../ProfileHomeBack/ProfileHomeBack";
import { useSaveAboutMutation, useUpdateBirthdateMutation } from "../../../services/profileApi";
import { useDispatch } from "react-redux";
import { setToastSuccess } from "../../home/HomeSlice";
import { handleApiError } from "../../handleApiError/handleApiError";

export default function ProfileManage() {




  const dispatch = useDispatch();

  // State for managing profile data
  const [about, setAbout] = useState({
    location: "City, Country",
    relationshipStatus: "Single",
    work: "Job Title at Company",
    education: "Degree/Field of Study at University",
  });

  



  // State for handling birthday
  const [birthday, setBirthday] = useState({
    birthdate_year: "",
    birthdate_month: "",
    birthdate_day: "",
  });

  // State for handling gender
  const [gender, setGender] = useState("Male");

  // State for handling edit modes
  const [editAbout, setEditAbout] = useState(false);
  const [editBirthday, setEditBirthday] = useState(false);
  const [editGender, setEditGender] = useState(false);

  const [saveAbout, { isLoading, error }] = useSaveAboutMutation();


const [
  UpdateBirthdateMutation,
  {
    isSuccess: UpdateBirthdateMutationSucess,
    isLoading: UpdateBirthdateMutationLoading,
    isError: UpdateBirthdateMutationError
  },
] = useUpdateBirthdateMutation();
  
  // Handle input change for about
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  // Handle input change for birthday
  const handleBirthdayChange = (e) => {
    const { name, value } = e.target;
    setBirthday({ ...birthday, [name]: value });
  };

  // Handle input change for gender
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAboutSave = async () => {
    try {
      const res = await saveAbout(about).unwrap();
      if (res.data) {
        dispatch(
          setToastSuccess({ toastSuccess: `About info updated successfully` })
        );
        setEditAbout(false);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };


const handleBirthdaySave = async (e) => {
  e.preventDefault();
  try {
    const res = await UpdateBirthdateMutation(birthday);
    if (res.data) {
      dispatch(
        setToastSuccess({ toastSuccess: `Birthdate updated successfully` })
      );
      setEditBirthday(false);
    } else if (res.error) {
      handleApiError(res.error, dispatch);
    }
  } catch (error) {
    handleApiError(error, dispatch);
  }
};






  const handleCancel = (section) => {
    if (section === "About") {
      setEditAbout(false);
    } else if (section === "Birthday") {
      setEditBirthday(false);
    } else if (section === "Gender") {
      setEditGender(false);
    }
  };

  const handleEdit = (section) => {
    if (section === "About") {
      setEditAbout(true);
    } else if (section === "Birthday") {
      setEditBirthday(true);
    } else if (section === "Gender") {
      setEditGender(true);
    }
  };

  const populateDays = () => {
    const daysInMonth = new Date(
      birthday.birthdate_year,
      birthday.birthdate_month,
      0
    ).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
      <option key={day} value={day}>
        {day}
      </option>
    ));
  };

  return (
    <div
      className="friend-home main border-left border-right m-0 p-0"
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <ProfileHomeBack />
      <div className="container pt-4">
        <h4 className="text-center">Manage Your Profile Info</h4>
        <div className="p-4">
          <div className="row">
            {/* Location */}
            <div className="col-12 mb-3">
              <label className="form-label">
                <i className="fas fa-map-marker-alt me-2"></i> Location
              </label>
              {editAbout ? (
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
              {editAbout ? (
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
              {editAbout ? (
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
              {editAbout ? (
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
            {/* Edit/Save/Cancel Button for About */}
            <div className="text-center">
              {editAbout ? (
                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={handleAboutSave}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save About Info"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleCancel("About")}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit("About")}
                >
                  Edit About Info
                </button>
              )}
              {error && (
                <p className="text-danger">
                  Failed to save About info: {error.message}
                </p>
              )}
            </div>
          </div>

          {/* Birthday */}
          <div className="col-12 mb-3">
            <label className="form-label">
              <i className="fas fa-birthday-cake me-2"></i> Birthdate
            </label>
            {editBirthday ? (
              <div className="row">
                <div className="col-4">
                  <select
                    name="birthdate_year"
                    className="form-control py-0"
                    value={birthday.birthdate_year}
                    onChange={handleBirthdayChange}
                    required
                  >
                    <option value="" disabled>
                      Year
                    </option>
                    {Array.from(
                      { length: 100 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-4">
                  <select
                    name="birthdate_month"
                    className="form-control py-0"
                    value={birthday.birthdate_month}
                    onChange={handleBirthdayChange}
                    required
                  >
                    <option value="" disabled>
                      Month
                    </option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (month) => (
                        <option key={month} value={month}>
                          {new Date(0, month - 1).toLocaleString("en", {
                            month: "short",
                          })}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="col-4">
                  <select
                    name="birthdate_day"
                    className="form-control py-0"
                    value={birthday.birthdate_day}
                    onChange={handleBirthdayChange}
                    required
                  >
                    <option value="" disabled>
                      Day
                    </option>
                    {populateDays()}
                  </select>
                </div>
              </div>
            ) : (
              <p>{`${birthday.birthdate_day}-${birthday.birthdate_month}-${birthday.birthdate_year}`}</p>
            )}
            {/* Edit/Save/Cancel Button for Birthday */}
            <div className="text-center mt-3">
              {editBirthday ? (
                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={handleBirthdaySave}
                    disabled={UpdateBirthdateMutationLoading}
                  >
                    {UpdateBirthdateMutationLoading ? "Saving..." : "Save Birthday"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleCancel("Birthday")}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit("Birthday")}
                >
                  Edit Birthday
                </button>
              )}
            </div>
          </div>

          {/* Gender */}
          
        </div>
      </div>
    </div>
  );
}
