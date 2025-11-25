const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Login page
router.get('/login', (req, res) => res.render('authentication/login', { pageTitle: 'Login' }));

// Register page
router.get('/register', (req, res) => res.render('authentication/register', { pageTitle: 'Register' }));

// Register POST
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Let the User model hash the password via pre-save hook
    const user = await User.create({ name, email, password });
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    const message = err && err.code === 11000 ? 'User already exists.' : 'Registration failed.';
    res.render('authentication/register', { error: message });
  }
});

// Login POST
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.render('authentication/login', { error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.render('authentication/login', { error: 'Invalid credentials' });

  req.session.userId = user._id;
  res.redirect('/dashboard');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
