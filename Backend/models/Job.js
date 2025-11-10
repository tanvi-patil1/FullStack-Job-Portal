import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  type: { type: String, enum: ['full-time', 'part-time', 'contract', 'freelance'], default: 'full-time' },
  experienceLevel: { type: String, enum: ['entry', 'mid', 'senior'], default: 'entry' },
  companyType: { type: String, enum: ['startup', 'mnc', 'government'], default: 'startup' },
  category: { type: String, enum: ['it', 'marketing', 'hr', 'finance', 'other'], default: 'other' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applications: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appliedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' }
  }],
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
