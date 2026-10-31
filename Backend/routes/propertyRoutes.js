import express from "express";

import checkAuth from "../middleware/checkAuth.js";
import authorizeRole from "../middleware/authorizeRole.js";

import {
    getProperties,
    createProperty,
    updateProperty,
    deleteProperty
} from "../controller/propertyController.js";

const router = express.Router();

// Anyone can view properties
router.get("/", getProperties);

// Only hosts and admins can create properties
router.post(
    "/",
    checkAuth,
    authorizeRole("host", "admin"),
    createProperty
);

// Only hosts and admins can update properties
router.put(
    "/:id",
    checkAuth,
    authorizeRole("host", "admin"),
    updateProperty
);

// Only hosts and admins can delete properties
router.delete(
    "/:id",
    checkAuth,
    authorizeRole("host", "admin"),
    deleteProperty
);

export default router;