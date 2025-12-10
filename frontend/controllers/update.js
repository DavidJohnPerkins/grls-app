exports.postAddModel = (req, res, next) => {
	try {
		if (!req.body || typeof req.body !== 'object') {
			return res.status(400).json({ error: 'Invalid request body' });
		}
		
		//const modelData = JSON.stringify(req.body);
		postData('http://localhost:8080/addModel', req.body)
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

async function postData(url, reqBody) {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(reqBody)
	});

	const body = await response.json();

	return body;
};
