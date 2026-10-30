
import express from "express";

import logger from "./middleware/logger.js";
import checkAuth from "./middleware/checkAuth.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import Property from "./models/Property.js";

const app = express();
const PORT = 3000;

// --------------------
// Global Middleware
// --------------------

app.use(express.json());
app.use(logger);

// Request-time middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    console.log("Request received at:", req.requestTime);

    next();
});

// --------------------
// Temporary Property Data
// --------------------



// --------------------
// Basic API Routes
// --------------------

app.get("/about", (req, res) => {
    res.send("Welcome to Airbnb Backend!");
});

// GET all properties
app.get("/api/properties", checkAuth, async (req, res, next) => {
    try {
        console.log("Route received request at:", req.requestTime);

        const properties = await Property.find();

        res.status(200).json({
            success: true,
            count: properties.length,
            properties
        });
    } catch (error) {
        next(error);
    }
});

// POST create a property
app.post("/api/properties", (req, res) => {
    const { title, location, pricePerNight } = req.body;

    if (!title || !location || pricePerNight === undefined) {
        return res.status(400).json({
            message: "Title, location, and price are required"
        });
    }

    if (
        typeof pricePerNight !== "number" ||
        !Number.isFinite(pricePerNight) ||
        pricePerNight <= 0
    ) {
        return res.status(400).json({
            message: "Price must be a positive number"
        });
    }

    const newProperty = {
        id: properties.length + 1,
        title,
        location,
        pricePerNight
    };

    properties.push(newProperty);

    res.status(201).json({
        message: "Property created successfully",
        property: newProperty
    });
});

// PUT update a property
app.put("/api/properties/:id", (req, res) => {
    const propertyId = Number(req.params.id);

    const property = properties.find(
        (p) => p.id === propertyId
    );

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    const { title, location, pricePerNight } = req.body;

    if (!title || !location || pricePerNight === undefined) {
        return res.status(400).json({
            message: "Title, location, and price are required"
        });
    }

    if (
        typeof pricePerNight !== "number" ||
        !Number.isFinite(pricePerNight) ||
        pricePerNight <= 0
    ) {
        return res.status(400).json({
            message: "Price must be a positive number"
        });
    }

    property.title = title;
    property.location = location;
    property.pricePerNight = pricePerNight;

    res.json({
        message: "Property updated successfully",
        property
    });
});

// DELETE a property
app.delete("/api/properties/:id", (req, res) => {
    const propertyId = Number(req.params.id);

    const propertyIndex = properties.findIndex(
        (p) => p.id === propertyId
    );

    if (propertyIndex === -1) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    const deletedProperty = properties.splice(propertyIndex, 1);

    res.json({
        message: "Property deleted successfully",
        property: deletedProperty[0]
    });
});

// --------------------
// Error Testing Route
// --------------------

app.get("/test-error", (req, res, next) => {
    const error = new Error("This is a test error");

    error.statusCode = 400;

    next(error);
});

// --------------------
// Centralized Error Handler
// --------------------

app.use(errorHandler);

// --------------------
// Connect Database and Start Server
// --------------------

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Airbnb backend server is running on port ${PORT}`);
    });
};

startServer();
