const jwt = require('jsonwebtoken');
const AdminModal = require('../modal/Admin.modal');

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust the secret key as necessary
    console.log(decoded);
    
    const user = await AdminModal.findById(decoded.admin.id);
    console.log(user);
    

    if (!user || user.userType !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = checkAdmin;
