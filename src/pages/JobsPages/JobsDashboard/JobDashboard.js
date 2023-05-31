import React, { useState, useEffect } from "react";
import JobCard from "../Components/JobCard";
import JobPostModal from "../Components/JobPostModal";
import { getJobsByUser, getTotalPages, postJob } from "./utils";
import "./JobDashboard.css";
import CandidatesApplied from "../Candidate/CandidateApplied";
import { useSelector, Provider } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const JobsPage = () => {
  const [loading, setLoading] = useState();
  const [jobs, setJobs] = useState();
  const [paginate, setPaginate] = useState({
    limitPerPage: 1,
    totalJobs: 1,
    currPage: 1,
    totalPages: 1
  });

  const { isAuthenticated } = useSelector((state) => state.user);
  const dataAuth = localStorage.getItem("auth-user");
  if (dataAuth) {
    var data = JSON.parse(dataAuth);
  } // user is not authenticated

  if (!data) {
    return <Navigate to="/" />;
  }

  const [modal, setModal] = useState({ open: false, actJobId: "" });

  useEffect(() => {
    const fetchJobsPerPage = async () => {
      try {
        const authData = localStorage.getItem("auth-user");
        if (authData) {
          var resp = JSON.parse(authData);
          var token = resp.token;
        }
        setLoading(true);
        const { data, meta } = await getJobsByUser(paginate.currPage, token);
        if (data.length === 0) {
          setJobs([]);
          setLoading(false);
        }
        setPaginate({
          ...paginate,
          totalJobs: meta.count,
          limitPerPage: meta.limit,
          totalPages: getTotalPages(meta.count, meta.limit)
        });

        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobsPerPage();
  }, [paginate.currPage]);

  // Post a Job
  const postJob = (jobDetails) => {
    console.log(jobDetails);
  };

  // function handleJobPostClick() {
  //   history("/jobPost");
  // }
  return (
    <div className="container my-5">
      <div className="jobs_upper">
        <div className="headerIcon">
          {/* <span>
            <img alt="home" />
          </span> */}
          <div className="text-light">
            <h1> Home </h1>
          </div>
        </div>
        <div className="text-light">
          <h3> Jobs Posted By You </h3>
        </div>
        <div className="col text-end">
          <JobPostModal postJob={postJob} />
        </div>

        <div className="row my-5">
          {!loading &&
            jobs &&
            jobs.map((job) => (
              <JobCard
                key={job.id}
                {...job}
                onOpenModal={() => setModal({ open: true, actJobId: job.id })}
              />
            ))}
        </div>

        {!loading && jobs && jobs.length > 0 && (
          <div className="paginate_buttons">
            <button
              onClick={() => {
                if (paginate.currPage > 1) {
                  setPaginate((p) => ({ ...p, currPage: p.currPage - 1 }));
                }
              }}
            >{`<`}</button>
            <div>{paginate.currPage}</div>
            <button
              onClick={() => {
                if (paginate.currPage < paginate.totalPages) {
                  setPaginate((p) => ({ ...p, currPage: p.currPage + 1 }));
                }
              }}
            >{`>`}</button>
          </div>
        )}
      </div>
      {modal.open && (
        <CandidatesApplied
          onClose={() => setModal((s) => ({ ...s, open: false }))}
          jobId={modal.actJobId}
        />
      )}
    </div>
  );
};

export default JobsPage;
