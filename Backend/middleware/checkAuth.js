import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token required."
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user information to request
        req.user = decoded;

        next();

    }  catch (error) {
    console.error("JWT Error:", error.name, error.message);

    return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
    });
}
};

export default checkAuth;