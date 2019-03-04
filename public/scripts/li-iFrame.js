var el = {
	allLi: document.querySelectorAll('.site-Li'),
	allLiArray: function() {
		return Array.prototype.slice.call(this.allLi);
	}
};

el.allLiArray().forEach(function(li) {
	li.addEventListener('click', function() {
		console.log(li);
	});
});