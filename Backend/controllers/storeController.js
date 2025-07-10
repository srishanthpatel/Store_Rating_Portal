const db = require('../config/db');

exports.getAllStores = (req, res) => {
  const userId = req.user.id; // optional
  const search = req.query.search || '';

  const query = `
    SELECT s.id, s.name, s.address,
      ROUND(AVG(r.value), 1) AS average_rating,
      (SELECT value FROM ratings WHERE user_id = ? AND store_id = s.id) AS user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.name LIKE ? OR s.address LIKE ?
    GROUP BY s.id
  `;

  db.query(query, [userId, `%${search}%`, `%${search}%`], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch stores' });
    res.json(results);
  });
};
