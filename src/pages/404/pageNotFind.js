import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const history = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const dataAuth = localStorage.getItem("auth-user");
  if (dataAuth) {
    var data = JSON.parse(dataAuth);
  }
  function handleLoginClick() {
    history("/");
  }
  function GoToDashboard() {
    history("/jobs");
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold text-light">404</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>

          <form className=" justify-content-start">
            {!isAuthenticated && !dataAuth ? (
              <button
                onClick={handleLoginClick}
                className="btn btn-primary"
                type="button"
              >
                Go Home
              </button>
            ) : (
              <button
                onClick={GoToDashboard}
                className="btn btn-primary"
                type="button"
              >
                View Jobs
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
