//Require express hardware
const express = require('express');
const router = express.Router();

//Require MongoDD/mongoose
const mongoose = require('mongoose');
var db = mongoose.connection;

//Require axios/cheerio for web scraping 
const axios = require('axios');
const cheerio = require('cheerio');

//Require .js files 
const Sites = require('../models/sites');
const siteData = require('../backJs/siteData');

router.get('/', (req, res) => {
	//urls is an Object literal holding all of our important scraping variables 
	const urls = {
		wsj: {
			url: 'https://www.wjs.com/news/world',
			h2Class: 'WSJTheme__headline_19_2KfxGdC8OTxXXrZcwJ2',
			imgClass: 'WSJTheme__image_2srBg4oD0NrbJuMZdixIau '
		},
		apnews: {
			url: 'https://www.apnews.com/apf-intlnews',
			aClass: 'headline',
			imgClass: 'LazyImage'
		},
		bbc: {
			url: 'https://www.bbc.com/news/world',
			spanClass: 'title-link__title-text',
			imgClass: 'js-image-replace'
		},
		reuters: {
			url: 'https://www.reuters.com/news/world',
			divClass: 'ImageStoryTemplate_image-story-container',
			h2Class: 'FeedItemHeadline_headline'
			//imgClass: I'll have to use .find('img') to locate img 
		}
	}
	
	//urlList is an Array being used to store all of the site url's 
	var urlsList = [];

	//for.. in loop populating urlList with url's from Object literal above
	for(var prop in urls) {
		if(urls.hasOwnProperty(prop)) {
			console.log(prop + ' -> ' + urls[prop].url);
			urlsList.push(urls[prop].url);
		}
	}
	console.log(urlsList);

	for(let i = 0; i < urlsList.length; i++) {
		//Use axios to scrape data from each url
		axios.get(urlsList[i]).then(res => {
			//If the response status is successful, continue with script
			if(res.status === 200) {
				const html = res.data;
				const $ = cheerio.load(html);
				let data = [];

				console.log(urls.wsj.h2Class);
				if(urlsList[i] == urls.wsj.url.trim()) {
					$('h3.' + urls.wsj.h2Class).find('a').each(function(i, elem) {
				 		data[i] = {
							title: $(elem).text().trim(),
					 		url: $(elem).attr('href')
					 	}
				 	});
					console.log(data);
				}
				else if(urlsList[i] == urls.apnews.url.trim()) {
					$('a.' + urls.apnews.aClass).find('h1').each(function(i, elem) {
				 		data[i] = {
							title: $(elem).text().trim(),
					 		url: $(elem).attr('href')
					 	}
				 	});
					console.log(data);
				}
				else if(urlsList[i] == urls.bbc.url.trim()) {
					$('span.' + urls.bbcnews.spanClass).each(function(i, elem) {
				 		data[i] = {
							title: $(elem).text().trim(),
					 		url: $(elem).attr('href')
					 	}
				 	});
					console.log(data);
				}
				else if(urlsList[i] == urls.reuters.url.trim()) {
					$('h2.' + urls.reuters.h2Class).each(function(i, elem) {
				 		data[i] = {
							title: $(elem).text().trim(),
					 		url: $(elem).attr('href')
					 	}
				 	});
					console.log(data);
				}
				else {
					console.log('There was an unexpected error');
				}
			}
		}).catch(err => {
			console.log(err);
		});
	}

	res.render('pages/index');
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



