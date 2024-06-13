// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log('token',token)

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        console.error("Token error:", error);
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default authMiddleware;
