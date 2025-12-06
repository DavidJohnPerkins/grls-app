const path = require('path');

const express = require('express');

const app = express();
app.use(express.json());

const grls = require('./sql-grlsdb');

app.get('/', async (req, res) => {
	grls.getModelCards()
	.then((rows) => {
		res.status(200).send(rows);
	})
	.catch(err => console.log(err));
});

app.get('/model/:modelId', async (req, res) => {
	const modelId = req.params.modelId;
	grls.findById(modelId)
	.then((rows) => {
		res.status(200).send(rows);
	})
	.catch(err => console.log(err));
});

app.get('/attributeList/:listCode', async (req, res) => {
	const listCode = req.params.listCode;
	grls.getAttributeList(listCode)
	.then((rows) => {
		res.status(200).send(rows);
	})
	.catch(err => console.log(err));
});

app.get('/flagList', async (req, res) => {
	grls.getFlagList()
	.then((rows) => {
		res.status(200).send(rows);
	})
	.catch(err => console.log(err));
});


app.get('/modelId', async (req, res) => {
	grls.getModelId()
	.then((rows) => {
		res.status(200).send(rows);
	})
	.catch(err => console.log(err));
});

/*
app.post('/addModel', async (req, res) => {
	console.log('here 2');
	console.log(req.body);
	//const modelData = JSON.stringify(req.body);
	const modelData = req.body;
	grls.addModel(modelData)
	.then((rows) => {
		res.status(200).send(rows);
	})
	.catch(err => console.log(err));
});
*/

app.post('/addModel', async (req, res) => {  
	try {    
		const modelData = req.body; // Already parsed by body-parser or express.json()    
		const rows = await grls.addModel(modelData);
		console.log(`back from /addModel: ${rows}`);
		res.status(200).send(rows);  
	} catch (err) {    
		console.error('Error adding model:', err);    
		res.status(500).send({ error: 'Failed to add model' });  
	}
});

app.listen(8080);
