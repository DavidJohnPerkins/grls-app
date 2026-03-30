const fs = require('fs');
const dbfunc = require('../util/db_function');
const helper = require('../util/helper');

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

exports.getFilteredIndex = (req, res, next) => {
	if (req.query.search_term === '') {
		searchTerm = '~';
	} else 
	{
		searchTerm = req.query.search_term;
	}	
	console.log(searchTerm);
	dbfunc.getData(`http://localhost:8080/filtered-index/${searchTerm}`)
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

exports.getMovieList = (req, res, next) => {
	dbfunc.getData('http://localhost:8080/movieList')
		.then((rows) => {
			res.render('main-page/movie-list', {
				movies: rows,
				pageTitle: 'Movie List',
				path: '/'
			});
		})
		.catch(err => console.log(err));
};

exports.getContactSheet = (req, res, next) => {
	imgPath = "../../../../public/thumbnail/";
	
	var photos = [];
	fs.readdirSync(imgPath).filter(fn => fn.endsWith('.jpg')).forEach(file => {
		photos.push(file);
	})
	res.render('main-page/model-contact-sheet', {
		helper: helper,
		photos: photos,
		pageTitle: 'Contact Sheet',
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

exports.getPlayMovie = (req, res, next) => {
// Define a route for serving the video file
	videoTitle = req.params.movieTitle;
	videoPath = `../../../../Public/movie/${videoTitle}.mp4`;
	stat = fs.statSync(videoPath);
	fileSize = stat.size;
	range = req.headers.range;

	if (range) {
		parts = range.replace(/bytes=/, '').split('-');
		start = parseInt(parts[0], 10);
		end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
		chunkSize = end - start + 1;
		file = fs.createReadStream(videoPath, { start, end });
		head = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunkSize,
			'Content-Type': 'video/mp4',
		};

		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4',
		};

		res.writeHead(200, head);
		fs.createReadStream(videoPath).pipe(res);
	}
};

