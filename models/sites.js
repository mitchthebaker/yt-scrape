const mongoose = require('mongoose');

//Create a new Schema model for scraped sites 
var siteSchema = new mongoose.Schema({
	date: String,
	sites: []
}, { strict: false });

var sites = mongoose.model('sites', siteSchema);
module.exports = sites;