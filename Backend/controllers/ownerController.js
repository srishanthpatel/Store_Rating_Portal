const db = require('../config/db');

exports.getStoreRatings = (req, res) => {
  const ownerId = req.user.id;

  db.query(
    `SELECT s.name AS storeName, r.value AS rating, u.name AS ratedBy
     FROM stores s
     JOIN ratings r ON r.store_id = s.id
     JOIN users u ON r.user_id = u.id
     WHERE s.owner_id = ?`,
    [ownerId],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    }
  );
};
