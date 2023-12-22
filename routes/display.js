const path = require('path');

const express = require('express');

const displayController = require('../controllers/display');

const router = express.Router();

router.get('/', displayController.getIndex);

router.get('/items', displayController.getItems);

router.get('/items/:itemId', displayController.getItem);

/*
router.get('/cart', displayController.getCart);

router.post('/cart', displayController.postCart);

router.post('/cart-delete-item', displayController.postCartDeleteProduct);

router.get('/orders', displayController.getOrders);

router.get('/checkout', displayController.getCheckout);
*/
module.exports = router;
