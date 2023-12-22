const path = require('path');

const express = require('express');

const displayController = require('../controllers/display');

const router = express.Router();

router.get('/', displayController.getIndex);

router.get('/model/:modelId', displayController.getModel);

module.exports = router;
