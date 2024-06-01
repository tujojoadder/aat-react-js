import React, { useState } from "react";
import "./Login.css";
import googleLogo from "./images/google.png"; // Import the image
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { change } from "./LoginSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  useGoogleHandleMutation,
  useUserLoginMutation,
} from "../../services/userLoginApi";
export default function Login() {
  //selectors
  const email = useSelector((state) => state.login.email);
  //dispacchers
  const dispatch = useDispatch();

  //
  //naviaget
  const navigate = useNavigate();
  //Mutation

  const [userLogin, { isSuccess }] = useUserLoginMutation();
  const [
    googleHandle,
    { isSuccess: googleHandleSuccess, isLoading: googleHandleLoadding },
  ] = useGoogleHandleMutation();

  //functions

  //function for submit the form
  // Handle form submission
  const handleCridential = async (credentialResponse) => {
    const { credential } = credentialResponse;
    const res = await googleHandle({ token: credential });

    if (res.data) {
      console.log('Login successful', res.data);
      console.log(res.data.user);
      dispatch(change({ email: res.data.user.email }));  // Example of setting the email
    } else if (res.error) {
      console.log('Login failed', res.error);
    }

  };
  

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    password: "",
    gender: "male", // Default gender
    birthdate_year: "",
    birthdate_month: "",
    birthdate_day: "",
  });

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

          {email ? (
            <div className="col-md-6 right-box">
              <div className="row align-items-center">
                <div className="header-text ">
                  <h3 className=" text-center">Create a new account</h3>
                </div>
                <form>
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
                      className="form-control"
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
                          className="form-control"
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
                          className="form-control"
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
                          className="form-control"
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
                    <button className="mt-2 btn btn-lg btn-primary text-light w-50 fs-6">
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
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                  />
                </div>
                <div className="input-group mb-1">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
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
                      <a href="#">Forgot Password?</a>
                    </small>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <button className="btn btn-lg btn-primary w-100 fs-6" disabled={googleHandleLoadding}>
                    Login
                  </button>
                </div>

                <div className="row">
                  <small>Don't have an account?</small>
                </div>

                <div className="text-center mt-2">
                  <GoogleLogin
              
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      handleCridential(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
