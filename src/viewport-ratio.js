//trace - all elements
//round - total percent
//scroll - enable scroll
//init - initialise
;(function() {
	'use strict';

	// Constructor function to create viewport instance
	function Viewport(width, height) {
		this.width = width;
		this.height = height;
		this.targetElements = [];
		this.viewportArea = this.width + this.height;
		this.targetElementsArea = 0;
	}

	// Function to get target element's area (in px)
	Viewport.prototype.getTargetElementsArea = function(elements) {
		var elementList = document.querySelectorAll(elements);
		for(var i = 0; i < elementList.length; i ++) {
			this.targetElements.push({
				name: elementList[i].nodeName,
				width: elementList[i].clientWidth,
				height: elementList[i].clientHeight 
			});
			this.targetElementsArea += this.targetElements[i].width;
			this.targetElementsArea += this.targetElements[i].height;
		}
		return this.targetElementsArea;		
	};

	Viewport.prototype.calculateTargetAreaPercent = function() {
		return ( this.targetElementsArea / this.viewportArea) * 100;
	};

	// Get viewport dimensions
	var viewportWidth = window.innerWidth,
		viewportHeight = window.innerHeight;

	// Create viewport instance
	var viewport = new Viewport(viewportWidth, viewportHeight);

	viewport.getTargetElementsArea('.div_ratio');
	console.log(viewport.calculateTargetAreaPercent());
})();