
import React, { useState } from 'react';
import './CreateIChannel.css';

export default function CreateIChannel() {
  const [iChannel, setIChannel] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="create-group-container main pb-5 mt-3">
      <div className="form-header mt-3">
        <h3>Create iChannel</h3>
        
        
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="iChannel">iChannel Name</label>
          <input
            type="text"
            id="iChannel"
            value={iChannel}
            onChange={(e) => setIChannel(e.target.value)}
            placeholder="Enter the iChannel name"
            required
          />
        </div>
        
        <button type="submit" className="form-button">Create iChannel</button>
      </form>
    </div>
  );
}
