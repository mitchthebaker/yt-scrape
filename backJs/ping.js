var http = require('http');

setInterval(function() {
	http.get('https://world-scrape.herokuapp.com');
}, 600000);