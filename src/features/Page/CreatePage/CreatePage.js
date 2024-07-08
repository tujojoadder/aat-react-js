import React, { useState } from 'react';
import './CreatePage.css';

export default function CreatePage() {
  const [formData, setFormData] = useState({
    pageName: '',
    category: '',
    description: '',
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
    <div className="create-page-container main pb-5">
      <div className="form-header mt-3">
        <h3>Create a Page</h3>
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
            <option value="Community">Community</option>
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
        <button type="submit" className="form-button">Create Page</button>
      </form>
    </div>
  );
}
