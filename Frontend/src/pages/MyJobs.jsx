import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { getMyJobs } from "../services/api";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const { data } = await getMyJobs();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      alert("Job deleted successfully!");
    } catch (error) {
      alert("Error deleting job. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted mt-2">Loading your posted jobs...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger mt-4 text-center" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Posted Jobs</h2>
        <Link to="/post-job" className="btn btn-success">
          + Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">You haven’t posted any jobs yet.</p>
          <Link to="/post-job" className="btn btn-primary mt-2">
            Post your first job
          </Link>
        </div>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <div key={job._id} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100 border-0">
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
                  <p className="text-secondary mb-2">
                    <i className="bi bi-geo-alt"></i> {job.location || "N/A"}
                  </p>
                  <p className="text-secondary mb-2">
                    <i className="bi bi-briefcase"></i> {job.type}
                  </p>
                  <p className="text-secondary mb-3">
                    <i className="bi bi-cash"></i> {job.salary || "Not disclosed"}
                  </p>

                  <div className="d-flex gap-2">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-job/${job._id}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
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

export default MyJobs;
