import React, { useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const history = useNavigate();

  const [loggingIn] = useState(false);
  const { addToast } = useToasts();

  const dataAuth = localStorage.getItem("auth-user");
  if (dataAuth) {
    var data = JSON.parse(dataAuth);
  }
  // user is not authenticated
  if (data) {
    return <Navigate to="/jobs" />;
  }
  function handleRegisterClick() {
    history("/register");
  }
  function handleForgotClick() {
    history("/forgot");
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch({ type: "LoginRequest" });

      const body = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value
      };
      if (body.email === "") {
        addToast("Please enter your email!!", {
          appearance: "error"
        });
      } else if (body.password === "") {
        addToast("Please enter your password!!", {
          appearance: "error"
        });
      } else {
        const { data } = await axios.post(
          "https://jobs-api.squareboat.info/api/v1/auth/login",
          body,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        localStorage.setItem("auth-user", JSON.stringify(data.data));

        const { token, ...userData } = data.data;

        dispatch({ type: "LoginSuccess", payload: userData });
        console.log(userData);
        addToast("Successfully logged in!! ", {
          appearance: "success"
        });

        history("/jobs");
      }
    } catch (error) {
      dispatch({ type: "LoginFailure" });

      addToast("Invalid credential!!", {
        appearance: "error"
      });
    }
  };

  return (
    <section className="vh-100 section-2bg">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 ">
                <h3 className="mb-3">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Email / Username
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      id="email"
                      ref={emailInputRef}
                    />
                  </div>

                  <div className="form-outline mb-4 ">
                    <div className="row ">
                      <div className="col-6">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div className="col-6 text-end">
                        <button
                          className="btn btn-link"
                          onClick={handleForgotClick}
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      id="password"
                      ref={passwordInputRef}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      className="btn btn-primary btn-lg btn-block px-5 "
                      type="submit"
                      disabled={loggingIn}
                    >
                      {loggingIn ? "Logging in..." : "Log In"}
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <p className="mb-0 text-center">
                    New to MyJobs?
                    <button
                      className="btn btn-link"
                      onClick={handleRegisterClick}
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
