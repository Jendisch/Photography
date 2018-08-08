;(function () {
	
	'use strict';

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){
					
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );


	};

	var offcanvasMenu = function() {

		$('body').prepend('<div id="fh5co-offcanvas" />');
		$('#fh5co-offcanvas').append($('#fh5co-main-nav').clone());

		setTimeout(function(){
			$('#fh5co-offcanvas').prepend('<a href="#" class="js-fh5co-offcanvas-close fh5co-offcanvas-close" />');
			$('#fh5co-offcanvas #fh5co-main-nav').attr('id', '');
		}, 200);
		
	};

	var mainMenuSticky = function() {
		
		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function(){
			sticky.css('height', sticky.height());
		});

		var $section = $('.fh5co-main-nav');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {

			    	$section.css({
			    		'position' : 'fixed',
			    		'top' : 0,
			    		'width' : '100%',
			    		'z-index' : 99999
			    	}).addClass('fh5co-shadow');;

			}

		}, {
	  		offset: '0px'
		});

		$('.js-sticky').waypoint(function(direction) {
		  	if (direction === 'up') {
		    	$section.attr('style', '').removeClass('fh5co-shadow');
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 69; }
		});

	};

	var clickMenu = function() {
		var topVal = ( $(window).width() < 769 ) ? 0 : 58;

		$(window).resize(function(){
			topVal = ( $(window).width() < 769 ) ? 0 : 58;		
		});

		if ( $(this).attr('href') != "#") {
			$('#fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"])').click(function(event){
				var section = $(this).data('nav-section');


				if ( $('div[data-section="' + section + '"]').length ) {

					$('html, body').animate({
			        	scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
			    	}, 500);	
			    	
			   }
			   event.preventDefault();

			});
		}
	};

	var navActive = function(section) {
		
		$('#fh5co-main-nav li, #fh5co-offcanvas li').removeClass('active');
		$('#fh5co-main-nav, #fh5co-offcanvas').find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		
	};


	// Document on load.
	$(function(){
		


		// Animations
		contentWayPoint();
		offcanvasMenu();
		mainMenuSticky();
		clickMenu();
		navActive();
		
		

	});


}());