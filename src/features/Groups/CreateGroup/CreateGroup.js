import React, { useState } from "react";
import "./CreateGroup.css";
import GroupCreateBack from "../GroupBack/GroupCreateBack/GroupCreateBack";
import { useCreateGroupMutation } from "../../../services/groupsApi";
import { handleApiError } from "../../handleApiError/handleApiError";
import { setToastSuccess } from "../../home/HomeSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";
import MidScreenBack from "../../SmallScreenBack/MidScreenBack";
import LargeScreenBack from "../../LargeScreenBack/LargeScreenBack";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [groupDetails, setGroupDetails] = useState("");
  const [audience, setAudience] = useState("public");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createGroup, { isLoading, isSuccess, isError }] =
    useCreateGroupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = {
      group_name: groupName,
      group_details: groupDetails,
      audience: audience,
    };

    try {
      // Call the mutation
      await createGroup(formData).unwrap();
      // Handle success
      navigate("/groups/mygroup");
      dispatch(setToastSuccess({ toastSuccess: "Group Created Successfully" }));
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  return (
    <div
      className="friend-home main  m-0 p-0 border-sm-0 border-left border-right "
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      <div className="m-0 p-0 ">
        {/*    Back buttons */}
        <SmallScreenBack text="Create groups" />
        <LargeScreenBack text="Create groups" />
        <div className="sm-back"></div>


        
        <div className="create-group-container main p-3 pb-5">
          <div className="body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="groupName">Group Name</label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter the group name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="groupDetails">Group Details</label>
                <textarea
                  id="groupDetails"
                  value={groupDetails}
                  onChange={(e) => setGroupDetails(e.target.value)}
                  placeholder="Describe the purpose and activities of the group"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="audience">
                  Audience
                  <span className="tooltip">
                    ?
                    <span className="tooltiptext">
                      Public: Anyone can see the group. Private: Only members
                      can see the group.
                    </span>
                  </span>
                </label>
                <select
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  required
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <button
                type="submit"
                className="form-button mb-5"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Group"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
