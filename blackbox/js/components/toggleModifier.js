(function ($) {

/*
	toggleModifier lets you toggle between multiple possible modifier classes (BEM).
	When triggered, it toggles the current modifier class (in list) to the next modifier class
	or, if at the last one, toggles the modifier class back to the first one.

	mandatory settings:
	- modifiers (array of modifier to toggle between)

	optional settings:
	- separator (between block and modifier)

	dependencies:
	- jQuery
    ==========================================================================================================
*/

	$.fn.toggleModifier = function (options) {

		// Vars
		var root_element = this;
		var classes = root_element.attr('class').split(' ');
		var block = '';

		// Settings
		var settings = $.extend({
			// List of modifiers (without the "block--" part)
			modifiers: [''],
			// block-modifier separator
			separator: '--'
		}, options);

		// Get base class
		for(var i = 0; classes.length > i; i++){

			// Find first modifier class you come across
			if(classes[i].indexOf(settings.separator) > -1){

				// Extract block from it
				block = classes[i].substr(0, classes[i].indexOf(settings.separator));

				// Exit loop
				break;
			}
		}

		// Toggle class
		for(var i = 0; settings.modifiers.length > i; i++){

			if(root_element.hasClass(block + settings.separator + settings.modifiers[i])){

				// Remove current class
				root_element.removeClass(block + settings.separator + settings.modifiers[i]);

				// Toggle to next class
				if(settings.modifiers.length == i + 1){
					root_element.addClass(block + settings.separator + settings.modifiers[0]);
				} else {
					root_element.addClass(block + settings.separator + settings.modifiers[i + 1]);
				}

				// Exit loop
				break;
			}
		};

		// Return original element
		return this;
	};

}(jQuery));