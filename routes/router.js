//Require express hardware
const express = require('express');
const router = express.Router();

//Require MongoDB/mongoose
const mongoose = require('mongoose');
var db = mongoose.connection;

//Require axios/cheerio for web scraping 
const axios = require('axios');
const cheerio = require('cheerio');

//Require .js files 
const Sites = require('../models/sites');
const siteData = require('../backJs/siteData');
const timer = require('../backJs/timer');
const today = require('../backJs/pull-Current-DB');

router.get('/', (req, res) => {

	today.pullCurrentDB(function(err,data) {
		if(err) {
			return next(err);
		}

		res.render('pages/index', {
			data: data,
			date: timer.getCurrent().date
		});
	});
});

module.exports = router;

/*
axios.get(urlList[0])	
		 .then(response => {
			 if(response.status === 200) {
			 	const html = response.data;
			 	const $ = cheerio.load(html);
			 	let data = [];
			 		
			 	console.log(urlList[0] + ' ?= ' + urls.wjs.url.trim());
			 	if(urls[prop].url == urls.wjs.url.trim()) {
			 		console.log(urls.wjs.url);
			 	}
			 	else if(urls[prop].url == urls.apnews.url.trim()) {
			 		console.log(urls.apnews.url);
			 	}
			 	else if(urls[prop].url == urls.bbc.url.trim()) {
			 		console.log(urls.bbc.url);
			 	}
			 	else if(urls[prop].url == urls.reuters.url.trim()) {
			 		console.log(urls.reuters.url);
			 	}
			 	else {
			 		console.log('There was an unexpected error');
			 	}

			 	$('h2.css-l2vidh').find('a').each(function(i, elem) {
			 		if($(elem).attr('href').indexOf(0) == '/') {
			 			data[i] = {
				 			title: $(elem).text().trim(),
				 			url: url + $(elem).attr('href')
				 		}
			 		}
			 		else {
			 			data[i] = {
							title: $(elem).text().trim(),
				 			url: $(elem).attr('href')
				 		}
			 		}
			 	});
				console.log(data);
			}
	})
    .catch(error => {
		console.log(error);
	});

*/



