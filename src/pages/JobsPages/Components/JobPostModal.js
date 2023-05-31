import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
// import { getToken } from "../utils/common";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function JobPostModal(props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    createdAt: ""
  });
  const [loading] = useState(false);
  const { addToast } = useToasts();
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getToken = () => {
    return localStorage.getItem("auth-user");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("My Input DATA", formData);
    try {
      const tokenToSend = JSON.parse(JSON.stringify(getToken()));
      var data = JSON.parse(tokenToSend).token;

      // console.log(data);

      await axios.post(
        `https://jobs-api.squareboat.info/api/v1/jobs`,
        formData,
        {
          headers: {
            Authorization: `${data}`
          }
        }
      );
      // console.log(response);
      addToast("Successfully Job Posted!! ", {
        appearance: "success"
      });
      window.location.reload();

      history("/jobs");
    } catch (error) {
      console.log(error);
      addToast("Something went wrong!!", {
        appearance: "error"
      });
    }
  };
  return (
    <div className="container my-modal">
      <button
        className="btn btn-primary"
        data-bs-target="#myModal"
        data-bs-toggle="modal"
      >
        Post a Job
      </button>
      <div
        className="modal fade"
        id="myModal"
        aria-hidden="false"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Post a Job
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* Modal Body */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body text-start p-4">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Job Title"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Job Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Location"
                  />
                </div>
                <button
                  // onClick={handleSubmit}
                  className="btn btn-primary "
                  type="submit"
                  disabled={loading}
                  data-dismiss="modal"
                >
                  {loading ? (
                    <div className="spinner-border " role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Post Job"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
