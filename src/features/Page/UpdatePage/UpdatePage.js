import React, { useState } from 'react';
import './UpdatePage.css';

export default function UpdatePage() {
  const [formData, setFormData] = useState({
    pageName: '',
    category: '',
    description: '',
    address: '',
    phoneNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="create-page-container main pb-5 mb-5">
      <div className="form-header mt-3">
        <h3>Update a Page</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pageName">Page Name</label>
          <input
            type="text"
            id="pageName"
            name="pageName"
            value={formData.pageName}
            onChange={handleChange}
            placeholder="Enter the page name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Business">Business</option>
            <option value="Fan Page">Fan Page</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Nonprofit">Nonprofit</option>
            <option value="Personal">Personal</option>
            <option value="Public Figure">Public Figure</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the purpose and activities of the page"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter the address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter the phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter the email"
          />
        </div>
        <button type="submit" className="form-button">Create Page</button>
      </form>
    </div>
  );
}
