import React from "react";
import { shortenString } from "../JobsDashboard/utils";

const Card = (props) => {
  const { name, skills, email } = props;

  return (
    <div className="col col-6">
      <div className="card mb-2">
        <div className="card-body">
          <h3 className="card-title">{name}</h3>

          <p>{email}</p>
          <div className="row justify-item-between">
            <div className="col">
              <p className="card-link btn btn-outline-primary btn-sm">
                {shortenString(skills, 40)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
