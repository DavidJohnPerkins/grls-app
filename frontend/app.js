const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//const db = require('./util/database');

const app = express();
console.log(__dirname);

//app.use('/thumbnail', express.static(path.join(__dirname, '../../../../public/thumbnail')));
//app.use('/detail', express.static(path.join(__dirname, '../../../../public/detail')));
//app.use('/movie', express.static(path.join(__dirname, '../../../../public/movie')));
//app.use('/movie-image', express.static(path.join(__dirname, '../../../../public/movie-image')));

app.use('/images', express.static('/app/images'));

app.set('view engine', 'ejs');
app.set('views', 'views');

//const adminRoutes = require('./routes/admin');
const displayRoutes = require('./routes/display');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/admin', adminRoutes);
app.use('/', displayRoutes);
app.use('/model/', displayRoutes);

app.use(errorController.get404);

app.listen(3000);
