import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const user = await User.findById(decoded.user_id);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user; // Add user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;
