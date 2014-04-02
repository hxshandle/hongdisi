$(function() {
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