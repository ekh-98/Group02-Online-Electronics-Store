const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET /books');
});

router.post('/', (req, res) => {
  res.send('POST /books');
});

module.exports = router;