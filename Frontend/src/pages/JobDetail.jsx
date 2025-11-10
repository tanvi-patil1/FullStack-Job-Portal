import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const { user } = useAuth();
  const [isApplying, setIsApplying] = useState(false);

  // Fetch selected job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id]);

  // Fetch similar jobs (based on job type or location)
  useEffect(() => {
    const fetchSimilarJobs = async () => {
      if (!job) return;
      try {
        const { data } = await api.get("/jobs");
        const filtered = data.filter(
          (j) =>
            j._id !== job._id &&
            (j.type === job.type || j.location === job.location)
        );
        setSimilarJobs(filtered.slice(0, 3)); // show top 3 similar
      } catch (error) {
        console.error("Error fetching similar jobs:", error);
      }
    };
    fetchSimilarJobs();
  }, [job]);

  const handleApply = async () => {
    try {
      setIsApplying(true);
      await api.post(`/jobs/${id}/apply`);
      alert("✅ Application submitted successfully!");
    } catch (error) {
      alert("❌ Application failed. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  if (!job)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading job details...</p>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="fw-bold mb-2">{job.title}</h2>
        <p className="text-muted mb-1">
          <i className="bi bi-building"></i> {job.company}
        </p>
        <p className="text-secondary mb-1">
          <i className="bi bi-geo-alt"></i> {job.location}
        </p>
        <p className="text-secondary mb-3">
          <i className="bi bi-cash"></i> {job.salary || "Not disclosed"}
        </p>

        <span className="badge bg-info text-dark mb-3">{job.type}</span>

        <h5 className="fw-semibold mt-3">Job Description</h5>
        <p className="text-muted">{job.description}</p>

        {user && user.role === "jobseeker" && (
          <button
            onClick={handleApply}
            className="btn btn-success mt-3"
            disabled={isApplying}
          >
            {isApplying ? "Applying..." : "Apply Now"}
          </button>
        )}
      </div>

      {/* Similar Jobs Section */}
      {similarJobs.length > 0 && (
        <div className="mt-5">
          <h4 className="fw-bold mb-3">Similar Jobs</h4>
          <div className="row">
            {similarJobs.map((sj) => (
              <div key={sj._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{sj.title}</h5>
                    <p className="text-muted mb-1">{sj.company}</p>
                    <p className="text-secondary mb-2">{sj.location}</p>
                    <span className="badge bg-light text-dark">
                      {sj.type}
                    </span>
                    <div>
                      <Link
                        to={`/jobs/${sj._id}`}
                        className="btn btn-outline-primary btn-sm mt-3"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
