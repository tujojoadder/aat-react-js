
import React, { useState } from 'react';
import './CreateIChannel.css';
import IChannelCreateBack from '../iChannelBack/iChannelCreateBack/IChannelCreateBack';

export default function CreateIChannel() {
  const [iChannel, setIChannel] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (

    <div className=" main pb-5 m-0 p-0  mb-5  border-start" style={{height:'100vh'}}>
      <IChannelCreateBack/>
     <div className="body mt-5 pt-5 p-2">
     <div className="form-header mt-3">
        <h3>Create a iCahnnel</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">

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
    </div>
  
  );
}
