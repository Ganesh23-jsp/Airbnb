
import User from "../models/User.js";

export const applyToBecomeHost = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role === "host") {
            return res.status(400).json({
                success: false,
                message: "You are already a host"
            });
        }

        if (user.role === "admin") {
            return res.status(400).json({
                success: false,
                message: "Admins cannot apply to become hosts"
            });
        }

        if (user.hostApplicationStatus === "pending") {
            return res.status(400).json({
                success: false,
                message: "Your host application is already pending"
            });
        }

        if (user.hostApplicationStatus === "approved") {
            return res.status(400).json({
                success: false,
                message: "Your host application is already approved"
            });
        }

        user.hostApplicationStatus = "pending";

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Host application submitted successfully",
            applicationStatus: user.hostApplicationStatus
        });

    } catch (error) {
        next(error);
    }
};
