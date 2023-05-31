import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import homePageImage from "../../assets/image-home.jpg";
import imageOne from "../../assets/1.png";
import imageTwo from "../../assets/2.png";
import imageThree from "../../assets/3.png";
import imageFour from "../../assets/4.png";
import imageSix from "../../assets/5.png";
import imageSeven from "../../assets/6.png";
import imageEight from "../../assets/7.png";
import imageNine from "../../assets/8.png";
// import "../../assets";
const Home = () => {
  const history = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const dataAuth = localStorage.getItem("auth-user");
  if (dataAuth) {
  }
  function handleLoginClick() {
    history("/login");
  }
  function GoToDashboard() {
    history("/jobs");
  }
  return (
    <div className="home container container-sm my-3 ">
      <section className="heroSection text-light">
        <div className="row  align-items-center">
          <div className="col">
            <h1>
              Welcome to <br /> My<span className="text-head">Jobs </span>
            </h1>
            <form className=" justify-content-start">
              {!isAuthenticated && !dataAuth ? (
                <button
                  onClick={handleLoginClick}
                  className="btn btn-primary"
                  type="button"
                >
                  Get Started
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
          <div className="col text-center ">
            <img alt="homeImage" className="rounded-4" src={homePageImage} />
          </div>
        </div>
      </section>
      <section className="why-us pb-4">
        <h2> Why Us?</h2>
        <div className="row  pt-3 pb-3">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card  p-2">
              <div className="card-body p-4">
                <h3 className="card-title fs-5 text">Get More Visibility</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card  p-2">
              <div className="card-body p-4">
                <h3 className="card-title fs-5 text">
                  Organize Your Candidates
                </h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card p-2">
              <div className="card-body p-4">
                <h3 className="card-title fs-5 text">Verify Their Abilities</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="companyLogo pb-4">
        <h2>Companies Who Trust Us</h2>
        <div className="text-center">
          <div className="imageGallery mt-5">
            <img src={imageOne} alt="imageOne" />
            <img src={imageTwo} alt="imageTwo" />
            <img src={imageThree} alt="imageThree" />
            <img src={imageFour} alt="imageFour" />
            <img src={imageSix} alt="imageSix" />
            <img src={imageSeven} alt="imageSeven" />
            <img src={imageEight} alt="imageEight" />
            <img src={imageNine} alt="imageNine" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
