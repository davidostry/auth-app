import { verifyToken } from '../services/token.js';

export async function auth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) res.status(401).json({ message: "authorization is missing in headers" });
    if (!authorization.startsWith("Bearer ")) return res.status(401).json({ message: "invalid authorization format" });
    const token = authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "unauthorized" });


    try {
        const decoded = await verifyToken(token)
        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "invalid or expired token"
        });
    }
}

