import React, { useEffect, useState } from "react";
import "./Login.css";
import $ from "jquery";
import googleLogo from "./images/google.png"; // Import the image
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { change } from "./LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  useAdditionalInformationMutation,
  useGoogleHandleMutation,
  useLoginMutation,
  useUserLoginMutation,
} from "../../services/userLoginApi";
import Spinner from "./Spinner/Spinner";
import {
  setProfile_picture,
  setUser_fname,
  setUser_lname,
  setEmail,
  setIdentifier,
  setToastError,
  setToastSuccess
} from "../home/HomeSlice";
import { handleApiError } from "../handleApiError/handleApiError";
export default function Login() {
  //navigate
  const navigate = useNavigate();
  //selectors
  const email = useSelector((state) => state.login.email);
  //dispacchers
  const dispatch = useDispatch();

  //
  

  //Mutation

  const [userLogin, { isSuccess }] = useUserLoginMutation();
  const [
    googleHandle,
    { isSuccess: googleHandleSuccess, isLoading: googleHandleLoadding },
  ] = useGoogleHandleMutation();

  const [
    additionalinformation,
    {
      isSuccess: additionalinformationSuccess,
      isLoading: additionalinformationLoadding,
    },
  ] = useAdditionalInformationMutation();

  const [login, { isSuccess: loginSucess, isLoading: loginLoading }] =
    useLoginMutation();

  //functions

  //function for submit the form
  // Handle handleCridential google

  
  const handleCridential = async (credentialResponse) => {
    const { credential } = credentialResponse;
    const res = await googleHandle({ token: credential });
    try {
      if (res.data) {
        //if user has account
        if (res.data.message == "have account") {
          //set cookie
          Cookies.set("userToken", res.data.token, { expires: 7 });
          dispatch(setToastSuccess({ toastSuccess: "Login Successfully" }));
            window.location = "/";
        
         
        } else {
          //if user does not have account

          //set email
          dispatch(change({ email: res.data.email }));
        }
      } else if (res.error) {
        handleApiError(res.error, dispatch);


      }
    } catch (error) {
      handleApiError(error, dispatch);

    }
  };

  //handle form submition
  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await additionalinformation({ formData, email });
      if (res.data) {
        Cookies.set("userToken", res.data.token, { expires: 7 });

        dispatch(
          setProfile_picture({ profile_picture: res.data.data.profile_picture })
        );
        dispatch(setUser_fname({ user_fname: res.data.data.user_fname }));
        dispatch(setUser_lname({ user_lname: res.data.data.user_lname }));
        dispatch(setEmail({ email: res.data.data.email }));
        dispatch(setIdentifier({ identifier: res.data.data.identifier }));

        dispatch(setToastSuccess({ toastSuccess: "Login Successfully" }));
        window.location = "/";
        //error message handaling
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      
      } 
    } catch (error) {
      // Handle network or unexpected errors
      handleApiError(error, dispatch);

    }
  };

  //handle normal login form submition
  const handleLogdataSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginformData);
      if (res.data) {
        if (res.data.message == "passwordInvalid") {
         
          dispatch(setToastError({ toastError: "Password Invalid" }));

          
        } else if (res.data.message == "noEmail") {
         

          dispatch(setToastError({ toastError: "No email found" }));
        } else {
          Cookies.set("userToken", res.data.token, { expires: 7 });

          dispatch(
            setProfile_picture({
              profile_picture: res.data.data.profile_picture,
            })
          );
          dispatch(setUser_fname({ user_fname: res.data.data.user_fname }));
          dispatch(setUser_lname({ user_lname: res.data.data.user_lname }));
          dispatch(setEmail({ email: res.data.data.email }));
          dispatch(setIdentifier({ identifier: res.data.data.identifier }));

          dispatch(setToastSuccess({ toastSuccess: "Login Successfully" }));          window.location = "/";
 
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
    fname: "",
    lname: "",
    password: "",
    gender: "male", // Default gender
    birthdate_year: "",
    birthdate_month: "",
    birthdate_day: "",
  });

  //login form data

  let [loginformData, setloginFormData] = useState({
    email: "",
    password: "",
  });

  //login sate
  const [loadding, setloadding] = useState(false);

  // Function to populate days based on the selected month and year
  const populateDays = () => {
    const selectedMonth = parseInt(formData.birthdate_month);
    const selectedYear = parseInt(formData.birthdate_year);
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    // Adjust for February in leap years
    if (selectedMonth === 2 && isLeapYear(selectedYear)) {
      daysInMonth = 29;
    }

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return days;
  };

  // Function to check if a year is a leap year
  const isLeapYear = (year) => {
    // A leap year is divisible by 4, but not by 100, unless it is also divisible by 400
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // Handle input changes for addissional info
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input changes for login in
  const handleLogdataChange = (e) => {
    let { name, value } = e.target;
    setloginFormData({ ...loginformData, [name]: value });
  }; 



  

  return (
    <div className="full-body">
      {googleHandleLoadding ? (
        <Spinner />
      ) : (
        <div className="  d-flex justify-content-center align-items-center min-vh-100">
          {/* Login Container */}
          <div className="row border rounded-5 p-3 bg-white shadow box-area">
            {/* Left Box */}
            <div className="col-md-3">
              {/* Add content for left box here if needed */}
            </div>

            {/* Right Box */}

            {email ? (
              <div className="col-md-6 right-box">
                <div className="row align-items-center">
                  <div className="header-text ">
                    <h3 className=" text-center">Create a new account</h3>
                  </div>
                  <form onSubmit={handleSubmission}>
                    <label htmlFor="fname"></label>
                    <input
                      className="form-control form-control-lg bg-light fs-6"
                      name="fname"
                      type="text"
                      placeholder="First Name"
                      value={formData.fname}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="lname">Last Name:</label>
                    <input
                      className="form-control form-control-lg bg-light fs-6"
                      name="lname"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lname}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                      className="form-control form-control-lg bg-light fs-6"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="8"
                    />

                    <div className="form-group">
                      <label htmlFor="gender">Gender:</label>
                      <select
                        name="gender"
                        className="form-control py-0"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="birthdate">Birthdate:</label>
                      <div className="row">
                        <div className="col-4">
                          <select
                            name="birthdate_year"
                            className="form-control py-0"
                            value={formData.birthdate_year}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled selected>
                              Year
                            </option>
                            {Array.from(
                              { length: 100 },
                              (_, i) => new Date().getFullYear() - i
                            ).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-4">
                          <select
                            name="birthdate_month"
                            className="form-control py-0"
                            value={formData.birthdate_month}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled selected>
                              Month
                            </option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              (month) => (
                                <option key={month} value={month}>
                                  {new Date(0, month - 1).toLocaleString("en", {
                                    month: "short",
                                  })}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="col-4">
                          <select
                            name="birthdate_day"
                            className="form-control py-0"
                            value={formData.birthdate_day}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled selected>
                              Day
                            </option>
                            {populateDays()}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="text-center ">
                      <button
                        className="mt-1 btn btn-lg btn-primary text-light w-50 fs-6"
                        disabled={additionalinformationLoadding || additionalinformationSuccess}
                      >
                        <b>Submit</b>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="col-md-6 right-box">
                <div className="row align-items-center">
                  <div className="header-text mb-4">
                    <h2>Hello, Again</h2>
                    <p>We are happy to have you back.</p>
                  </div>

                  <form onSubmit={handleLogdataSubmit}>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="Email address"
                        name="email"
                        value={loginformData.email}
                        onChange={handleLogdataChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-1">
                      <input
                        type="password"
                        className="form-control form-control-lg bg-light fs-6"
                        placeholder="Password"
                        name="password"
                        value={loginformData.password}
                        onChange={handleLogdataChange}
                        minLength="8"
                        required
                      />
                    </div>
                    <div className="input-group mb-5 d-flex justify-content-between">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="formCheck"
                        />
                        <label
                          htmlFor="formCheck"
                          className="form-check-label text-secondary"
                        >
                          <small>Remember Me</small>
                        </label>
                      </div>
                      <div className="forgot">
                        <small>
                          <div>
                          <p
  className="link-like"
  onClick={() => window.location.href = "/forgotpassword"}
>
  Forgot Password?
</p>
                          </div>{" "}
                        </small>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <button
                        className="btn btn-lg btn-primary w-100 fs-6"
                        disabled={ loginLoading || isSuccess}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="row">
                    <small>Don't have an account?</small>
                  </div>

                  <div className="text-center mt-2 w-75 ">
                    <GoogleLogin
                      size="large" // Setting the button size
                      onSuccess={(credentialResponse) => {
                        handleCridential(credentialResponse);
                      }}
                      onError={() => {

                        dispatch(setToastError("Server Problem please try later"));

                      }}
                    />
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}





