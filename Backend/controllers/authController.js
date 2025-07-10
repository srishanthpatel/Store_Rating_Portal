const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER a new normal user
exports.register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Validate required fields
    if (!name || !email || !password || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) return res.status(500).json({ message: 'DB error' });

      if (result.length > 0) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, address, 'USER'],
        (err2, result2) => {
          if (err2) return res.status(500).json({ message: 'Error registering user' });
          return res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// LOGIN user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('[LOGIN] Email:', email);
  console.log('[LOGIN] Plain Password:', password);

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('[LOGIN] DB error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        console.log('[LOGIN] No user found for email:', email);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('[LOGIN] Password match?', isMatch);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        accessToken: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address
        }
      });
    });
  } catch (err) {
    console.error('[LOGIN] Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return res.status(400).json({ error: 'Both passwords are required' });

  db.query('SELECT password FROM users WHERE id = ?', [userId], async (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, results[0].password);
    if (!isMatch) return res.status(401).json({ error: 'Old password is incorrect' });

    const hashedNewPwd = await bcrypt.hash(newPassword, 10);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPwd, userId], (err2) => {
      if (err2) return res.status(500).json({ error: 'Error updating password' });
      res.json({ message: 'Password updated successfully' });
    });
  });
};
