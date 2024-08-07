// errorHelper.js

import { setToastError } from "../home/HomeSlice";

export const handleApiError = (error, dispatch) => {
 

  if (error?.status) {
    // Handle API errors based on status code
    switch (error.status) {
      case 422:
        dispatch(setToastError({ toastError: error.data?.error || 'Validation error occurred.' }));
        break;
      case 400:
        dispatch(setToastError({ toastError: 'Bad request. Please check your input and try again.' }));
        break;
      case 401:
        dispatch(setToastError({ toastError: 'Unauthorized. Please log in and try again.' }));
        break;
      case 500:
        dispatch(setToastError({ toastError: 'Internal server error. Please try again later.' }));
        break;
      case 503:
        dispatch(setToastError({ toastError: 'Service unavailable. The server might be down. Please try again later.' }));
        break;
      default:
        dispatch(setToastError({ toastError: 'An unexpected error occurred. Please try again later.' }));
    }
  } else if (error.message) {
    // Handle network errors or server unreachable
    if (error.message === 'Network Error') {
      dispatch(setToastError({ toastError: 'Network error: Please check your internet connection and try again.' }));
    } else if (error.message.includes('timeout')) {
      dispatch(setToastError({ toastError: 'Request timed out. Please try again later.' }));
    } else {
      dispatch(setToastError({ toastError: 'An error occurred while processing your request. Please try again later.' }));
    }
  } else {
    // Handle other unexpected errors
    dispatch(setToastError({ toastError: 'An error occurred while processing your request. Please try again later.' }));
  }
};
