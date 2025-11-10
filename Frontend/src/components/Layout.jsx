import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10223/10223576.png"
              alt="Jobify Logo"
              style={{ width: '30px', height: '30px', marginRight: '8px' }}
            />
            Jobify
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Left Links */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/jobs">
                  <i className="bi bi-search me-1"></i>Find Jobs
                </Link>
              </li>
              {user?.role === 'employer' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/post-job">
                    <i className="bi bi-plus-circle me-1"></i>Post Job
                  </Link>
                </li>
              )}
            </ul>

            {/* Right Links */}
            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link text-white"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-1"></i>{user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person me-2"></i>Profile
                      </Link>
                    </li>

                    {user.role === 'jobseeker' ? (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/my-applications">
                            <i className="bi bi-send-check me-2"></i>My Applications
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/saved-jobs">
                            <i className="bi bi-bookmark me-2"></i>Saved Jobs
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/job-alerts">
                            <i className="bi bi-bell me-2"></i>Job Alerts
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link className="dropdown-item" to="/my-jobs">
                          <i className="bi bi-building me-2"></i>My Jobs
                        </Link>
                      </li>
                    )}

                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link btn btn-primary ms-2 text-white" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Page content renders here */}
      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
