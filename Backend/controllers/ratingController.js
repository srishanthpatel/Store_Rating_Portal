const db = require('../config/db');

exports.submitOrUpdateRating = (req, res) => {
  const userId = req.user.id;
  const { storeId, value } = req.body;

  if (!storeId || !value) return res.status(400).json({ error: 'storeId and value required' });

  db.query(
    `INSERT INTO ratings (user_id, store_id, value) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE value = ?`,
    [userId, storeId, value, value],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save rating' });
      res.json({ message: 'Rating submitted successfully' });
    }
  );
};
