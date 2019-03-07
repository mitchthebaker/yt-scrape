//Require .js files 
const Sites = require('../models/sites');
const timer = require('./timer.js');

//Require MongoDB/mongoose
const mongoose = require('mongoose');

//Require axios/cheerio for web scraping 
const axios = require('axios');
const cheerio = require('cheerio');

console.log(timer.getCurrent().date);
console.log(timer.getCurrent().time);

//setInterval() is used so that data is scraped from the websites contained
//in the Object literal 'urls' every 24 hours (86400 ms)
setInterval(function() {
	
		//'urls' is an Object literal holding all of our important scraping variables 
		const urls = {
			econ: {
				url: 'https://www.economist.com/international/',
				articleClass: 'teaser',
				aClass: 'teaser__link',
				spanClass: 'flytitle-and-title__title',
				imgClass: 'component-image__img',
				imgDiv: 'component-image'
			},
			apnews: {
				url: 'https://www.apnews.com/apf-intlnews',
				FeedCard: 'FeedCard',
				aClass: 'headline',
				imgClass: 'LazyImage'
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

						let siteData = new Sites({
							date: timer.getCurrent().date,
							sites: data
						});

						siteData.save((err) => {
							if(!err) {
								console.log('siteData upload SUCCESS =>' + urls.econ.url.trim());
							}
							else {
								console.log('siteData upload FAILURE =>' + urls.econ.url.trim());
							}
						});
					}
					else if(urlsList[i] == urls.apnews.url.trim()) {
						console.log('---------------------------------');
						console.log('APNEWS BELOW');
						console.log('---------------------------------');
						$('div.' + urls.apnews.FeedCard).each(function(i, elem) {
							if($('div.' + urls.apnews.FeedCard).find('a.' + urls.apnews.aClass).attr('href').charAt(0) == '/') {
								data[i] = {
									title: $(elem).find('h1').text().trim(),
							 		url: 'https://www.apnews.com' + $(elem).find('a.' + urls.apnews.aClass).attr('href')
							 	}
							} 
							else {
								data[i] = {
									title: $(elem).find('h1').text().trim(),
							 		url: 'https://www.apnews.com' + $(elem).find('a.' + urls.apnews.aClass).attr('href')
							 	}
							}
					 	});
						console.log(data);

						let siteData = new Sites({
							date: timer.getCurrent().date,
							sites: data
						});

						siteData.save((err) => {
							if(!err) {
								console.log('siteData upload SUCCESS =>' + urls.apnews.url.trim());
							}
							else {
								console.log('siteData upload FAILURE =>' + urls.apnews.url.trim());
							}
						});
					}
					else {
						console.log('There was an unexpected error');
					}
				}
			}).catch(err => {
				console.log(err);
			});
		}

}, 1000*86400);

/* 1000*86400 = 24 hours
 * 1000*43200 = 12 hours
 * 1000*21600 = 6 hours
 * 1000*10800 = 3 hours
 * 1000*5400 = 1.5 hours
 * 1000*2700 = 0.75 hours
 * 1000*10 = 10 seconds
 */

 /*
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
	BBC NEWS:
	,
			bbc: {
				url: 'https://www.bbc.com/news/world',
				spanClass: 'title-link__title-text',
				imgClass: 'js-image-replace',
				titleLink: 'title-link'
			}



			var hour = new Date().getHours();
	console.log(hour);

	if(hour >= 5 && hour < 12) {
	}
	else {
		console.log('Outside of hours 6:00-24:00, current time => ' + hour);
	}

 */
