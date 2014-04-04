$(function() {
	var root = $('#jiameng');
	var h = $('.section:first', root).height() + 18;
	$('.section-selector', root).css({
		height: h + 'px'
	});
	$('.section', root).mouseenter(function() {
		var root = $('#jiameng').offset();
		var $this = $(this);
		var _t = $this.offset().top - root.top - 110;
		var _h = $this.height() + 18;
		TweenLite.to('#jiameng-section-selector', 1, {
			top: _t,
			height: _h
		});
	});
});

