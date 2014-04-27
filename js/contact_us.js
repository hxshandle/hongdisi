$(function(){
  var scrollController = $.superscrollorama();
  scrollController.addTween("#contact-us-img", TweenMax.from($("#contact-us-img"), 2, {
    css: {
      opacity: "0",
      top:"250px"
    }
  }));
});
