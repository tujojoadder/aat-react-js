import React, { useState } from 'react';
import './CreateGroup.css';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupDetails, setGroupDetails] = useState('');
  const [audience, setAudience] = useState('public');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="create-group-container main " style={{marginBottom:'20vh'}}>
      <div className="form-header mt-3">
        <h3>Create Group</h3>
        
        
      </div>
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
                Public: Anyone can see the group. Private: Only members can see the group.
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
        <button type="submit" className="form-button">Create Group</button>
      </form>
    </div>
  );
}
