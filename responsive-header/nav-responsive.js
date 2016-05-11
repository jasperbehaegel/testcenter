(function ($) {

	$.fn.navResponsive = function (options) {

		// Vars
		var root_element = this;

		// Settings
		var settings = $.extend({
			// toggle element
			togglerSelector: '.nav-toggler'
			// viewport treshold (display menu always when viewport wider then treshold)
			, viewportTreshold: 600
			// open state class
			, menuOpenClass: 'is-open'
		}, options);

		//
		var toggler = root_element.find(settings.togglerSelector);
		var state = {
			menu: {
				open: false
			},
			viewport: {
				overtreshold: false
			}
		};

		var viewport = {
			checkWidth: function(){

				if($( window ).width() >= settings.viewportTreshold){
					state.viewport.overtreshold = true;
					menu.fix();
				}
				else{
					state.viewport.overtreshold = false;
					menu.close();
				}
			}
		};

		var menu = {
			open: function(){
				state.menu.open = true;
				root_element.addClass(settings.menuOpenClass);
				setIcon.cross();
			},
			close: function(){
				state.menu.open = false;
				root_element.removeClass(settings.menuOpenClass);
				setIcon.menu();
			},
			fix: function(){
				state.menu.open = true;
				root_element.addClass(settings.menuOpenClass);
				setIcon.menu();
			}
		};

		var setIcon = {
			menu: function(){
				toggler.find('.icon-animated').addClass('icon-animated--menu');
				toggler.find('.icon-animated').removeClass('icon-animated--cross');
			},
			cross: function(){
				toggler.find('.icon-animated').addClass('icon-animated--cross');
				toggler.find('.icon-animated').removeClass('icon-animated--menu');
			}
		};


		// Init: check viewport
		viewport.checkWidth();

		// On window resize: check viewport
		$( window ).resize(function(){
			viewport.checkWidth();
		});

		// Init: Set click event to toggle menu (open / close)
		toggler.on('click', function(){

			if(!state.viewport.overtreshold){

				if(state.menu.open){
					menu.close();
				}
				else{
					menu.open();
				}
			}
		});



		// Return original element
		return this;
	};

}(jQuery));


$(function(){

	// Init

});