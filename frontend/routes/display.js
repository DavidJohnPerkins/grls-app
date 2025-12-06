const path = require('path');

const express = require('express');

const displayController = require('../controllers/display');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', displayController.getIndex);
router.get('/model/:modelId', displayController.getModelByID);
router.get('/images/:modelName', displayController.getModelImagesByName);
router.get('/add-model', displayController.getAddModel);
router.post('/add-model', displayController.postAddModel)
/*
router.post('/add-model', (req, res) => {
    const modelData = req.body;  
    console.log('Received model data:', modelData);  
    // Respond with JSON  
    res.json({ message: 'Model added successfully', data: modelData });
});
*/
router.get('/contact-sheet', displayController.getModelId)

module.exports = router;
