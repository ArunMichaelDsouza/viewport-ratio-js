/*

ALGO

1) gap = innerHeight + scrollY - (offsetTop + elHeight)
2) if (gap + elHeight) > innerHeight
		- element not fully in viewport
		- visibleHeight = ((gap + elheight) - innerHeight) - elHeight
	else
		if (gap > 0) 
			- element fully in viewport
			- visibleHeight = elHeight
		else
			- element not fully in viewport
			- visibleHeight = elHeight - gap

			*/

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
		var areaVisible = parseFloat(((this.targetElementsArea / this.totalViewportArea) * 100).toFixed(2));
		document.getElementById('visible-value').innerText = areaVisible+' %';
		
		return areaVisible;
	};

	// Function to calculate viewport difference
	ViewportRatio.prototype.calculateViewportDifference = function() {
		for(var i = 0; i < this.targetElements.length; i ++) {
			var elementOffsetTop = this.targetElements[i].element.offsetTop,
				elementVisibleHeight,
				elementHeight = this.targetElements[i].height;

			var gap = (window.innerHeight + window.pageYOffset) - (elementOffsetTop + elementHeight);

			if((gap + elementHeight) > window.innerHeight) {
				var t = ((gap + elementHeight) - window.innerHeight);
				elementVisibleHeight = Math.max(0, elementHeight - t);
			}
			else {
				if(gap > 0) {
					elementVisibleHeight = elementHeight;
				}
				else {
					elementVisibleHeight = Math.max(0, elementHeight - Math.abs(gap));
				}
			}

			this.targetElementsArea = this.targetElements[i].width * elementVisibleHeight;
			console.log('Area :'+this.calculateTargetAreaPercent());
		}
	};



	// Get viewport dimensions
	var viewportWidth = window.innerWidth,
		viewportHeight = window.innerHeight;

	// Create viewport instance
	window.viewportRatio = new ViewportRatio(viewportWidth, viewportHeight);

	window.viewportRatio.getTargetElementsArea('.div_ratio');

	console.log(window.viewportRatio.calculateViewportDifference());

	window.addEventListener('scroll', function(e) {
		window.viewportRatio.calculateViewportDifference();
	});
})();