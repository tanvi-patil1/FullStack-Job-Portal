 import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    skills: [],
    resume: '',
    resumePath: '',
    experience: '',
    company: '',
    companyName: '',
    companyDescription: '',
    companyWebsite: '',
    companyLogo: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        skills: user.skills || [],
        resume: user.resume || '',
        resumePath: user.resumePath || '',
        experience: user.experience || '',
        company: user.company || '',
        companyName: user.companyName || '',
        companyDescription: user.companyDescription || '',
        companyWebsite: user.companyWebsite || '',
        companyLogo: user.companyLogo || '',
      });
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/auth/profile', formData);
      alert('Profile updated successfully');
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data); // Update user in context to reflect changes globally
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const handleSkillChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData({ ...formData, skills });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('resume', file);

    try {
      const { data } = await api.post('/auth/upload-resume', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedUser = { ...user, resumePath: data.resumePath };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert('Resume uploaded successfully');
    } catch (error) {
      alert('Failed to upload resume');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4"><i className="bi bi-person-circle me-2"></i>My Profile</h2>
              <div className="mb-4">
                <h5><i className="bi bi-info-circle me-2"></i>Account Information</h5>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role === 'jobseeker' ? 'Job Seeker' : 'Employer'}</p>
              </div>
              <form onSubmit={handleSubmit}>
                <h5 className="mb-3"><i className="bi bi-pencil-square me-2"></i>Edit Profile</h5>
                <div className="mb-3">
                  <label className="form-label">Skills (comma separated)</label>
                  <input type="text" className="form-control" value={formData.skills.join(', ')} onChange={handleSkillChange} placeholder="e.g., JavaScript, React, Node.js" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Resume</label>
                  <textarea className="form-control" rows="4" value={formData.resume} onChange={(e) => setFormData({ ...formData, resume: e.target.value })} placeholder="Describe your professional background..." />
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload Resume (PDF/DOC)</label>
                  <input type="file" className="form-control" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                  {formData.resumePath && (
                    <small className="text-muted">
                      Current file: <a href={`http://localhost:5000${formData.resumePath}`} target="_blank" rel="noopener noreferrer">View Resume</a>
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Experience</label>
                  <textarea className="form-control" rows="4" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} placeholder="List your work experience..." />
                </div>
                {user?.role === 'employer' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Company Name</label>
                      <input type="text" className="form-control" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="Your company name" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Company Description</label>
                      <textarea className="form-control" rows="3" value={formData.companyDescription} onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })} placeholder="Describe your company..." />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Company Website</label>
                      <input type="url" className="form-control" value={formData.companyWebsite} onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })} placeholder="https://yourcompany.com" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Company Logo URL</label>
                      <input type="url" className="form-control" value={formData.companyLogo} onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })} placeholder="https://yourcompany.com/logo.png" />
                    </div>
                  </>
                )}
                <button type="submit" className="btn btn-primary w-100"><i className="bi bi-save me-2"></i>Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
