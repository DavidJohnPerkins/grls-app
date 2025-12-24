const fs = require('fs');
const dbfunc = require('../util/db_function');

exports.getIndex = (req, res, next) => {
	dbfunc.getData('http://localhost:8080/')
		.then((rows) => {
			res.render('main-page/model-list', {
				models: rows,
				pageTitle: 'Model List',
				path: '/'
			});
		})
		.catch(err => console.log(err));
};

exports.getModelByID = (req, res, next) => {
	const modelId = req.params.modelId;
	dbfunc.getData(`http://localhost:8080/model/${modelId}`)
		.then(([model]) => {
			imgPath = model.principal_name.substring(0, 1) + "/" + model.principal_name;
			res.render('main-page/model-detail', {
				model: model,
				pageTitle: model.principal_name,
				imagePath: imgPath,
				path: '/'
			});
		})
		.catch(err => console.log(err));
};

exports.getModelImagesByName = (req, res, next) => {
	const modelName = req.params.modelName;
	localPath = "../../../../public/detail/" + modelName.substring(0, 1) + "/" + modelName;
	imgPath = modelName.substring(0, 1) + "/" + modelName;
	
	var photos = [];
	fs.readdirSync(localPath).filter(fn => fn.endsWith('.jpg')).forEach(file => {
		photos.push(file);
	})
	res.render('main-page/model-photo-list', {
		photos: photos,
		pageTitle: modelName,
		imagePath: imgPath,
		path: '/'
	});
};

exports.getContactSheet = (req, res, next) => {
	imgPath = "../../../../public/thumbnail/";
	
	var photos = [];
	fs.readdirSync(imgPath).filter(fn => fn.endsWith('.jpg')).forEach(file => {
		photos.push(file);
	})
	res.render('main-page/model-photo-list', {
		photos: photos,
		pageTitle: modelName,
		imagePath: imgPath,
		path: '/'
	});
};

exports.getModelId = (req, res, next) => {
	dbfunc.getData('http://localhost:8080/modelId')
		.then(([model]) => {
			const modelId = model.model_id;
			console.log(modelId);
			res.redirect(`/model/${modelId}`);
		})
		.catch(err => console.log(err));
};
