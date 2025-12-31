import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get token from headers
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token, authorization denied' });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user info to request
        req.user = { id: decoded.id };  // now we can access req.user.id

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

export default authMiddleware;
