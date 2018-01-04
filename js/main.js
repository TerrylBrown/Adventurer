// main.js


// Nav Toggle
(function() {
	'use strict';

	var $window = $(window);
	var $body = $('body');
	var $primaryHeader = $('.primary-header');
	var $navToggleBtn = $('.nav-toggle-btn');
	var $mobileNav = $('.mobile-nav');

	function showMenu() {
		$window.scrollTop(0);
		$body.addClass('no-scroll');
		$navToggleBtn.addClass('active');
		$primaryHeader.addClass('nav-active');	
		$mobileNav.fadeIn();
	}

	function hideMenu() {
		$body.removeClass('no-scroll');
		$navToggleBtn.removeClass('active');
		$primaryHeader.removeClass('nav-active');			
		$mobileNav.fadeOut();	
	}

	var toggleMenu = function(event) {
		event.preventDefault();
		if (!$navToggleBtn.hasClass('active')) {
			showMenu();		
		} else {				
			hideMenu();
		}
	}

	$(function() {
		$navToggleBtn.click(toggleMenu);
	});

})();

// Mobile Nav Controls
(function() {
	'use strict';

	var opts = {
		transitionSpeed : 300
	};

	var $mobileNav = $('#mobile-nav');
	var $parentLink = $('.mobile-nav-item.parent > a');
	var $childMenu = $('.mobile-nav-item > .mobile-nav-list');

	var leftPos = 0;

	var menuNext = function(event) {
		event.preventDefault();

		// Show Target Menu
		var $targetMenu = $(this).closest('.mobile-nav-item.parent').children('.mobile-nav-list');		
		$targetMenu.show();

		// Slide to Menu
		leftPos -= 100;	
		slideToMenu();		
	};	

	var menuBack = function(event) {
		event.preventDefault();		

		// Hide Target Menu
		var $targetMenu = $(this).closest('.mobile-nav-list');
		setTimeout(function() {
			$targetMenu.hide();
		}, opts.transitionSpeed)		

		// Slide Back
		leftPos += 100;
		slideToMenu();	
	}

	function slideToMenu() {
		$mobileNav.animate({
			'left' : leftPos + '%'
		}, opts.transitionSpeed);
	}

	function addParentIcon() {
		$parentLink.each(function() {}).append($('<i><img src="imgs/menu-next.svg" alt="Chevron Right Icon" /></i>'));
	}	

	function addBackButton() {
		$childMenu.prepend($('<li class="mobile-nav-item back"><a href="#"><i><img src="imgs/menu-back.svg" alt="Back Icon" /></i> Back</a></li>'));
	}

	$(function() {
		
		// Add chevron right arrow to parent links
		addParentIcon();

		// Add back buttons to sub menus
		addBackButton();

		// Add click events to parent links
		$parentLink.on('click', menuNext);

		// Add click events to back buttons 
		$mobileNav.on('click', '.back', menuBack);

	});

})();

// Align Dropdown Menu Arrows
(function() {
	'use strict';

	var $dropdownLink = $('.dropdown-link');
	var timeout = false;
	var delay = 100;

	function alignDropdownArrows() {
		$dropdownLink.each(function() {
			var $this = $(this);
			// Get Link Arrow Pos
			var $linkArrow = $this.find('i');
			var linkArrowPos = $linkArrow.position();
			var linkArrowPosLeft = linkArrowPos.left;		
			// Get dropdown arrow & Set left pos - 18 is gutter + width difference
			$this.siblings('.dropdown-target').find('.dropdown-arrow').css('left', (linkArrowPosLeft - 18) + 'px');
		});
	}

	$(function() {
		alignDropdownArrows();
		$(window).on('resize', function() {
			clearTimeout(timeout);
			timeout = setTimeout(alignDropdownArrows, delay);
		});
	});	

})();
