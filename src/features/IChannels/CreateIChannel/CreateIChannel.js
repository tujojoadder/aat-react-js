import React, { useState, useEffect } from 'react';
import './CreateIChannel.css';
import IChannelCreateBack from '../iChannelBack/iChannelCreateBack/IChannelCreateBack';
import { useCreateIAccountMutation } from '../../../services/iaccountsApi';

export default function CreateIChannel() {
  const [iChannel, setIChannel] = useState('');
  const [createIAccount, { isLoading, isError, isSuccess, error }] = useCreateIAccountMutation();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle the "Create iChannel" button submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      await createIAccount({ iaccount_name: iChannel }).unwrap();
      setSuccessMessage('iAccount created successfully!');
      setIChannel('');  // Reset the input field after success
    } catch (err) {
      // Catch errors and set the error message to display in UI
      setErrorMessage(err?.data?.error || err?.data?.message || 'Failed to create iAccount');

    }
  };

  // Effect to reset messages after submission
  useEffect(() => {
    if (isError) {
      setErrorMessage(error?.data?.error || 'Failed to create iAccount');
    }
    if (isSuccess) {
      setSuccessMessage('iAccount created successfully!');
    }
  }, [isError, isSuccess, error]);

  return (
    <div className="main pb-5 m-0 p-0 px-3 mb-5 border-start border-end" style={{ height: '100vh' }}>
      <IChannelCreateBack />
      <div className="body mt-5 pt-5 p-2">
        <div className="form-header mt-3">
          <h3>Create an iChannel</h3>
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

          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create iChannel'}
          </button>
        </form>

        {/* Display success or error messages */}
        {successMessage && <p className="success-message text-center mt-1">{successMessage}</p>}
        {errorMessage && <p className="error-message text-center mt-1">{errorMessage}</p>}
      </div>
    </div>
  );
}
