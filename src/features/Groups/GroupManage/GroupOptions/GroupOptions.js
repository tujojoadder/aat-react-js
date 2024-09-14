import React, { useState } from "react";
import {
  useUpdateGroupNameMutation,
  useUpdateGroupDetailsMutation,
} from "../../../../services/groupsApi";
import "./GroupOptions.css"; // Import the CSS file for styling
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setGroupUpdate, setToastSuccess } from "../../../home/HomeSlice";
import { handleApiError } from "../../../handleApiError/handleApiError";

export default function GroupOptions({ groupId, groupName, groupDetails }) {
  const [editField, setEditField] = useState(null);
  const [groupData, setGroupData] = useState({
    name: groupName,
    details: groupDetails,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    updateGroupName,
    {
      isLoading: isNameLoading,
      isError: isNameError,
      isSuccess: isNameSuccess,
    },
  ] = useUpdateGroupNameMutation();
  const [
    updateGroupDetails,
    {
      isLoading: isDetailsLoading,
      isError: isDetailsError,
      isSuccess: isDetailsSuccess,
    },
  ] = useUpdateGroupDetailsMutation();

  const handleEdit = (field) => setEditField(field);
  const handleCancel = () => setEditField(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData({
      ...groupData,
      [name]: value,
    });
  };

  const handleSave = async (field) => {
    if (field === "name") {
      try {
        await updateGroupName({ groupId, name: groupData.name }).unwrap();
        setEditField(null);
        
        dispatch(
          setToastSuccess({ toastSuccess: "Group name updated successfully" })
        );
        // Set groupUpdate to true after successful update
        dispatch(setGroupUpdate(groupData.name));
     navigate(`/groups/${groupId}`);
      } catch (err) {
        handleApiError(err, dispatch);
      }
    } else if (field === "details") {
      try {
        await updateGroupDetails({
          groupId,
          details: groupData.details,
        }).unwrap();
        setEditField(null);
        
        dispatch(
          setToastSuccess({
            toastSuccess: "Group details updated successfully",
          })
        );
        // Set groupUpdate to true after successful update
        dispatch(setGroupUpdate(groupData.details));
        navigate(`/groups/${groupId}`);
      } catch (err) {
      handleApiError(err,dispatch)
      }
    }
  };

  // Utility function to truncate text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="group-options-container">
      {/* Group Name Section */}
      <div className="group-section card shadow-sm rounded p-4 mb-4 my-3 mt-4">
        <h4 className="mb-4">Group Name</h4>
        {editField === "name" ? (
          <div>
            <input
              type="text"
              className="form-control mb-1"
              name="name"
              value={groupData.name}
              onChange={handleInputChange}
              placeholder="Enter group name"
            />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary me-2"
                onClick={() => handleSave("name")}
                disabled={isNameLoading}
              >
                {isNameLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            {isNameError && (
              <p className="text-danger mt-2">Failed to save group name</p>
            )}
            {isNameSuccess && (
              <p className="text-success mt-2">
                Group name updated successfully
              </p>
            )}
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-muted">
              {truncateText(groupData.name, 17)}
            </p>
            <button
              className="btn btn-outline-primary"
              onClick={() => handleEdit("name")}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Group Details Section */}
      <div className="group-section card shadow-sm rounded p-4 mb-4 mt-4">
        <h4 className="mb-4">Group Details</h4>
        {editField === "details" ? (
          <div>
            <textarea
              className="form-control mb-3"
              name="details"
              value={groupData.details}
              onChange={handleInputChange}
              placeholder="Enter group details"
              rows="4"
            />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary me-2"
                onClick={() => handleSave("details")}
                disabled={isDetailsLoading}
              >
                {isDetailsLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            {isDetailsError && (
              <p className="text-danger mt-2">Failed to save group details</p>
            )}
            {isDetailsSuccess && (
              <p className="text-success mt-2">
                Group details updated successfully
              </p>
            )}
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-muted">
              {truncateText(groupData.details, 17)}
            </p>
            <button
              className="btn btn-outline-primary"
              onClick={() => handleEdit("details")}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
