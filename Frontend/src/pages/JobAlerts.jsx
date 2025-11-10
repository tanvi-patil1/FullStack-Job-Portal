import { useEffect, useState } from 'react';
import api from '../services/api';

const JobAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({ criteria: {} });

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data } = await api.get('/jobs/alerts');
        setAlerts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAlerts();
  }, []);

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs/alerts', newAlert);
      alert('Job alert created');
      setNewAlert({ criteria: {} });
      // Refresh alerts
      const { data } = await api.get('/jobs/alerts');
      setAlerts(data);
    } catch (error) {
      alert('Failed to create job alert');
    }
  };

  const handleDeleteAlert = async (id) => {
    try {
      await api.delete(`/jobs/alerts/${id}`);
      setAlerts(alerts.filter(alert => alert._id !== id));
      alert('Job alert deleted');
    } catch (error) {
      alert('Failed to delete job alert');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4"><i className="bi bi-bell me-2"></i>My Job Alerts</h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <h5 className="card-title">Create New Job Alert</h5>
          <form onSubmit={handleCreateAlert}>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={newAlert.criteria.location || ''}
                  onChange={(e) => setNewAlert({ ...newAlert, criteria: { ...newAlert.criteria, location: e.target.value } })}
                  placeholder="e.g., New York"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Job Type</label>
                <select
                  className="form-select"
                  value={newAlert.criteria.type || ''}
                  onChange={(e) => setNewAlert({ ...newAlert, criteria: { ...newAlert.criteria, type: e.target.value } })}
                >
                  <option value="">Any</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={newAlert.criteria.category || ''}
                  onChange={(e) => setNewAlert({ ...newAlert, criteria: { ...newAlert.criteria, category: e.target.value } })}
                  placeholder="e.g., IT, Marketing"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Keyword</label>
                <input
                  type="text"
                  className="form-control"
                  value={newAlert.criteria.keyword || ''}
                  onChange={(e) => setNewAlert({ ...newAlert, criteria: { ...newAlert.criteria, keyword: e.target.value } })}
                  placeholder="e.g., JavaScript"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              <i className="bi bi-plus-circle me-2"></i>Create Alert
            </button>
          </form>
        </div>
      </div>

      <h3 className="mb-3">Existing Alerts</h3>
      {alerts.length > 0 ? (
        <div className="row">
          {alerts.map(alert => (
            <div key={alert._id} className="col-md-6 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Job Alert</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {alert.criteria.location || 'Any'}<br />
                    <strong>Type:</strong> {alert.criteria.type || 'Any'}<br />
                    <strong>Category:</strong> {alert.criteria.category || 'Any'}<br />
                    <strong>Keyword:</strong> {alert.criteria.keyword || 'Any'}
                  </p>
                  <p className="text-muted">Created: {new Date(alert.createdAt).toLocaleDateString()}</p>
                  <button onClick={() => handleDeleteAlert(alert._id)} className="btn btn-danger">
                    <i className="bi bi-trash me-2"></i>Delete Alert
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted">No job alerts set up yet.</p>
        </div>
      )}
    </div>
  );
};

export default JobAlerts;
