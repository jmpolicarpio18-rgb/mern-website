const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_change_this');
    req.adminId = decoded.id;
    req.adminRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if admin is super-admin
const verifySuperAdmin = (req, res, next) => {
  if (req.adminRole !== 'super-admin') {
    return res.status(403).json({ message: 'Only super-admin can access this resource' });
  }
  next();
};

module.exports = {
  verifyToken,
  verifySuperAdmin
};
