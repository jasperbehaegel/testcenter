(function ($) {

/*
	clearModifiers removes all modifier classes (BEM) from a selector,
	so it will revert to its most basic state

	optional settings:
	- separator (characters between block and modifier part)

	dependencies:
	- jQuery
    ==========================================================================================================
*/

	$.fn.clearModifiers = function (options) {

		// Vars
		var root_element = this;
		var classes = root_element.attr('class').split(' ');

		// Settings
		var settings = $.extend({
			// block-modifier separator
			separator: '--'
		}, options);

		// Clear modifiers
		for(var i = 0; classes.length > i; i++){
			if(classes[i].indexOf(settings.separator) > -1){
				root_element.removeClass(classes[i]);
			}
		}

		// Return original element
		return root_element;
	};

}(jQuery));