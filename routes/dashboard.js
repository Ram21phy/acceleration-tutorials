const express = require('express');
const User = require('../models/User');
const router = express.Router();

function requireLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

router.get('/dashboard', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render('dashboard', { user });
});

module.exports = router;
