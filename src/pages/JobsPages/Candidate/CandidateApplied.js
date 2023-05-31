import React, { useEffect, useState } from "react";
import { getApplicationsForJob } from "../JobsDashboard/utils";
import Card from "./card";
import "./css.css";
const CandidatesApplied = ({ onClose, jobId }) => {
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState();

  const dataAuth = localStorage.getItem("auth-user");

  const data = JSON.parse(dataAuth);
  const token = data.token;

  useEffect(() => {
    const fetchCandidatesApplied = async () => {
      if (!jobId) return;
      try {
        setLoading(true);
        const data = await getApplicationsForJob(jobId, token);
        setCandidates(data);
        setLoading(false);
      } catch (err) {
        console.error(err.response.data.message || "something went wrong");
      }
    };
    if (jobId) fetchCandidatesApplied();
  }, [jobId, token]);

  return (
    <div className="modalContainer">
      <div className="modal_background">
        <div className="modal_heading">
          <h4>Applications for this Job</h4>
          <div className="crossBtn" onClick={onClose}>
            X
          </div>
        </div>
        <hr />
        <div className="my-3">
          Total {candidates ? candidates.length : 0} candidates
        </div>
        <div className="row">
          {!loading && (!candidates || candidates.length === 0) && (
            <div className="modal_details--empty">
              <span className="empty_text">No applications available!</span>
            </div>
          )}
          {!loading &&
            candidates &&
            candidates.length &&
            candidates.map((candidate) => (
              <Card key={candidate.id} {...candidate} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CandidatesApplied;
