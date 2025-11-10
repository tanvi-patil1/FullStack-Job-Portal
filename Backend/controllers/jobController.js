import Job from '../models/Job.js';
import JobAlert from '../models/JobAlert.js';
import User from '../models/User.js';

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate('postedBy', 'name email companyName');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const newJob = new Job({
      ...req.body,
      postedBy: req.user._id,
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email companyName');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.applications.some(app => app.user.toString() === req.user._id.toString())) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    job.applications.push({ user: req.user._id });
    await job.save();
    res.status(200).json({ message: 'Applied successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ 'applications.user': req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.savedJobs.includes(req.params.id)) {
      user.savedJobs.push(req.params.id);
      await user.save();
    }
    res.status(200).json({ message: 'Job saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unsaveJob = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $pull: { savedJobs: req.params.id } });
    res.status(200).json({ message: 'Job unsaved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedJobs');
    res.json(user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJobAlert = async (req, res) => {
  try {
    const alert = new JobAlert({ ...req.body, user: req.user._id });
    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobAlerts = async (req, res) => {
  try {
    const alerts = await JobAlert.find({ user: req.user._id });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJobAlert = async (req, res) => {
  try {
    await JobAlert.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Alert deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchJobs = async (req, res) => {
  try {
    const { keyword } = req.query;
    const jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    }).populate('postedBy', 'name email companyName');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getJobs, createJob, getJobById, applyToJob, getMyJobs, getAppliedJobs, saveJob, unsaveJob, getSavedJobs, createJobAlert, getJobAlerts, deleteJob, deleteJobAlert, searchJobs };
