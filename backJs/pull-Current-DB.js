//pull-Current-DB.js queries MongoDB using mongoose to get today's site data

//Require .js files 
const Sites = require('../models/sites');
const timer = require('./timer.js');

module.exports = {
	pullCurrentDB: function(callback) {
		Sites.find({ 'date': timer.getCurrent().date }, function(err, sites) {
			console.log('Current date: ' + timer.getCurrent().date);
			console.log("Site titles/links listed below:");
			console.log('-----------------------------');
			console.log(sites);

			let str = JSON.stringify(sites);

			if(sites) {
				callback(null, str);
			}
			else {
				callback(error);
			}
		});
	}
}