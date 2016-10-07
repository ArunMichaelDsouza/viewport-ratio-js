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
			var elementOffsetTop = this.targetElements[i].element.offsetTop, elementVisibleHeight;

			if(window.pageYOffset >= elementOffsetTop) {
				elementVisibleHeight = this.targetElements[i].height - (window.pageYOffset - elementOffsetTop);
				if(elementVisibleHeight >= 0) {
				//console.log(this.targetElements[i].width * elementVisibleHeight);
					this.targetElementsArea = this.targetElements[i].width * elementVisibleHeight;
					console.log('Area :'+this.calculateTargetAreaPercent());
				}
				else {
					this.targetElementsArea = this.targetElements[i].width * 0;	
					console.log('Area :'+this.calculateTargetAreaPercent());
				}
			}
			else {
				elementVisibleHeight = this.targetElements[i].height;
				if(elementVisibleHeight >= 0) {
				//console.log(this.targetElements[i].width * elementVisibleHeight);
					this.targetElementsArea = this.targetElements[i].width * elementVisibleHeight;
					console.log('Area :'+this.calculateTargetAreaPercent());
				}
				else {
					this.targetElementsArea = this.targetElements[i].width * 0;	
					console.log('Area :'+this.calculateTargetAreaPercent());
				}
			}

			
		}
	};



	// Get viewport dimensions
	var viewportWidth = window.innerWidth,
		viewportHeight = window.innerHeight;

	// Create viewport instance
	window.viewportRatio = new ViewportRatio(viewportWidth, viewportHeight);

	window.viewportRatio.getTargetElementsArea('.div_ratio');

	console.log(window.viewportRatio.calculateTargetAreaPercent());

	window.addEventListener('scroll', function(e) {
		window.viewportRatio.calculateViewportDifference();
	});
})();