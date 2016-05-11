(function ($) {

	/*
	    toggleModifier lets you toggle between multiple possible modifier classes.
	    When triggered, it toggles the current modifier class (in list) to the next modifier class
	    or, if at the last one, toggles the modifier class back to the first one.
	    In the settings following parameters are passed:
	     - block (base element class)
	     - modifiers to toggle between (array)
	     - separator (between block and modifier)
	    ==========================================================================================================
	*/

	$.fn.toggleModifier = function (options) {

		// Vars
		var root_element = this;

		// Settings
		var settings = $.extend({
			// BEM block class
			baseClass: '',
			// List of modifiers (without the "block--" part)
			modifiers: [''],
			// block-modifier separator
			separator: '--'
		}, options);

		// Toggle class
		for(var i = 0; settings.modifiers.length > i; i++){

			if(root_element.hasClass(settings.baseClass + settings.separator + settings.modifiers[i])){

				// Remove current class
				root_element.removeClass(settings.baseClass + settings.separator + settings.modifiers[i]);

				// Toggle to next class
				if(settings.modifiers.length == i + 1){
					root_element.addClass(settings.baseClass + settings.separator + settings.modifiers[0]);
				} else {
					root_element.addClass(settings.baseClass + settings.separator + settings.modifiers[i + 1]);
				}

				// Return original element
				return this;

				// Exit loop
				break;
			}
		};
	};

}(jQuery));


$(function(){

	// Init toggle modifier
	$('.js-toggle-modifier').each(function(){

		// Vars
		var _this = $(this);
		var modifiers = _this.data('toggle-modifiers').split(', ');
		var baseClass = _this.data('base-class');
		var separator = '--'
		var newModifier = $('<span class="modifier">');

		// Get current modifier and display
		var displayModifierName = function(){
			for(var i = 0; modifiers.length > i; i++){
				if($('.' + baseClass).hasClass(baseClass + separator + modifiers[i])){
					if(!_this.find('.modifier').size()){
						_this.append(newModifier);
					}
					_this.find('.modifier').text('(' + modifiers[i] + ')');
				}
			}
		};

		// Toggle modifier on click
		_this.on('click', function(){

			// Toggle modifier
			$('.' + baseClass).toggleModifier({
				baseClass: baseClass,
				modifiers: modifiers,
				separator: separator
			});

			// Get modifier name
			displayModifierName();
		});

		// On load: display current modifier
		displayModifierName();

	});

});