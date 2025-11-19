const path = require('path');

const express = require('express');

const displayController = require('../controllers/display');

const router = express.Router();
//router.use(express.static(path.join(__dirname, 'public')));

router.get('/', displayController.getIndex);
router.get('/model/:modelId', displayController.getModelByID);
router.get('/images/:modelName', displayController.getModelImagesByName);
router.get('/add-model', displayController.getAddModel);
//router.post('/add-model', displayController.postAddModel)


module.exports = router;
