import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateCommentMutation } from '../../../../../services/commentApi';
import { triggerRefetch } from '../../../HomeSlice';

export default function Comment({ postId }) {

  const dispatch = useDispatch();
  
  const [commentText, setCommentText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // selectors
  const profilePicture = useSelector((state) => state.home.profile_picture);

  // RTK Query mutation
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call mutation to post the comment
      await createComment({ postId, comment_text: commentText }).unwrap();
      setCommentText(''); // Clear the input after successful submission
/*       // Dispatch refetch trigger
      dispatch(triggerRefetch()); // Trigger refetch in AllComments
     */
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <div style={{ width: '100%' }} className="create-comment shadow-sm bg-body rounded">
      <form onSubmit={handleSubmit}>
        <div className="form-group-1 d-flex align-items-center py-md-3" style={{ padding: '10px 15px', backgroundColor: '#f0f2f5', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
          <img src={profilePicture} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} alt="profile-pic" />
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <input
              className="form-control"
              style={{
                border: 'none',
                flexGrow: 1,
                padding: '10px 0',
                height: 'auto',
                boxSizing: 'border-box',
                outline: 'none',
                fontSize: '16px',
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={isLoading} // Disable input while loading
            />
            <div style={{
              position: 'absolute',
              bottom: '5px',
              left: '0',
              right: '0',
              height: '2px',
              backgroundColor: isFocused ? '#007bff' : '#e0e0e0',
              transition: 'background-color 0.3s ease'
            }}></div>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            style={{ borderRadius: '50%', padding: '10px', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#007bff', border: 'none', color: '#fff', fontSize: '18px', transition: 'background-color 0.3s ease' }}
            disabled={isLoading} // Disable button while loading
          >
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
