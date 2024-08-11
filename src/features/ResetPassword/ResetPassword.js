import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import $ from "jquery";
import { useNavigate, useParams } from "react-router-dom";
import {
  useConfirmPasswordMutation,
  useResetPasswordMutation,
} from "../../services/userLoginApi";
import { useDispatch } from "react-redux";
import { setToastError } from "../home/HomeSlice";
import { handleApiError } from "../handleApiError/handleApiError";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const [
    confirmPassword,
    { isSuccess: confirmPasswordSuccess, isLoading: confirmPasswordLoadding },
  ] = useConfirmPasswordMutation();

  //handle form submition
  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await confirmPassword(formData);
      if (res.data) {
        if (res.data && res.data.message == "sucess") {
          toast.success("Password changed successfully");
          
          setTimeout(() => {
            window.location = "/login";
          }, 1500);
        } else {
          dispatch(setToastError({ toastError: res.data.message }));
        }
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  //addition form data
  let [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
    email: "",
  });

  // Handle input changes for addissional info
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [resetPassword, { data, error, isLoading, isSuccess }] =
    useResetPasswordMutation();

  //mooo
  const [isTokenValid, setIsTokenValid] = useState(false); // State to track if the token is valid

  useEffect(() => {
    if (token) {
      resetPassword({ token }).then((response) => {
        if (response.data && response.data.success === "success") {
          setFormData((prevFormData) => ({
            ...prevFormData,
            email: response.data.email,
          }));
          setIsTokenValid(true);
        } else {
          dispatch(setToastError("Token validation time over"));
        }
      });
    }
  }, [token, resetPassword]);

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  return (
    <div className="full-body">
      {isTokenValid && (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          {/* Login Container */}
          <div className="row border rounded-5 p-3 bg-white shadow box-area">
            {/* Left Box */}
            <div className="col-md-3">
              {/* Add content for left box here if needed */}
            </div>
            {/* Right Box */}
            <div className="col-md-6 right-box">
              <div className="row align-items-center">
                <div className="header-text mb-3">
                  <h2>Reset Password</h2>
                </div>
                <form onSubmit={handleSubmission}>
                  <div className="mb-3">
                    <label htmlFor="Password">Password:</label>
                    <input
                      className="form-control form-control-lg bg-light fs-6"
                      name="password"
                      type="text"
                      placeholder="Password"
                      required
                      onChange={handleChange}
                    />

                    <label htmlFor="Conform Password">Conform Password:</label>
                    <input
                      className="form-control form-control-lg bg-light fs-6"
                      name="confirm_password"
                      type="text"
                      placeholder="Confirm Password"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary w-100 fs-6"
                      disabled={
                        confirmPasswordSuccess || confirmPasswordLoadding
                      }
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
                <p id="message"></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
