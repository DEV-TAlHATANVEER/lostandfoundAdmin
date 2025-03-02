
const { validationResult } = require('express-validator');
const AdminModal = require('../modal/Admin.modal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Post = require('../modal/Post');

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let admin = await AdminModal.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    admin = new AdminModal({
      username,
      email,
      password,
    });

    await admin.save();

    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Login controller
exports.login = async (req, res) => {
    
  
    const { email, password } = req.body;
    console.log(email);
    
  
    try {
      let admin = await AdminModal.findOne({ email });
      if (!admin) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const payload = {
        admin: {
          id: admin._id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ msg: 'Admin Login successfully', token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };


exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.json({ success: true, posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
