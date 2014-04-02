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
	$(".img-liquid-fill").imgLiquid();
	$(".img-liquid-fill-top").imgLiquid({verticalAlign:'top'});
	doResize();
	$(window).resize(doResize);
});

