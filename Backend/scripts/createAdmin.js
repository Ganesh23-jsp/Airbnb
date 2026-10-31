
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
    try {
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env");
        }

        await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");

        const email = process.env.ADMIN_EMAIL.toLowerCase().trim();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.role === "admin") {
                console.log("This admin account already exists.");
                return;
            }

            throw new Error(
                "An account with this email already exists. Use a separate admin email, or explicitly promote the existing account."
            );
        }

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            12
        );

        await User.create({
            name: "Airbnb Admin",
            email,
            password: hashedPassword,
            role: "admin",
            hostApplicationStatus: "not_applied"
        });

        console.log("Admin account created successfully.");
        console.log("Admin email:", email);

    } catch (error) {
        console.error("Admin creation failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
