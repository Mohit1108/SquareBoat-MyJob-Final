import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const history = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const dataAuth = localStorage.getItem("auth-user");

  function handleLoginClick() {
    history("/login");
  }

  function handleLogout() {
    localStorage.removeItem("auth-user");
    window.location.reload();
  }
  function handleHomeClick() {
    history("/");
  }

  return (
    <nav className="navbar ">
      <div className="container header-border">
        <button
          onClick={handleHomeClick}
          className="btn btn-link navbar-brand my-logo text-light"
        >
          My<span>Jobs</span>
        </button>
        <form className=" justify-content-start">
          {!isAuthenticated && !dataAuth ? (
            <button
              onClick={handleLoginClick}
              className="btn btn-primary"
              type="button"
            >
              Login / Signup
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
