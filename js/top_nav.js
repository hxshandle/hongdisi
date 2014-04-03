$(function() {
  
  function toggleTopNav(){
    var scrollTop = $(window).scrollTop();
    var WH = $(window).height();
    if(scrollTop > WH-77){
      $('.top-nav').fadeIn(1000);
    }else{
      $('.top-nav').fadeOut(1000);
    }
  }

  $(window).on('scroll',toggleTopNav);

  $('.search-icon').click(function() {
    var isShow = $('#universal-search').data("show");
    $('#universal-search').data("show",!isShow);
    if (isShow) {
      TweenLite.fromTo('#universal-search', 1, {
        width: 168
      }, {
        width: 0
      });
    } else {
      TweenLite.fromTo('#universal-search', 1, {
        width: 0
      }, {
        width: 168
      });
    }
  });
});
