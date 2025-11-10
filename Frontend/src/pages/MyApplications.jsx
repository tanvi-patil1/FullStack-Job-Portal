import React, { useState, useEffect } from "react";
import { getAppliedJobs } from "../services/api";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const { data } = await getAppliedJobs();
        setApplications(data);
      } catch (err) {
        setError("Failed to fetch your applications. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Loading your applications...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5 text-danger">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-send-check-fill text-primary me-2"></i>
        My Job Applications
      </h2>

      {applications.length === 0 ? (
        <div className="text-center mt-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3448/3448334.png"
            alt="No applications"
            width="120"
            className="mb-3"
          />
          <p className="fs-5 text-muted">You haven’t applied to any jobs yet.</p>
          <Link to="/jobs" className="btn btn-primary mt-2">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="row">
          {applications.map((job) => (
            <div key={job._id} className="col-md-6 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="text-decoration-none text-dark"
                    >
                      {job.title}
                    </Link>
                  </h5>
                  <p className="text-muted mb-1">{job.companyName}</p>
                  <p className="text-secondary mb-1">
                    <i className="bi bi-geo-alt"></i> {job.location}
                  </p>
                  <p className="text-success fw-semibold mb-2">
                    <i className="bi bi-cash-stack"></i> {job.salary ? `₹${job.salary}` : "Not disclosed"}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/jobs/${job._id}`} className="btn btn-outline-primary btn-sm">
                      View Details
                    </Link>
                    <span className={`badge ${job.status === "Accepted" ? "bg-success" : job.status === "Rejected" ? "bg-danger" : "bg-warning text-dark"}`}>
                      {job.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;


