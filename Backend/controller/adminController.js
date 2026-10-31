
import User from "../models/User.js";

// Get all pending host applications
export const getPendingHostApplications = async (req, res, next) => {
    try {
        const applications = await User.find({
            role: "guest",
            hostApplicationStatus: "pending"
        }).select("name email hostApplicationStatus createdAt");

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {
        next(error);
    }
};

// Approve a host application
export const approveHostApplication = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({
            _id: userId,
            role: "guest",
            hostApplicationStatus: "pending"
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Pending host application not found"
            });
        }

        user.role = "host";
        user.hostApplicationStatus = "approved";

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Host application approved successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                hostApplicationStatus: user.hostApplicationStatus
            }
        });

    } catch (error) {
        next(error);
    }
};

// Reject a host application
export const rejectHostApplication = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({
            _id: userId,
            role: "guest",
            hostApplicationStatus: "pending"
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Pending host application not found"
            });
        }

        user.hostApplicationStatus = "rejected";

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Host application rejected successfully",
            applicationStatus: user.hostApplicationStatus
        });

    } catch (error) {
        next(error);
    }
};
