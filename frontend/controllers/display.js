/*
exports.getAddModel = (req, res, next) => {

	Promise.all([
		Grls.getAttributeList('ASHP'),
		Grls.getAttributeList('ASIZ'),
		Grls.getAttributeList('ATTR'),
		Grls.getAttributeList('BILD'),
		Grls.getAttributeList('BRDR'),
		Grls.getAttributeList('BRSH'),
		Grls.getAttributeList('BSIZ'),
		Grls.getAttributeList('CMPX'),
		Grls.getAttributeList('ETHN'),
		Grls.getAttributeList('EYES'),
		Grls.getAttributeList('HAIR'),
		Grls.getAttributeList('MONS'),
		Grls.getAttributeList('NATN'),
		Grls.getAttributeList('NPCL'),
		Grls.getAttributeList('NPPF'),
		Grls.getAttributeList('NPSH'),
		Grls.getAttributeList('NPSZ'),
		Grls.getAttributeList('PUAT'),
		Grls.getAttributeList('YTHF'),
		Grls.getFlagList()
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
//
exports.postAddModel = (req, res, next) => {
	console.log('Adding model');
}
*/

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
			res.render('main-page/model-detail', {
				model: model,
				pageTitle: model.principal_name,
				path: '/'
			});
		})
    	.catch(err => console.log(err));
};

