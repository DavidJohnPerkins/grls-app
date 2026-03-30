const path = require('path');

const express = require('express');

const app = express();
app.use(express.json());

const grls = require('./sql-grlsdb');
const { search } = require('../frontend/routes/display');

app.get('/', async (req, res) => {
	grls.getModelCards()
	.then((rows) => {
		res.status(200).send(rows);
	})
	.catch(err => console.log(err));
});

app.get('/filtered-index/:searchTerm', async (req, res) => {
	searchTerm = req.params.searchTerm;
	grls.getFilteredIndex(searchTerm)
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

app.post('/addModel', async (req, res) => {  
	const modelData = req.body; // Already parsed by body-parser or express.json()    
	grls.addModel(modelData)
	.then((rows) => {
		console.log(`backend app.js addModel rows: ${rows}`);
		res.status(200).send(rows);  
	})
	.catch(err => console.error('Error adding model:', err));    
});

app.get('/movieList', async (req, res) => {
	grls.getMovieList("~", 1)
	.then((rows) => {
		res.status(200).send(rows);
	})
	.catch(err => console.log(err));
});


app.listen(8080);
