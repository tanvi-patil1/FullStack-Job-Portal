import mongoose from 'mongoose';

const jobAlertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  criteria: {
    location: { type: String },
    type: { type: String, enum: ['full-time', 'part-time', 'contract', 'freelance'] },
    category: { type: String },
    keyword: { type: String },
  },
}, { timestamps: true });

const JobAlert = mongoose.model('JobAlert', jobAlertSchema);
export default JobAlert;
