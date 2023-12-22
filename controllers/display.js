const Grls = require('../models/sql-grlsdb');

exports.getModel = (req, res, next) => {
	const modelId = req.params.modelId;
	Grls.findById(modelId)
		.then(([model]) => {
			res.render('main-page/model-detail', {
				item: model,
				pageTitle: model.principal_name,
				path: '/model'
			});
		})
    	.catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
	Grls.fetchAll()
		.then((rows) => {
			res.render('main-page/model-list', {
				items: rows,
				pageTitle: 'Model List',
				path: '/'
			});
		})
    	.catch(err => console.log(err));
};
