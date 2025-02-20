import jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';

const secret: Secret = process.env.JWT_SECRET || "secret";

export const generateToken = (data: String) => {
    let client = data || "guest"
    return jwt.sign({client}, secret, { expiresIn: '1h' });
}

export const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Access Denied: No token provided" });
    }

    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: "Access Denied: Invalid token" });
        }
        req.client = decoded.client;
        next();
    });
}