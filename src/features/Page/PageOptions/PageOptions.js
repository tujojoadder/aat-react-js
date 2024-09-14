import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  useUpdatePageDetailsMutation, 
  useUpdatePageEmailMutation, 
  useUpdatePageLocationMutation, 
  useUpdatePageNameMutation, 
  useUpdatePagePhoneMutation 
} from "../../../services/pagesApi";
import { setPageUpdate, setToastSuccess } from "../../home/HomeSlice";
import { handleApiError } from "../../handleApiError/handleApiError";

export default function PageOptions({ pageId, pageName, pageDetails, location, phone, email }) {
  const [editField, setEditField] = useState(null);
  const [pageData, setPageData] = useState({
    name: pageName,
    details: pageDetails,
    location,
    phone,
    email,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [updatePageName, { isLoading: isNameLoading }] = useUpdatePageNameMutation();
  const [updatePageDetails, { isLoading: isDetailsLoading }] = useUpdatePageDetailsMutation();
  const [updatePageEmail, { isLoading: isEmailLoading }] = useUpdatePageEmailMutation();
  const [updatePageLocation, { isLoading: isLocationLoading }] = useUpdatePageLocationMutation();
  const [updatePagePhone, { isLoading: isPhoneLoading }] = useUpdatePagePhoneMutation();

  const handleEdit = (field) => setEditField(field);
  const handleCancel = () => setEditField(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPageData({
      ...pageData,
      [name]: value,
    });
  };

  const handleSave = async (field) => {
    try {
      if (field === "name") {
        await updatePageName({ pageId, name: pageData.name }).unwrap();
        dispatch(setToastSuccess({ toastSuccess: "Page name updated successfully" }));
        dispatch(setPageUpdate(pageData.name));
      } else if (field === "details") {
        await updatePageDetails({ pageId, details: pageData.details }).unwrap();
        dispatch(setToastSuccess({ toastSuccess: "Page details updated successfully" }));
        dispatch(setPageUpdate(pageData.details));
      } else if (field === "email") {
        await updatePageEmail({ pageId, email: pageData.email }).unwrap();
        dispatch(setToastSuccess({ toastSuccess: "Page email updated successfully" }));
      } else if (field === "location") {
        await updatePageLocation({ pageId, location: pageData.location }).unwrap();
        dispatch(setToastSuccess({ toastSuccess: "Page location updated successfully" }));
      } else if (field === "phone") {
        await updatePagePhone({ pageId, phone: pageData.phone }).unwrap();
        dispatch(setToastSuccess({ toastSuccess: "Page phone updated successfully" }));
      }
      
      setEditField(null);
      navigate(`/page/${pageId}`);
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  const truncateText = (text, maxLength) => text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <div className="group-options-container mx-2">
      {/* Page Name Section */}
      <div className="group-section card shadow-sm rounded p-4 mb-4 my-3 mt-4">
        <h4 className="mb-4">Page Name</h4>
        {editField === "name" ? (
          <div>
            <input
              type="text"
              className="form-control mb-1"
              name="name"
              value={pageData.name}
              onChange={handleInputChange}
              placeholder="Enter page name"
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary me-2" onClick={() => handleSave("name")} disabled={isNameLoading}>
                {isNameLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-muted">{truncateText(pageData.name, 17)}</p>
            <button className="btn btn-outline-primary" onClick={() => handleEdit("name")}>Edit</button>
          </div>
        )}
      </div>

      {/* Page Details Section */}
      <div className="group-section card shadow-sm rounded p-4 mb-4 mt-4">
        <h4 className="mb-4">Page Details</h4>
        {editField === "details" ? (
          <div>
            <textarea
              className="form-control mb-3"
              name="details"
              value={pageData.details}
              onChange={handleInputChange}
              placeholder="Enter page details"
              rows="4"
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary me-2" onClick={() => handleSave("details")} disabled={isDetailsLoading}>
                {isDetailsLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-muted">{truncateText(pageData.details, 17)}</p>
            <button className="btn btn-outline-primary" onClick={() => handleEdit("details")}>Edit</button>
          </div>
        )}
      </div>

      {/* Page Email Section */}
      <div className="group-section card shadow-sm rounded p-4 mb-4 mt-4">
        <h4 className="mb-4">Page Email</h4>
        {editField === "email" ? (
          <div>
            <input
              type="email"
              className="form-control mb-1"
              name="email"
              value={pageData.email}
              onChange={handleInputChange}
              placeholder="Enter page email"
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary me-2" onClick={() => handleSave("email")} disabled={isEmailLoading}>
                {isEmailLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-muted">{pageData.email ? truncateText(pageData.email, 20) : 'Set Email'}</p>
            <button className="btn btn-outline-primary" onClick={() => handleEdit("email")}>Edit</button>
          </div>
        )}
      </div>

      {/* Page Location Section */}
      <div className="group-section card shadow-sm rounded p-4 mb-4 mt-4">
        <h4 className="mb-4">Page Location</h4>
        {editField === "location" ? (
          <div>
            <input
              type="text"
              className="form-control mb-1"
              name="location"
              value={pageData.location}
              onChange={handleInputChange}
              placeholder="Enter page location"
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary me-2" onClick={() => handleSave("location")} disabled={isLocationLoading}>
                {isLocationLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-muted">{pageData.location ? truncateText(pageData.location, 20) : 'Set Location'}</p>
            <button className="btn btn-outline-primary" onClick={() => handleEdit("location")}>Edit</button>
          </div>
        )}
      </div>

      {/* Page Phone Section */}
      <div className="group-section card shadow-sm rounded p-4 mb-4 mt-4">
        <h4 className="mb-4">Page Phone</h4>
        {editField === "phone" ? (
          <div>
            <input
              type="tel"
              className="form-control mb-1"
              name="phone"
              value={pageData.phone}
              onChange={handleInputChange}
              placeholder="Enter page phone number"
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary me-2" onClick={() => handleSave("phone")} disabled={isPhoneLoading}>
                {isPhoneLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-muted">{pageData.phone ? truncateText(pageData.phone, 15) : 'Set Phone Number'}</p>
            <button className="btn btn-outline-primary" onClick={() => handleEdit("phone")}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}
