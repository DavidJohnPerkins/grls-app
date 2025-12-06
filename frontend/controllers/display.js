const fs = require('fs');

exports.getAddModel = (req, res, next) => {
	Promise.all([
		getData("http://localhost:8080/attributeList/ASHP"),
		getData("http://localhost:8080/attributeList/ASIZ"),
		getData("http://localhost:8080/attributeList/ATTR"),
		getData("http://localhost:8080/attributeList/BILD"),
		getData("http://localhost:8080/attributeList/BRDR"),
		getData("http://localhost:8080/attributeList/BRSH"),
		getData("http://localhost:8080/attributeList/BSIZ"),
		getData("http://localhost:8080/attributeList/CMPX"),
		getData("http://localhost:8080/attributeList/ETHN"),
		getData("http://localhost:8080/attributeList/EYES"),
		getData("http://localhost:8080/attributeList/HAIR"),
		getData("http://localhost:8080/attributeList/MONS"),
		getData("http://localhost:8080/attributeList/NATN"),
		getData("http://localhost:8080/attributeList/NPCL"),
		getData("http://localhost:8080/attributeList/NPPF"),
		getData("http://localhost:8080/attributeList/NPSH"),
		getData("http://localhost:8080/attributeList/NPSZ"),
		getData("http://localhost:8080/attributeList/PUAT"),
		getData("http://localhost:8080/attributeList/YTHF"),
		getData("http://localhost:8080/flaglist")
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
			ethn_list: arr[8],
			eyes_list: arr[9],
			hair_list: arr[10],
			mons_list: arr[11],
			natn_list: arr[12],
			npcl_list: arr[13],
			nppf_list: arr[14],
			npsh_list: arr[15],
			npsz_list: arr[16],
			puat_list: arr[17],
			ythf_list: arr[18],
			flag_list: arr[19],
			pageTitle: 'Add Model',
			path: '/add-model'
		});
	})
	.catch(err => console.log(err));
}

exports.postAddModel = (req, res, next) => {
	try {
		if (!req.body || typeof req.body !== 'object') {
			return res.status(400).json({ error: 'Invalid request body' });
		}
		
		//const modelData = JSON.stringify(req.body);
		postData('http://localhost:8080/addModel', req.body)
			.then(([model]) => {
				const modelId = model.model_id;
				console.log(`about to redirect: ${modelId}`);
				res.redirect(`/model/${modelId}`);
			})
			.catch(err => console.log(err));		
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

async function postData(url, reqBody) {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(reqBody)
	});

	const body = await response.json();
	console.log(`Returned from add model: ${body}`);

	return body;
};

async function getData(url) {
	const response = await fetch(url);
	const body = await response.json();
	return body;
};

exports.getIndex = (req, res, next) => {
	getData('http://localhost:8080/')
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
	getData(`http://localhost:8080/model/${modelId}`)
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

exports.getModelId = (req, res, next) => {
	getData('http://localhost:8080/modelId')
		.then(([model]) => {
			const modelId = model.model_id;
			console.log(modelId);
			res.redirect(`/model/${modelId}`);
		})
		.catch(err => console.log(err));
};