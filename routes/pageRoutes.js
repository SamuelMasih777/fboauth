const express = require('express');
const { getUserPages, getPageInsights } = require('../controllers/pageController');

const router = express.Router();

router.get('/', getUserPages);
router.get('/insights', getPageInsights);

module.exports = router;
