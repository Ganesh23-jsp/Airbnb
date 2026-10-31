import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");

        console.log("MongoDB connected successfully");

        console.log("Connected database:", mongoose.connection.name);
        console.log("Connected host:", mongoose.connection.host);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;