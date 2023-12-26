const Grls = require('../models/sql-grlsdb');

exports.addModel = (req, res, next) => {

	Promise.all([
		Grls.getAttributeList('ASHP'),
		Grls.getAttributeList('NATN'),
		Grls.getAttributeList('EYES'),
		Grls.getAttributeList('HAIR')
	])
	.then((arr) => {
		res.render('main-page/model-add', {
			ashp_list: arr[0],
			natn_list: arr[1],
			eyes_list: arr[2],
			hair_list: arr[3],
			pageTitle: 'Add Model',
			path: '/add-model'
		});
	})
	.catch(err => console.log(err));
}


exports.getIndex = (req, res, next) => {
	Grls.fetchAll()
		.then((rows) => {
			res.render('main-page/model-list', {
				models: rows,
				pageTitle: 'Model List',
				path: '/'
			});
		})
    	.catch(err => console.log(err));
};

exports.getModel = (req, res, next) => {
	const modelId = req.params.modelId;
	Grls.findById(modelId)
		.then(([model]) => {
			res.render('main-page/model-detail', {
				model: model,
				pageTitle: model.principal_name,
				path: '/'
			});
		})
    	.catch(err => console.log(err));
};
