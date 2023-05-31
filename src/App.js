import "./styles.css";
import React from "react";
import NavBar from "./pages/Components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Authentication/Login/login";
import JobsPage from "./pages/JobsPages/JobsDashboard/JobDashboard";
import Register from "./pages/Authentication/Register/newReg";
import ResetPassword from "./pages/Authentication/ForgotPassword/forgotPassword";
import PageNotFound from "./pages/404/pageNotFind";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot" element={<ResetPassword />} />
          <Route exact path="/jobs" element={<JobsPage />} />
          <Route exact path="/login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
