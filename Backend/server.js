
import express from "express";

import logger from "./middleware/logger.js";
//import checkAuth from "./middleware/checkAuth.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import hostRoutes from "./routes/hostRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

const app = express();
const PORT = 3000;

// --------------------
// Global Middleware
// --------------------

app.use(express.json());
app.use(logger);
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/host", hostRoutes);
app.use("/api/admin", adminRoutes);

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
