const fs = require('fs');
const dbfunc = require('../util/db_function');
const helper = require('../util/helper');

const { server, db } = require("../config");

console.log("Server port:", server.port);
console.log("DB URL:", db.url);

exports.getIndex = async (req, res, next) => {
	const search_term = req.cookies.search_term || '';
	let flags = [];
	try {
		flags = req.cookies.flags ? JSON.parse(req.cookies.flags) : [];
	} catch (err) {
		flags = [];
	}

	try {
		const [flag_list, models] = await Promise.all([
			dbfunc.getData(`http://${db.url}:${server.port}/api/grls/add/flags?type=MOD`),
			dbfunc.getData(`http://${db.url}:${server.port}/api/grls/model`)
		]);

		res.render('main-page/model-list', {
			flag_list,
			models,
			search_term,
			flags,
			pageTitle: 'Model List',
			path: '/'
		});
	} catch (err) {
		next(err);
	}
};

exports.getFilteredIndex = async (req, res, next) => {
	if (req.query.reset) {
		res.clearCookie('search_term');
		res.clearCookie('flags');
		return res.redirect('/');
	}

	let searchTerm = req.query.search_term;
	if (!searchTerm || searchTerm === '') {
		searchTerm = '~';
	}

	let flags = req.query.flags || [];
	if (!Array.isArray(flags)) {
		flags = [flags];
	}

	res.cookie('search_term', searchTerm === '~' ? '' : searchTerm, {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		sameSite: 'Lax'
	});
	res.cookie('flags', JSON.stringify(flags), {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		sameSite: 'Lax'
	});

	const url = new URL(`http://${db.url}:${server.port}/api/grls/modelsearch?term=${searchTerm}`);
	url.searchParams.set('flags', JSON.stringify(flags));

	try {
		const [flag_list, models] = await Promise.all([
			dbfunc.getData(`http://${db.url}:${server.port}/api/grls/add/flags?type=MOD`),
			dbfunc.getData(url.toString())
		]);

		res.render('main-page/model-list', {
			flag_list,
			models,
			search_term: searchTerm === '~' ? '' : searchTerm,
			flags,
			pageTitle: 'Model List',
			path: '/'
		});
	} catch (err) {
		next(err);
	}
};

exports.getModelByID = async (req, res, next) => {
	try {
		const modelId = req.params.modelId;

		const [model, associates] = await Promise.all([
			dbfunc.getData(`http://${db.url}:${server.port}/api/grls/model/get?id=${modelId}`),
			dbfunc.getData(`http://${db.url}:${server.port}/api/grls/model/associates?id=${modelId}`)
		]);

		const imgPath = model.principal_name.substring(0, 1) + "/" + model.principal_name;

		res.render('main-page/model-detail', {
			model,
			associates,
			pageTitle: model.principal_name,
			imagePath: imgPath,
			path: '/'
		});

	} catch (err) {
		console.error(err);
	}
};

exports.getModelImagesByName = (req, res, next) => {
	const modelName = req.params.modelName;
	localPath = "/app/images/detail/" + modelName.substring(0, 1) + "/" + modelName;
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
	const modelId = req.params.modelId;
	console.log(modelId);
	dbfunc.getData(`http://${db.url}:${server.port}/api/grls/movies?model_id=${modelId}`)
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
	imgPath = "/app/images/thumbnail/";
	
	const photos = getPhotos(imgPath);
	dbfunc.getData(`http://${db.url}:${server.port}/api/grls/contactsheet?images=${JSON.stringify(photos)}`)
		.then((rows) => {
			res.render('main-page/model-contact-sheet', {
				helper: helper,
				photos: rows,
				pageTitle: 'Contact Sheet',
				imagePath: imgPath,
				path: '/'
			});
		})
		.catch(err => console.log(err));
};

exports.getPlayMovie = (req, res, next) => {
// Define a route for serving the video file
	moviePath = "/app/images/movie/";
	videoTitle = req.params.movieTitle;
	videoPath = `${moviePath}${videoTitle}.mp4`;
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

function getPhotos(imgPath) {
	const p = [];

	fs.readdirSync(imgPath)
		.filter(fn => fn.endsWith('.jpg'))
		.forEach(file => {
			p.push(file);
		});

	return p;
}
