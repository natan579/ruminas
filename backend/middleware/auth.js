const jwt = require('jsonwebtoken');

// ============================================
// JWT VERIFICATION MIDDLEWARE
// ============================================

const verifyToken = (req, res, next) => {
    try {
        // Get token from headers
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// ============================================
// EXPORT MIDDLEWARE
// ============================================

module.exports = { verifyToken };