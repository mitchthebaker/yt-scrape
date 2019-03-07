var el = {
	allLi: document.querySelectorAll('.site-Li'),
	allLiArray: function() {
		return Array.prototype.slice.call(this.allLi);
	},
	iframeClose: document.querySelector('.iframe-close'),
	iframe: document.querySelector('.li-iframe')
};

function hasClass(element, cls) {
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

el.iframeClose.addEventListener('click', function() {
	if(!(hasClass(el.iframe, 'li-iframe-visible'))) {
		console.log("class 'li-iframe-visible added");
		el.iframe.classList.add('li-iframe-visible');
	}
	else {
		console.log("class 'li-iframe-visible' added");
		el.iframe.classList.remove('li-iframe-visible');
	}
});