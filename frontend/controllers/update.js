const dbfunc = require('../util/db_function');

exports.getAddModel = (req, res, next) => {
	Promise.all([
		dbfunc.getData("http://localhost:8080/attributeList/ASHP"),
		dbfunc.getData("http://localhost:8080/attributeList/ASIZ"),
		dbfunc.getData("http://localhost:8080/attributeList/ATTR"),
		dbfunc.getData("http://localhost:8080/attributeList/BILD"),
		dbfunc.getData("http://localhost:8080/attributeList/BRDR"),
		dbfunc.getData("http://localhost:8080/attributeList/BRSH"),
		dbfunc.getData("http://localhost:8080/attributeList/BSIZ"),
		dbfunc.getData("http://localhost:8080/attributeList/CMPX"),
		dbfunc.getData("http://localhost:8080/attributeList/ETHN"),
		dbfunc.getData("http://localhost:8080/attributeList/EYES"),
		dbfunc.getData("http://localhost:8080/attributeList/HAIR"),
		dbfunc.getData("http://localhost:8080/attributeList/MONS"),
		dbfunc.getData("http://localhost:8080/attributeList/NATN"),
		dbfunc.getData("http://localhost:8080/attributeList/NPCL"),
		dbfunc.getData("http://localhost:8080/attributeList/NPPF"),
		dbfunc.getData("http://localhost:8080/attributeList/NPSH"),
		dbfunc.getData("http://localhost:8080/attributeList/NPSZ"),
		dbfunc.getData("http://localhost:8080/attributeList/PUAT"),
		dbfunc.getData("http://localhost:8080/attributeList/YTHF"),
		dbfunc.getData("http://localhost:8080/flaglist")
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
		dbfunc.postData('http://localhost:8080/addModel', req.body)
			.then(([model]) => {
				console.log(`update.js model: ${model.model_id}`);
				const modelId = model.model_id;
				res.redirect(`/model/${modelId}`);
			})
			.catch(err => console.log(err));		
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};
