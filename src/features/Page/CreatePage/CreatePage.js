import React, { useState } from 'react';
import './CreatePage.css';
import CreatePageback from '../PageBack/CreatePageback/CreatePageback';
import { useCreatePageMutation } from '../../../services/pagesApi';
import { setToastSuccess } from '../../home/HomeSlice';
import { handleApiError } from '../../handleApiError/handleApiError';
import { useDispatch } from 'react-redux';
import SmallScreenBack from '../../SmallScreenBack/SmallScreenBack';
import LargeScreenBack from '../../LargeScreenBack/LargeScreenBack';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
const navigate=useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    pageName: '',
    category: '',
    description: '',
  });

  const [createPage, { isLoading, isError, isSuccess, error }] = useCreatePageMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPage({
        page_name: formData.pageName,
        page_details: formData.description,
        category: formData.category,
      }).unwrap();
        // Handle success
        navigate("/");
        dispatch(setToastSuccess({ toastSuccess: "Group Created Successfully" }));
    } catch (err) {
      // Handle error
      handleApiError(err, dispatch);    }
  };

  return (
    <div className="create-page m-0 p-0 main border-left border-right  mb-5" style={{ backgroundColor: "white", minHeight: '100vh' }}>

      <div className='m-0 p-0'>
              {/*    Back buttons */}
              <SmallScreenBack text="Create pages" />
        <LargeScreenBack text="Create pages" />
        <div className="sm-back"></div>



        <div className="create-page-containern p-3 main pb-5">
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
            <button type="submit" className="form-button mb-5" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Page'}
            </button>
            {isError && <div className="error">Failed to create page. {error.message}</div>}
            {isSuccess && <div className="success">Page created successfully!</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
