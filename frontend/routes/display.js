const path = require('path');

const express = require('express');

const displayController = require('../controllers/display');
const updateController = require('../controllers/update');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', displayController.getIndex);
router.get('/model/:modelId', displayController.getModelByID);
router.get('/images/:modelName', displayController.getModelImagesByName);
router.get('/contact-sheet', displayController.getContactSheet);

router.get('/add-model', updateController.getAddModel);
router.post('/add-model', updateController.postAddModel);

module.exports = router;
