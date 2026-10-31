
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["guest", "host", "admin"],
            default: "guest"
        },

        hostApplicationStatus: {
            type: String,
            enum: ["not_applied", "pending", "approved", "rejected"],
            default: "not_applied"
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
