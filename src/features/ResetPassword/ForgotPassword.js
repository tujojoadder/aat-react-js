import React, { useState } from "react";
import "./ResetPassword.css";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useForgotPasswordMutation } from "../../services/userLoginApi";

export default function ForgotPassword() {
  //Email sate
  const [email, setemail] = useState("");


  //mutation
  const [forgotPassword, { isSuccess,isLoading }] = useForgotPasswordMutation();

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({email});
      if (res.data) {
        $("#resetMessage").text(res.data.message);
      } else {
        // Ensure res.error and res.error.data are defined before accessing them
        const errorMessage = res.error && res.error.data ? res.error.data.error : 'An unknown error occurred';
        $("#resetMessage").text(errorMessage);
      }
    } catch (error) {
      // Handle network or unexpected errors
      $("#resetMessage").text('Server problem please try later');
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
                <p className="text-center">Reset Password link sent your email</p>
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
                  <button type="submit" disabled={isLoading} className="btn btn-lg btn-primary w-100 fs-6">
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
