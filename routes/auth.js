const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

module.exports = router;