;(function() {

	"use strict";

	function Viewport(height, width) {
		this.height = height;
		this.width = width;
		this.adClass = 'g_ad';
	}

	function getTag(el) {
		return document.getElementsByTagName(el)[0];
	}

	var clientHeight = getTag('html').clientHeight,
		clientWidth = getTag('html').clientWidth;

	var viewport = new Viewport(clientHeight, clientWidth);

	Viewport.prototype.getAllAds = function() {
		var ads = document.getElementsByClassName(this.adClass);

		for(var i = 0; i < ads.length; i ++) {
			console.log(ads[i].clientHeight);
			console.log(ads[i].clientWidth);
		}
	};

	viewport.getAllAds();
})();