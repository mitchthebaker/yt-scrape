//Require expres
const express = require('express');
const path = require('path');

//MongoDB, mongoose, and other PORT/uri type shenanagins
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const uriString = process.env.MONGODB_URI || 'mongodb://localhost/web-scraper';
const PORT = process.env.PORT || 5000;
const app = express();

//Connect to MongoDB through mongoose
mongoose.connect(uriString, (err,res) => {
	if(err) {
		console.log('ERROR connecting to: ' + uriString + '.' + err);
	}
	else {
		console.log('Successfully connected to: ' + uriString);
	}
}, { useNewUrlParser: true });
var db = mongoose. connection;

//Setup for MongoDB ~ displays error if there is an issue, otherwise
// console.logs 'DB ready'
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function() {
  console.log('DB ready');
});

//Include routes
var routes = require('./routes/router');
app.use('/', routes);

//Set correct paths and view engine to .ejs
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/scripts')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => console.log(`Currently listening on ${ PORT }`));
