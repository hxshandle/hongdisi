var WW, WH;
function landingLayout() {
	$('.landing-section').css({
		height: WH + 'px'
	});
}

function doResize() {
	WW = $(window).width();
	WH = $(window).height();
	landingLayout();
}

$(function() {
	$('.jScrollPane').jScrollPane();
	$(".img-liquid-fill").imgLiquid();
	$(".img-liquid-fill-top").imgLiquid({verticalAlign:'top'});
	$('.top-menu a').smoothScroll();
	doResize();
	$(window).resize(doResize);
});

