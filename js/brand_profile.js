$(function(){
  var root = $('.landing_profile');
  $('.col3 .nav',root).click(function(){
    var $this = $(this);
    if($this.hasClass("active")){
      return;
    }
    $('.col3 .active',root).removeClass("active");
    var ref = $this.data("ref");
    $(".profile,.quanshi,.dinwei").css({display:"none"});
    $this.addClass("active");
    $('.'+ref).fadeIn(2000);
    $('.'+ref+" .txt").jScrollPane();
  });
});