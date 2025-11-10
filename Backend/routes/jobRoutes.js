import express from "express";
import { createJob, getJobs, getJobById, getMyJobs, getAppliedJobs, deleteJob, applyToJob, saveJob, unsaveJob, getSavedJobs, createJobAlert, getJobAlerts, deleteJobAlert, searchJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/", protect, createJob);
router.get("/:id", getJobById);
router.post("/:id/apply", protect, applyToJob);
router.post("/:id/save", protect, saveJob);
router.delete("/:id/save", protect, unsaveJob);
router.get("/saved", protect, getSavedJobs);
router.post("/alerts", protect, createJobAlert);
router.get("/alerts", protect, getJobAlerts);
router.delete("/alerts/:id", protect, deleteJobAlert);
router.get("/search", searchJobs);
router.get("/my-jobs", protect, getMyJobs);
router.get("/applied", protect, getAppliedJobs);
router.delete("/:id", protect, deleteJob);

export default router;
