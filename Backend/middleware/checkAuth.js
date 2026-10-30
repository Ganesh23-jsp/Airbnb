const checkAuth = (req, res, next) => {
    const isAuthenticated = req.headers.authorization;

    if (!isAuthenticated) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    next();
};

export default checkAuth;