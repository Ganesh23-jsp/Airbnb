
import express from "express";

import checkAuth from "../middleware/checkAuth.js";
import authorizeRole from "../middleware/authorizeRole.js";

import {
    getPendingHostApplications,
    approveHostApplication,
    rejectHostApplication
} from "../controller/adminController.js";

const router = express.Router();

// Every route below requires an authenticated admin
router.use(checkAuth, authorizeRole("admin"));

// View pending host applications
router.get(
    "/host-applications",
    getPendingHostApplications
);

// Approve a host application
router.patch(
    "/host-applications/:userId/approve",
    approveHostApplication
);

// Reject a host application
router.patch(
    "/host-applications/:userId/reject",
    rejectHostApplication
);

export default router;
