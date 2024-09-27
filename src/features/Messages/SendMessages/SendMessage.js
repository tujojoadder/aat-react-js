import React, { useState } from 'react';
import image from "./logo.jpg";
import '../../../style.css';
import { useSelector } from 'react-redux';
import { useSendMessageMutation } from '../../../services/chatsApi';

export default function SendMessage() {
  const receiverID = useSelector((state) => state.home.receiver_id); // Access receiver_id from Redux
  const userProfile = useSelector((state) => state.home.profile_picture); // Access receiver_id from Redux
  const [message, setMessage] = useState(''); // State to store message
  const [sendMessage, { isLoading,isSuccess }] = useSendMessageMutation(); // RTK query mutation hook with loading state

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setMessage(''); // Clear the input field after sending the message
    if (!message.trim()) return; // Prevent sending empty messages

    try {
      // Send the message to the backend and capture the response
     const res= await sendMessage({ receiver_id: receiverID, message }).unwrap();
console.log(res);
    } catch (error) {
      console.error('Error:', error); // Log any error
    }
  };

  

  return (
    <div style={{ width: '100%' }} className="create-comment shadow-sm border-top bg-body">
      <form onSubmit={handleSubmit}> {/* Update form to call handleSubmit */}
        <div
          className="form-group-1 d-flex align-items-center py-md-3"
          style={{ padding: '10px 15px', backgroundColor: '#f0f2f5', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', position: 'relative' }}
        >
          <img src={userProfile} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} alt="profile-pic" />
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <input
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Capture input value
              style={{
                border: '1px solid #ccc', // Add a light border to the input
                borderRadius: '20px', // Make the border rounded
                padding: '10px 15px', // Adjust padding for better visibility
                height: 'auto',
                boxSizing: 'border-box',
                outline: 'none',
                fontSize: '16px',
                backgroundColor: '#fff', // Set background color to white for better contrast
                boxShadow: 'none',
              }}
              type="text"
              placeholder="Write a message..."
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isLoading || !message.trim()} // Disable button when loading or message is empty
            style={{ 
              borderRadius: '50%', 
              padding: '10px', 
              height: '40px', 
              width: '40px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: isLoading || !message.trim() ? '#ccc' : '#007bff', // Change button color when disabled
              border: 'none', 
              color: '#fff', 
              fontSize: '18px', 
              transition: 'background-color 0.3s ease',
              cursor: isLoading || !message.trim() ? 'not-allowed' : 'pointer', // Show not-allowed cursor when disabled
            }}
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-spin"></i> // Spinner icon during loading
            ) : (
              <i className="fa-regular fa-paper-plane"></i>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
