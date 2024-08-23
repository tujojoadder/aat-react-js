import React, { useState } from "react";
import { useSaveAboutMutation, useUpdateBirthdateMutation, useUpdateGenderMutation } from "../../../services/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { setToastSuccess } from "../../home/HomeSlice";
import { handleApiError } from "../../handleApiError/handleApiError";

export default function ProfileManage() {

  const birthdate = useSelector((state) => state.home.birthdate);
  const currentGender = useSelector((state) => state.home.gender);


  const [birthday, setBirthday] = useState(() => {
    if (birthdate) {
      const [year, month, day] = birthdate.split("-");
      return {
        birthdate_year: year,
        birthdate_month: month,
        birthdate_day: day,
      };
    }
    return {
      birthdate_year: "",
      birthdate_month: "",
      birthdate_day: "",
    };
  });





  const dispatch = useDispatch();

  // State management
  const [about, setAbout] = useState({
    location: "City, Country",
    relationshipStatus: "Single",
    work: "Job Title at Company",
    education: "Degree/Field of Study at University",
  });



  const [gender, setGender] = useState(currentGender);

  const [editAbout, setEditAbout] = useState(false);
  const [editBirthday, setEditBirthday] = useState(false);
  const [editGender, setEditGender] = useState(false);

  const [saveAbout, { isLoading, error }] = useSaveAboutMutation();
  const [updateBirthdate, { isLoading: UpdateBirthdateMutationLoading, error: UpdateBirthdateMutationError }] = useUpdateBirthdateMutation();
  const [updateGender, { isLoading: isSavingGender }] = useUpdateGenderMutation();

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  const handleBirthdayChange = (e) => {
    const { name, value } = e.target;
    setBirthday({ ...birthday, [name]: value });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAboutSave = async () => {
    try {
      const res = await saveAbout(about).unwrap();
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: `About info updated successfully` }));
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
      const res = await updateBirthdate(birthday);
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: `Birthdate updated successfully` }));
        setEditBirthday(false);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  const handleGenderSave = async () => {
    try {
      const res = await updateGender({ gender }).unwrap();
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: "Gender updated successfully" }));
        setEditGender(false);
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
    <div className="container py-4 main mx-0 p-0">
      <h2 className="text-center mb-4">Manage Your Profile</h2>
      <div className="card shadow-sm rounded p-4 mb-4">
        <div className="d-flex  justify-content-between align-items-center">
          <h3>About </h3>

         
          {editAbout ? (
            <div>
              <button className="btn btn-success me-2" onClick={handleAboutSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={() => handleCancel("About")}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => handleEdit("About")}>
              Edit
            </button>
          )}
        </div>
        <hr />
        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-map-marker-alt me-2"></i>Location
          </label>
          {editAbout ? (
            <input
              type="text"
              className="form-control"
              name="location"
              value={about.location}
              onChange={handleInputChange}
              placeholder="Enter your location"
            />
          ) : (
            <p>{about.location}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-heart me-2"></i>Relationship Status
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
        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-briefcase me-2"></i>Work
          </label>
          {editAbout ? (
            <input
              type="text"
              className="form-control"
              name="work"
              value={about.work}
              onChange={handleInputChange}
              placeholder="Enter your job title and company"
            />
          ) : (
            <p>{about.work}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-graduation-cap me-2"></i>Education
          </label>
          {editAbout ? (
            <input
              type="text"
              className="form-control"
              name="education"
              value={about.education}
              onChange={handleInputChange}
              placeholder="Enter your degree and field of study"
            />
          ) : (
            <p>{about.education}</p>
          )}
        </div>
      </div>

      <div className="card shadow-sm rounded p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 >Birthdate</h5>
          {editBirthday ? (
            <div>
              <button className="btn btn-success me-2" onClick={handleBirthdaySave} disabled={UpdateBirthdateMutationLoading}>
                {UpdateBirthdateMutationLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={() => handleCancel("Birthday")}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => handleEdit("Birthday")}>
              Edit
            </button>
          )}
        </div>
        <hr />
        {editBirthday ? (
          <div className="row">
            <div className="col-md-4">
              <select
                name="birthdate_year"
                className="form-select"
                value={birthday.birthdate_year}
                onChange={handleBirthdayChange}
                required
              >
                <option value="" disabled>Year</option>
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                name="birthdate_month"
                className="form-select"
                value={birthday.birthdate_month}
                onChange={handleBirthdayChange}
                required
              >
                <option value="" disabled>Month</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                name="birthdate_day"
                className="form-select"
                value={birthday.birthdate_day}
                onChange={handleBirthdayChange}
                required
              >
                <option value="" disabled>Day</option>
                {populateDays()}
              </select>
            </div>
          </div>
        ) : (
          <p>{birthday.birthdate_day}/{birthday.birthdate_month}/{birthday.birthdate_year}</p>
        )}
      </div>

      <div className="card shadow-sm rounded p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Gender</h5>
          {editGender ? (
            <div>
              <button className="btn btn-success me-2" onClick={handleGenderSave} disabled={isSavingGender}>
                {isSavingGender ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={() => handleCancel("Gender")}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => handleEdit("Gender")}>
              Edit
            </button>
          )}
        </div>
        <hr />
        {editGender ? (
          <select className="form-select" value={gender} onChange={handleGenderChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
<p>{gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()}</p>
    )}
      </div>
    </div>
  );
}
