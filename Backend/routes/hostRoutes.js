
import express from "express";

import checkAuth from "../middleware/checkAuth.js";
import authorizeRole from "../middleware/authorizeRole.js";

import { applyToBecomeHost } from "../controller/hostController.js";

const router = express.Router();

// Only authenticated guests can apply to become hosts
router.post(
    "/apply",
    checkAuth,
    authorizeRole("guest"),
    applyToBecomeHost
);

export default router;
