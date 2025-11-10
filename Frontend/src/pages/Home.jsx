import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center text-white py-5">
        <div className="container hero-content">
          <h1 className="hero-title">Welcome to Jobify</h1>
          <p className="hero-subtitle">Your career starts here. Find jobs or hire talent with ease!</p>


          {!user ? (
            <div className="d-flex justify-content-center gap-3">
              <Link to="/login" className="btn btn-light btn-lg">Login</Link>
              <Link to="/signup" className="btn btn-outline-light btn-lg">Signup</Link>
            </div>
          ) : (
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {user.role === 'jobseeker' ? (
                <>
                  <Link to="/jobs" className="btn btn-primary btn-lg">Browse Jobs</Link>
                  <Link to="/my-applications" className="btn btn-info btn-lg">My Applications</Link>
                  <Link to="/saved-jobs" className="btn btn-warning btn-lg">Saved Jobs</Link>
                </>
              ) : (
                <>
                  <Link to="/post-job" className="btn btn-success btn-lg">Post a Job</Link>
                  <Link to="/my-jobs" className="btn btn-secondary btn-lg">My Jobs</Link>
                </>
              )}
              <Link to="/profile" className="btn btn-light btn-lg">My Profile</Link>
            </div>
          )}
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="container py-5">
        <div className="row text-center">
          {/* Job Seeker Box */}
          <div className="col-md-6 mb-4">
            <Link to={user?.role === 'jobseeker' ? '/jobs' : '/signup'} className="text-decoration-none">
              <div className="role-box h-100">
                <h3 className="fw-bold mb-3">I’m a Job Seeker</h3>
                <p>
                  Explore thousands of job listings, apply instantly, and get hired by top companies.
                </p>
                <div className="btn btn-primary mt-3">
                  {user?.role === 'jobseeker' ? 'Browse Jobs' : 'Signup to Start'}
                </div>
              </div>
            </Link>
          </div>

          {/* Employer Box */}
          <div className="col-md-6 mb-4">
            <Link to={user?.role === 'employer' ? '/post-job' : '/signup'} className="text-decoration-none">
              <div className="role-box h-100">
                <h3 className="fw-bold mb-3">I’m an Employer</h3>
                <p>
                  Post job openings, review applications, and hire the right talent for your team.
                </p>
                <div className="btn btn-success mt-3">
                  {user?.role === 'employer' ? 'Post a Job' : 'Signup to Start'}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Optional Features Section */}
      <section className="features-section">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Why Choose Jobify?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-item">
                <i className="bi bi-briefcase-fill text-primary mb-3"></i>
                <h5>Verified Jobs</h5>
                <p>All listings are screened for authenticity and active hiring.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-item">
                <i className="bi bi-person-check-fill text-success mb-3"></i>
                <h5>Instant Apply</h5>
                <p>One-click apply to jobs that match your skills and goals.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-item">
                <i className="bi bi-building-fill text-info mb-3"></i>
                <h5>For Employers</h5>
                <p>Reach thousands of qualified candidates across all domains.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hover-scale:hover {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
};

export default Home;
