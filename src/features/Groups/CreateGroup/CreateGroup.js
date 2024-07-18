import React, { useState } from 'react';
import './CreateGroup.css';
import GroupCreateBack from '../GroupBack/GroupCreateBack/GroupCreateBack';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupDetails, setGroupDetails] = useState('');
  const [audience, setAudience] = useState('public');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (

    <div className="create-group main m-0 p-0 mb-5" style={{ backgroundColor: "white",minHeight:'100vh' }}>
    <div className='m-0 p-0'>
      {/* Back button */}
      <GroupCreateBack/>
    <div className="create-group-container main p-3 pb-5 " >
      
      <div className="form-header mt-3 ">
        <h3>Create Group</h3>
        
        
      </div>
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
        <button type="submit" className="form-button mb-5">Create Group</button>
      </form></div>
    </div>
    </div>
    </div>
  );
}
