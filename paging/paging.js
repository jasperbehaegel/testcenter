//
// Paging
// TODO: Convert this script to a jQuery extension, independantly of class names and elements
//

// Function: paging
var paging = {

	init: function(){

		//
		paging.setpage($('.paging__page--number').first());

		// Click events
		$('.paging')
			.on('click', '.paging__page--number', function(){
				paging.setpage($(this));
			})
			.on('click', '.paging__page--previous:not(.paging__page--disabled)', function(){
				paging.previous($(this).closest('.paging'));
			})
			.on('click', '.paging__page--next:not(.paging__page--disabled)', function(){
				paging.next($(this).closest('.paging'));
			});
	},

	setpage: function(page){

		// Deselect all pages
		page.closest('.paging').find('.paging__page').removeClass('paging__page--selected');

		// Select page
		page.addClass('paging__page--selected');

		// Set visibility
		paging.display(page);

		// Check next/prev buttons
		paging.checkprevnext(page.closest('.paging'));
	},

	display: function(page){

		// Hide all
		page.closest('.paging').find('.paging__page--number').addClass('paging__page--hidden');

		// Clear "more" buttons
		page.closest('.paging').find('.paging__page--more').remove();

		// Reveal page
		page.removeClass('paging__page--hidden');

		// Reveal surrounding
		page.next().removeClass('paging__page--hidden');
		page.next().next().removeClass('paging__page--hidden');
		page.prev().removeClass('paging__page--hidden');
		page.prev().prev().removeClass('paging__page--hidden');

		// Reveal first & last
		page.closest('.paging').find('.paging__page--number').first().removeClass('paging__page--hidden');
		page.closest('.paging').find('.paging__page--number').last().removeClass('paging__page--hidden');

		// Insert "more" buttons if necessary
		if(page.prevAll('.paging__page--hidden').length > 0){
			var morebutton = $('<li>').addClass('paging__page paging__page--more paging__page--disabled').html('&hellip;');
			morebutton.insertBefore(page.prev().prev());
		}
		if(page.nextAll('.paging__page--hidden').length > 0){
			var morebutton = $('<li>').addClass('paging__page paging__page--more paging__page--disabled').html('&hellip;');
			morebutton.insertAfter(page.next().next());
		}
	},

	previous: function(pagingbox){

		// Get current page
		var currentpage = pagingbox.find('.paging__page--selected');

		// Select page
		paging.setpage(currentpage.prev('.paging__page--number'));
	},

	next: function(pagingbox){

		// Get current and next page
		var currentpage = pagingbox.find('.paging__page--selected');

		// Select page
		paging.setpage(currentpage.next('.paging__page--number'));
	},

	checkprevnext: function(pagingbox){

		// Get current page
		var currentpage = pagingbox.find('.paging__page--selected');

		//
		if(currentpage.prev().hasClass('paging__page--previous')){
			pagingbox.find('.paging__page--previous').addClass('paging__page--disabled');
		} else {
			pagingbox.find('.paging__page--previous').removeClass('paging__page--disabled');
		}

		//
		if(currentpage.next().hasClass('paging__page--next')){
			pagingbox.find('.paging__page--next').addClass('paging__page--disabled');
		} else {
			pagingbox.find('.paging__page--next').removeClass('paging__page--disabled');
		}
	}
};