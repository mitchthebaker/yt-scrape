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
		console.log("Within '/' GET: " + data);

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

*****************************
Reuders scraper:

,
		reuters: {
			url: 'https://www.reuters.com/news/world',
			divClass: 'ImageStoryTemplate_image-story-container',
			h2Class: 'FeedItemHeadline_full'
			//imgClass: I'll have to use .find('img') to locate img 
		}

else if(urlsList[i] == urls.reuters.url.trim()) {
					console.log('---------------------------------');
					console.log('REUTERS BELOW');
					console.log('---------------------------------');
					$('h2.' + urls.reuters.h2Class).each(function(i, elem) {
				 		data[i] = {
							title: $(elem).find('a').text().trim(),
					 		url: $(elem).find('a').attr('href')
					 	}
				 	});
					console.log(data);

					let siteData = new Sites({
						date: timer.getCurrent().date,
						sites: data
					});

					siteData.save((err) => {
						if(!err) {
							console.log('siteData upload SUCCESS =>' + urls.reuters.url.trim());
						}
						else {
							console.log('siteData upload FAILURE =>' + urls.reuters.url.trim());
						}
					});
				}

*/



