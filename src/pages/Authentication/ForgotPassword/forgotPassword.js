import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState(1); // 1 - Get Reset Password Token, 2 - Verify Password Token, 3 - Change Password
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const { addToast } = useToasts();
  // const [error, setError] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleGetToken = async () => {
    try {
      if (!isValidEmail(email)) {
        addToast("Email is invalid", {
          appearance: "error"
        });
      } else {
        const response = await axios.get(
          `https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=${email}`
        );
        setMessage(response.data.message);
        // console.log(response.data.data.token);
        setToken(response.data.data.token);

        setStep(2);
      }
    } catch (error) {
      console.log("Something went Wrng");
      setMessage(error.response.data.message);
    }
  };

  // const handleVerifyToken = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://jobs-api.squareboat.info/api/v1/auth/resetpassword/${token}`
  //     );
  //     setMessage(response.data.message);
  //     setStep(3);
  //   } catch (error) {
  //     setMessage(error.response.data.message);
  //   }
  // }

  // if (password.length <= 6) {
  //   addToast("Password must be greater than 6 characters!!", {
  //     appearance: "error"
  //   });
  // }
  // if (password !== confirmPassword) {
  //   addToast("Password & Confirm password are not matching", {
  //     appearance: "error"
  //   });
  // }

  const handleChangePassword = async () => {
    try {
      if (password.length <= 6) {
        addToast("Password must be greater than 6 characters!!", {
          appearance: "error"
        });
      } else if (password !== confirmPassword) {
        addToast("Password & Confirm password are not matching", {
          appearance: "error"
        });
      } else {
        const response = await axios.post(
          `https://jobs-api.squareboat.info/api/v1/auth/resetpassword`,
          {
            password,
            confirmPassword,
            token
          }
        );

        setMessage(response.data.message);
        addToast("Password Successfully Changed!! ", {
          appearance: "success"
        });

        history("/login");
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  // Add this function to get the token from the URL query parameters
  const getTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      setStep(3);
    }
  };

  // Call the function to get the token from the URL when the component mounts
  useEffect(() => {
    getTokenFromURL();
  }, []);

  console.log(message);
  return (
    <div className="container ">
      <h1 className="mt-5 mb-2 text-light text-center">Reset Password</h1>
      {step === 1 && (
        <div
          className="card text-start mt-4"
          style={{ width: "100%", maxWidth: "500px", margin: "auto" }}
        >
          <div className="card-body px-4">
            <p className="card-text ">Enter your email address</p>
            <div className="form-outline mb-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-2"
              />
            </div>
            <button className="btn btn-primary" onClick={handleGetToken}>
              Reset Password
            </button>
            <div className="d-flex justify-content-between mt-4">
              <p className="mt-3 text-dark">{message}</p>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div
          className="card text-start mt-4"
          style={{ width: "100%", maxWidth: "500px", margin: "auto" }}
        >
          <div className="card-body px-4">
            <p>Enter your new password and confirm it</p>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control mb-2"
            />
            <button className="btn btn-primary" onClick={handleChangePassword}>
              Change Password
            </button>
            <div className="d-flex justify-content-between mt-2">
              <p className="mt-3 text-dark">{message}</p>
            </div>
          </div>
        </div>
      )}

      {/* <h1 className="mt-5 mb-3 text-light">Reset Password</h1>
      {step === 1 && (
        <div className="mb-5 text-light" style={{ maxWidth: "500px" }}>
          <p>Enter your email address to get a reset password token</p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-primary" onClick={handleGetToken}>
            Reset Password
          </button>
          <p className="mt-3 text-light">{message}</p>
        </div>
      )} */}

      {/* {step === 2 && (
        <div className="mb-5 text-light" style={{ maxWidth: "500px" }}>
          <p>Enter the reset password token - </p>
          <input
            type="text"
            placeholder="Reset password token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-primary" onClick={handleVerifyToken}>
            Verify Token
          </button>
        </div>
      )} */}
      {/* {step === 2 && (
        <div className="mb-5 text-light" style={{ maxWidth: "500px" }}>
          <p>Enter your new password and confirm it</p>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-primary" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>
      )} */}

      {/* <p className="mt-3 text-light">{message}</p> */}
    </div>
  );
};

export default ResetPassword;
