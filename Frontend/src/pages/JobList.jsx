import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get("/jobs");
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  // Unique company list for filter dropdown
  const companyList = [...new Set(jobs.map((job) => job.company))];

  // Apply filters
  useEffect(() => {
    let results = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true) &&
        (jobType ? job.type === jobType : true) &&
        (company ? job.company === company : true)
      );
    });
    setFilteredJobs(results);
  }, [search, location, jobType, company, jobs]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Job Listings</h2>

      {/* Filters Section */}
      <div className="filter-section">
        <h3 className="filter-title">Filter Jobs</h3>
        <div className="row g-3 align-items-center">
          {/* Search */}
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Search jobs..."
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Location..."
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Job Type */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Company */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">All Companies</option>
              {companyList.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="col-md-4 mb-4">
              <div className="job-card h-100">
                <div className="card-body">
                  <h5 className="job-title">{job.title}</h5>
                  <p className="job-company">{job.company}</p>
                  <p className="job-location">
                    <i className="bi bi-geo-alt"></i> {job.location}
                  </p>
                  <span className="badge bg-info text-dark me-2">{job.type}</span>
                  <Link to={`/jobs/${job._id}`} className="btn btn-primary mt-3">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No jobs found matching your filters.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
