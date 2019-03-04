//timer.js gets the current date and time 

module.exports = {
	getCurrent: function() {
		let today = new Date();
		let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	
		return {
			date: date,
			time: time
		}
	}
}