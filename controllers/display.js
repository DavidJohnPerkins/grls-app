const Product = require('../models/os_map');

exports.getItems = (req, res, next) => {
	Product.fetchAll()
		.then((rows) => {
			res.render('main-page/os-map-list', {
				items: rows,
				pageTitle: 'All OS Explorer Maps',
				path: '/'
			});
		})
		.catch(err => console.log(err));
};

exports.getItem = (req, res, next) => {
	const itemId = req.params.itemId;
	Product.findById(itemId)
		.then(([item]) => {
			res.render('main-page/product-detail', {
				item: item,
				pageTitle: item.map_title,
				path: '/product'
			});
		})
    	.catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then((rows) => {
			res.render('main-page/index', {
				items: rows,
				pageTitle: 'OS Explorer List',
				path: '/'
			});
		})
    	.catch(err => console.log(err));
};
/*
exports.getCart = (req, res, next) => {
	Cart.getCart(cart => {
	Product.fetchAll(products => {
		const cartProducts = [];
		for (product of products) {
		const cartProductData = cart.products.find(
			prod => prod.id === product.id
		);
		if (cartProductData) {
			cartProducts.push({ productData: product, qty: cartProductData.qty });
		}
		}
		res.render('shop/cart', {
		path: '/cart',
		pageTitle: 'Your Cart',
		products: cartProducts
		});
	});
	});
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
*/