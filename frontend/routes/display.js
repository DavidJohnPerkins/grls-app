const path = require('path');

const express = require('express');

const displayController = require('../controllers/display');
const editController = require('../controllers/update');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', displayController.getIndex);
router.get('/model/:modelId', displayController.getModelByID);
router.get('/images/:modelName', displayController.getModelImagesByName);
router.get('/contact-sheet', displayController.getModelId)

router.get('/add-model', displayController.getAddModel);
router.post('/add-model', editController.postAddModel)

module.exports = router;
