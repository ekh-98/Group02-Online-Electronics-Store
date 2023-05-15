const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET /customers');
});

router.post('/', (req, res) => {
  res.send('POST /customers');
});

module.exports = router;