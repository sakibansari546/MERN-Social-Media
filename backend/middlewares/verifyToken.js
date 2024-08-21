import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }

        req.userId = decoded.userId;
        next();

    } catch (error) {
        console.error("Error in verifyToken: ", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Unauthorized: Token has expired" });
        }

        return res.status(500).json({ success: false, message: "Server error" });
    }
};
