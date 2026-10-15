import jwt from "jsonwebtoken";
import User from "../models/user-model";
export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized. Please log in.",
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token || !process.env.JWT_SECRET) {
            return res.status(401).json({
                message: "Invalid authentication token.",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch {
        return res.status(401).json({
            message: "Not authorized. Invalid or expired token.",
        });
    }
};
export const adminOnly = async (req, res, next) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Not authorized. Please log in.",
            });
        }
        const user = await User.findById(req.userId).select("accessLevel");
        if (!user || user.accessLevel !== "admin") {
            return res.status(403).json({
                message: "Admin access required.",
            });
        }
        next();
    }
    catch (error) {
        console.error("Admin authorization error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
};
//# sourceMappingURL=user-middleware.js.map