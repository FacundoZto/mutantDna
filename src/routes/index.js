const { Router } = require('express');
const { dnaChecker, dnaStats } = require('../controllers/dnaControllers.js');

const router = Router();

router.post('/mutant', dnaChecker);

router.get('/stats', dnaStats);

module.exports = router;