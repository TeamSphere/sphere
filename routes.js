const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/api/sample', (req, res) => {
  res.json({ message: 'This is a sample API route' });
});

module.exports = router;