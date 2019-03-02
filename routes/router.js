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
		econ: {
			url: 'https://www.economist.com/international/',
			aClass: 'teaser__link',
			spanClass: 'flytitle-and-title__title',
			imgClass: 'component-image__img'
		},
		apnews: {
			url: 'https://www.apnews.com/apf-intlnews',
			aClass: 'headline',
			imgClass: 'LazyImage'
		},
		bbc: {
			url: 'https://www.bbc.com/news/world',
			spanClass: 'title-link__title-text',
			imgClass: 'js-image-replace',
			titleLink: 'title-link'
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

				if(urlsList[i] == urls.econ.url.trim()) {
					console.log('---------------------------------');
					console.log('ECONOMIST BELOW');
					console.log('---------------------------------');
					$('a.' + urls.econ.aClass).each(function(i, elem) {
				 		data[i] = {
							title: $(elem).find('span.' + urls.econ.spanClass).text().trim(),
					 		url: 'https://www.economist.com' + $(elem).attr('href')
					 	}
				 	});
					console.log(data);
				}
				else if(urlsList[i] == urls.apnews.url.trim()) {
					console.log('---------------------------------');
					console.log('APNEWS BELOW');
					console.log('---------------------------------');
					$('a.' + urls.apnews.aClass).each(function(i, elem) {
						if($('a.' + urls.apnews.aClass).attr('href').charAt(0) == '/') {
							data[i] = {
								title: $(elem).find('h1').text().trim(),
						 		url: 'https://www.apnews.com' + $(elem).attr('href')
						 	}
						} 
						else {
							data[i] = {
								title: $(elem).find('h1').text().trim(),
						 		url: $(elem).attr('href')
						 	}
						}
				 		
				 	});
					console.log(data);
				}
				else if(urlsList[i] == urls.bbc.url.trim()) {
					console.log('---------------------------------');
					console.log('BBC BELOW');
					console.log('---------------------------------');
					$('span.' + urls.bbc.spanClass).each(function(i, elem) {
						if($('a.' + urls.bbc.titleLink).attr('href').charAt(0) == '/') {
							data[i] = {
								title: $(elem).text().trim(),
						 		url: 'https://www.bbc.com' + $('a.' + urls.bbc.titleLink).attr('href')
						 	}
						} 
						else {
							data[i] = {
								title: $(elem).text().trim(),
						 		url: $('a.' + urls.bbc.titleLink).attr('href')
						 	}
						}
				 		
				 	});
					console.log(data);
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



