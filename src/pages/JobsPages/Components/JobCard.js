import React from "react";
import { shortenString } from "../../JobsPages/JobsDashboard/utils";

export default function JobCard(props) {
  const { title, description, location, onOpenModal } = props;

  return (
    <div className="col col-4">
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">{title}</h3>

          <p>{shortenString(description, 100)}</p>
          <div className="row justify-item-between">
            <div className="col">
              <button className="card-link btn btn-outline-primary btn-sm">
                {shortenString(location.toUpperCase(), 20)}
              </button>
            </div>
            <div className="col text-end">
              <button
                onClick={onOpenModal}
                className="card-link btn btn-success btn-sm "
                type="button"
              >
                View Applicants
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
