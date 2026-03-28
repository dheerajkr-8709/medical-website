// Basic admin check middleware
const adminAuth = (req, res, next) => {
  const adminSecret = req.headers['x-admin-secret'];
  if (adminSecret === 'shreeram-admin-2024') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Admin access only' });
  }
};

module.exports = { adminAuth };
