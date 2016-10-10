/*
    viewport-ratio.js v0.1.0
    Copyright (c) 2016 Arun Michael Dsouza (amdsouza92@gmail.com)
    Licence: MIT
*/

;(function(w) {
	'use strict';

	// Viewport Ratio object
	var viewportRatio = {

		// Viewport info
		viewport: {
			width: w.innerWidth,
			height: w.innerHeight,	
			totalArea: w.innerWidth * w.innerHeight
		},

		// Target elements' info
		targetElements: {
			list: [],
			totalArea: 0
		},

		// Function to fetch all target elements
		getAllTargetElements: function(targetElements) {
			var elementList = w.document.querySelectorAll(targetElements);

			// Once fetched, add to target elements' info object
			for(var i = 0; i < elementList.length; i ++) {
				this.targetElements.list.push({
					element: elementList[i],
					width: elementList[i].clientWidth,
					height: elementList[i].clientHeight 
				});
			}
		},

		// Function to calculate target area percentage
		calculateTargetAreaPercent: function() {
			return parseFloat(((this.targetElements.totalArea / this.viewport.totalArea) * 100).toFixed(2));
		},

		// Function to calculate viewport area difference
		calculateViewportAreaDifference: function(fn) {
			this.targetElements.totalArea = 0;

			// Apply scroll difference calculation logic on all target elements
			for(var i = 0; i < this.targetElements.list.length; i ++) {
				var elementOffsetTop = this.targetElements.list[i].element.offsetTop,
					elementVisibleHeight,
					elementHeight = this.targetElements.list[i].height;

				var scrollGap = (w.innerHeight + w.pageYOffset) - (elementOffsetTop + elementHeight),
					pos = w.getComputedStyle(this.targetElements.list[i].element).position;

				if(pos === 'fixed') {
					elementVisibleHeight = elementHeight;
				}
				else {
					if((scrollGap + elementHeight) > w.innerHeight) {
						var scrollDifference = ((scrollGap + elementHeight) - w.innerHeight);
						elementVisibleHeight = Math.max(0, elementHeight - scrollDifference);
					}
					else {
						if(scrollGap > 0) {
							elementVisibleHeight = elementHeight;
						}
						else {
							elementVisibleHeight = Math.max(0, elementHeight - Math.abs(scrollGap));
						}
					}
				}
				this.targetElements.totalArea += this.targetElements.list[i].width * elementVisibleHeight;
			}
			return this.calculateTargetAreaPercent();
		},

		// Viewport on-scroll action
		onScroll: function() {
			var x = viewportRatio.calculateViewportAreaDifference();
			return x;
		},

		// Script initialisation
		init: function(targetElements, options) {
			this.getAllTargetElements(targetElements);
			this.calculateViewportAreaDifference();
		}
	};
	w.viewportRatio = viewportRatio;	

	// Viewport scroll event trigger
	
})(window);
