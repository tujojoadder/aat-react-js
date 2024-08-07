import React, { useEffect } from "react";
import "./ConfirmModal.css";
import { useDispatch, useSelector } from "react-redux";
import { setShow_Modal, setToastError } from "../home/HomeSlice";
import { useLogOutUserMutation } from "../../services/userAuthApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ConfirmModal = () => {
  const show_modal = useSelector((state) => state.home.show_modal);
  const dispatch = useDispatch();
  const [logOutUser, { isLoading, isSuccess, isError, error }] = useLogOutUserMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOutUser().unwrap();
    } catch (err) {
      dispatch(setToastError({ toastError: "Failed to logout"}));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // Clear the token cookie and navigate to the login page or home page
      Cookies.remove('userToken');
      toast.success("Logged out successfully!");
      navigate('/login'); // Replace with your desired route
      dispatch(setShow_Modal({ show_modal: false }));
    }
  }, [isSuccess]);

  const modal_message = useSelector((state) => state.home.modal_message);

  if (!show_modal) {
    return null;
  }

  return (
    <div className="modal-of-backdrop">
      <div className="modal-contents">
        <div className="modal-of-header">
          <h4 className="modal-title">Confirm Logout</h4>

        </div>
        <div className="modal-of-body">
          <p>{modal_message}</p>
        </div>
        <div className="modal-of-footer d-flex justify-content-end">
  <button 
    type="button"
    className="btn btn-secondary me-2"
    onClick={() => dispatch(setShow_Modal({ show_modal: false }))}
  >
    Cancel
  </button>
  <button type="button" className="btn btn-primary" onClick={handleLogout} disabled={isLoading}>
    {isLoading ? 'Logging out...' : 'Logout'}
  </button>
</div>
      </div>
    </div>
  );
};

export default ConfirmModal;
