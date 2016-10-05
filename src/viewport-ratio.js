//trace - all elements
//round - total percent
//scroll - enable/disable scroll
//callback when a certain % is hit
//init - initialise
;(function() {
	'use strict';

	// Constructor function to create viewport instance
	function ViewportRatio(width, height) {
		this.width = width;
		this.height = height;
		this.targetElements = [];
		this.totalViewportArea = this.width * this.height;
		this.targetElementsArea = 0;
	}

	// Function to get target element's area (in px)
	ViewportRatio.prototype.getTargetElementsArea = function(targetElements) {
		var elementList = document.querySelectorAll(targetElements);
		for(var i = 0; i < elementList.length; i ++) {
			this.targetElements.push({
				element: elementList[i],
				width: elementList[i].clientWidth,
				height: elementList[i].clientHeight 
			});
			this.targetElementsArea += this.targetElements[i].width * this.targetElements[i].height;
		}
		return this.targetElementsArea;		
	};

	// Function to calculate target area percentage
	ViewportRatio.prototype.calculateTargetAreaPercent = function() {
		return (this.targetElementsArea / this.totalViewportArea) * 100;
	};

	// Function to calculate viewport difference
	ViewportRatio.prototype.calculateViewportDifference = function() {
		console.log(this.targetElements[0].element.offsetTop);
		console.log(window.pageYOffset);
	};





	// Get viewport dimensions
	var viewportWidth = window.innerWidth,
		viewportHeight = window.innerHeight;

	// Create viewport instance
	window.viewportRatio = new ViewportRatio(viewportWidth, viewportHeight);

	window.viewportRatio.getTargetElementsArea('.div_ratio');

	window.addEventListener('scroll', function(e) {
		window.viewportRatio.calculateViewportDifference();
	});
})();