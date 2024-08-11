import React, { useState } from "react";
import "./ResetPassword.css";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useForgotPasswordMutation } from "../../services/userLoginApi";
import { setToastError } from "../home/HomeSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleApiError } from "../handleApiError/handleApiError";

export default function ForgotPassword() {
  const dispatch = useDispatch();

  //Email sate
  const [email, setemail] = useState("");

  //mutation
  const [forgotPassword, { isSuccess, isLoading }] =
    useForgotPasswordMutation();

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email });
      if (res.data) {
        toast.success("We've sent a link to your mail");
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      // Handle network or unexpected errors
      handleApiError(error, dispatch);
    }
  };

  return (
    <div className="full-body">
      <div className="  d-flex justify-content-center align-items-center min-vh-100">
        {/* Login Container */}
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          {/* Left Box */}
          <div className="col-md-3">
            {/* Add content for left box here if needed */}
          </div>

          {/* Right Box */}

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text ">
                <h2 className="text-center">Forgot Password</h2>
                <p className="text-center">
                  Reset Password link sent your email
                </p>
              </div>

              <form onSubmit={handleSubmission}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-lg btn-primary w-100 fs-6"
                  >
                    Reset Password
                  </button>
                </div>
              </form>

              <p className="mt-2 text-danger text-center" id="resetMessage"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
