"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMerchant = exports.authenticateJWT = void 0;
const jwt = require("jsonwebtoken");
const environment_1 = require("../enviroments/environment");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    // console.log("🔥 JWT middleware reached. Header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - Missing token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, (0, environment_1.getEnvironmentVariables)().jwt_secret_key);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log("❌ JWT Error:", err.message);
        return res.status(403).json({ message: "Invalid token" });
    }
};
exports.authenticateJWT = authenticateJWT;
const authenticateMerchant = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, (0, environment_1.getEnvironmentVariables)().jwt_secret_key);
        // Set user on request
        req.user = decoded;
        // Check if user has 'merchant' role
        if (!req.user.role || req.user.role !== 'merchant') {
            return res.status(403).json({ status: false, message: 'Access denied - Not a merchant', data: [] });
        }
        next();
    }
    catch (err) {
        console.error('❌ JWT Error:', err.message);
        return res.status(403).json({ status: false, message: 'Invalid or expired token', data: [] });
    }
};
exports.authenticateMerchant = authenticateMerchant;
// - If the token is **missing** or not in the right format (`Bearer <token>`),
//  it returns a 401 **Unauthorized** error.
// ---
// #### ```ts
//   const token = authHeader.split(' ')[1];
// - `jwt.verify(...)` checks if the token is valid.
// - If valid:
//   - It **decodes** the token (gets the user ID/email/etc.).
//   - It stores this data in `req.user` so you can use it in other routes.
//   - It calls `next()` to continue to the actual route.
// - If invalid:
//   - It catches the error and returns a `401 Unauthorized`.
// ---
// ### 🧪 Example Use in Route
// ```ts
// import { authenticate } from './middleware/authMiddleware';
// app.get('/api/profile', authenticate, (req, res) => {
//   res.json({ message: 'Welcome', user: req.user });
// });
