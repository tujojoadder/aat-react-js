
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../handleApiError/handleApiError";
import { useUpdatIAccountNameMutation } from "../../../services/iaccountsApi";
import { setToastSuccess } from "../../home/HomeSlice";

export default function IChannelOptions({ iChannelId, iChannelName }) {
  const [editField, setEditField] = useState(null);
  const [ichannelData, setichannelData] = useState({
    name: iChannelName,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    updateiChannelName,
    {
      isLoading: isNameLoading,
      isError: isNameError,
      isSuccess: isNameSuccess,
    },
  ] = useUpdatIAccountNameMutation();

  const handleEdit = (field) => setEditField(field);
  const handleCancel = () => setEditField(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setichannelData({
      ...ichannelData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await updateiChannelName({ iChannelId, name: ichannelData.name }).unwrap();
      setEditField(null);

      dispatch(
        setToastSuccess({ toastSuccess: "iChannel name updated successfully" })
      );

      navigate(`/ichannel/${iChannelId}`);
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  // Utility function to truncate text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="group-options-container mx-2 ">
      {/* Group Name Section */}
      <div className="group-section card shadow-sm rounded p-4 mb-4 my-3 mt-4">
        <h4 className="mb-4">iChannel Name</h4>
        {editField === "name" ? (
          <div>
            <input
              type="text"
              className="form-control mb-1"
              name="name"
              value={ichannelData.name}
              onChange={handleInputChange}
              placeholder="Enter group name"
            />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary me-2"
                onClick={handleSave}
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
              {truncateText(ichannelData.name, 17)}
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
    </div>
  );
}
