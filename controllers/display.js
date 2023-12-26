const Grls = require('../models/sql-grlsdb');

exports.addModel = (req, res, next) => {

	Promise.all([
		Grls.getAttributeList('ASHP'),
		Grls.getAttributeList('ASIZ'),
		Grls.getAttributeList('ATTR'),
		Grls.getAttributeList('BILD'),
		Grls.getAttributeList('BRDR'),
		Grls.getAttributeList('BRSH'),
		Grls.getAttributeList('BSIZ'),
		Grls.getAttributeList('CMPX'),
		Grls.getAttributeList('EYES'),
		Grls.getAttributeList('HAIR'),
		Grls.getAttributeList('NATN')
	])
	.then((arr) => {
		res.render('main-page/model-add', {
			ashp_list: arr[0],
			asiz_list: arr[1],
			attr_list: arr[2],
			bild_list: arr[3],
			brdr_list: arr[4],
			brsh_list: arr[5],
			bsiz_list: arr[6],
			cmpx_list: arr[7],
			eyes_list: arr[8],
			hair_list: arr[9],
			natn_list: arr[10],
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
