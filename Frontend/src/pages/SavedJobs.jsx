import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const { data } = await api.get("/jobs/saved");
        setSavedJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchSavedJobs();
  }, [user]);

  const handleUnsave = async (jobId) => {
    try {
      await api.delete(`/jobs/${jobId}/save`);
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId));
      alert("Job unsaved successfully!");
    } catch (error) {
      alert("Failed to unsave job");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Loading your saved jobs...</p>
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-bookmark-fill text-primary me-2"></i>
        My Saved Jobs
      </h2>

      {savedJobs.length === 0 ? (
        <div className="text-center mt-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No jobs"
            width="120"
            className="mb-3"
          />
          <p className="fs-5 text-muted">You haven’t saved any jobs yet.</p>
          <Link to="/jobs" className="btn btn-primary mt-2">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="row">
          {savedJobs.map((job) => (
            <div key={job._id} className="col-md-6 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title mb-1 fw-semibold">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="text-decoration-none text-dark"
                        >
                          {job.title}
                        </Link>
                      </h5>
                      <p className="text-muted mb-1">{job.company}</p>
                      <p className="mb-1 text-secondary">
                        <i className="bi bi-geo-alt"></i> {job.location}
                      </p>
                      <p className="mb-1 text-secondary">
                        <i className="bi bi-briefcase"></i> {job.type}
                      </p>
                      <p className="text-success fw-semibold">
                        <i className="bi bi-cash-stack"></i>{" "}
                        {job.salary ? `₹${job.salary}` : "Not disclosed"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnsave(job._id)}
                      className="btn btn-light border-0 text-danger"
                      title="Unsave Job"
                    >
                      <i className="bi bi-bookmark-x-fill fs-5"></i>
                    </button>
                  </div>
                  <div className="mt-3">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </Link>
                    <button className="btn btn-primary btn-sm ms-2">
                      Apply Now
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

export default SavedJobs;
