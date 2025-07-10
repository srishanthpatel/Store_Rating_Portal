const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getAllUsers = (req, res) => {
  db.query(
    'SELECT id, name, email, address, role FROM users',
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    }
  );
};
exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  db.query(
    'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
    [name, email, address, owner_id || null],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to add store' });
      res.json({ message: 'Store added successfully' });
    }
  );
};
exports.addOwner = async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!name || !email || !password || !address)
    return res.status(400).json({ error: 'All fields required' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)',
      [name, email, hashed, address, 'OWNER'],
      (err, result) => {
        if (err) {
          console.error('SQL ERROR OBJECT:', err);
          return res.status(500).json({
            error: 'Email Already Exists',
            code: err.code,
            message: err.sqlMessage
          });
        }

        res.status(201).json({ message: 'Owner created', owner_id: result.insertId });
      }
    );
  } catch (e) {
    console.error('Error hashing password:', e);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.adduser = async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!name || !email || !password || !address)
    return res.status(400).json({ error: 'All fields required' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)',
      [name, email, hashed, address, 'USER'],
      (err, result) => {
        if (err) {
          console.error('SQL ERROR OBJECT:', err);
          return res.status(500).json({
            error: 'Email Already Exists',
            code: err.code,
            message: err.sqlMessage
          });
        }

        res.status(201).json({ message: 'User created'});
      }
    );
  } catch (e) {
    console.error('rror hashing password:', e);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.addAdmin = async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!name || !email || !password || !address)
    return res.status(400).json({ error: 'All fields required' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)',
      [name, email, hashed, address, 'ADMIN'],
      (err, result) => {
        if (err) {
          console.error('SQL ERROR OBJECT:', err);
          return res.status(500).json({
            error: 'Email Already Exists',
            code: err.code,
            message: err.sqlMessage
          });
        }

        res.status(201).json({ message: 'Admin created'});
      }
    );
  } catch (e) {
    console.error('Error hashing password:', e);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getSummary = (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users)   AS users,
      (SELECT COUNT(*) FROM stores)  AS stores,
      (SELECT COUNT(*) FROM ratings) AS ratings
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows[0]);
  });
};

exports.getAllStores = (req, res) => {
  const sql = `
    SELECT s.id,
           s.name,
           s.email,
           s.address,
           ROUND(AVG(r.value), 2) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON r.store_id = s.id
    GROUP BY s.id
    ORDER BY s.name
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows); 
  });
};

exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, name, email, address, role FROM users ORDER BY name';
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
};