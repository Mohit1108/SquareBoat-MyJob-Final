import React, { useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: "",
    userRole: 0
  });

  const { addToast } = useToasts();
  const history = useNavigate();
  const dispatch = useDispatch();

  function handleLoginClick() {
    history("/login");
  }
  formData.name
    .split("")
    .filter((char) => /[a-zA-Z]/.test(char))
    .join("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length <= 6) {
      addToast("Password must be greater than 6 characters!!", {
        appearance: "error"
      });
    } else {
      try {
        const response = await axios.post(
          "https://jobs-api.squareboat.info/api/v1/auth/register",
          formData
        );
        console.log(response);

        addToast("Successfully Registered!! ", {
          appearance: "success"
        });
        addToast("You can login now!! ", {
          appearance: "success"
        });
        history("/");
      } catch (error) {
        dispatch({ type: "REGISTER_FAILURE" });

        addToast("Something went wrong!!", {
          appearance: "error"
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="vh-100 section-2bg">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "10px" }}>
              <div className="card-body p-md-2">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className=" h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Signup</p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="name">
                            Full Name*
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name*"
                            value={formData.name
                              .split("")
                              .filter((char) => /[a-zA-Z]/.test(char))
                              .join("")}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="email">
                            Email Address*
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter your email address*"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="password">
                            Create Password*
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="confirmPassword"
                          >
                            Confirm Password*
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            required
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="skills">
                            Skills
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="skills"
                            name="skills"
                            value={formData.skills}
                            placeholder="Enter your Skills"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Signup
                        </button>
                      </div>
                    </form>

                    <div className="text-center">
                      <p>
                        Have an account?
                        <button
                          className="btn btn-link"
                          onClick={handleLoginClick}
                        >
                          Login
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sampleimage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Signup;
