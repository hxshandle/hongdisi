$(function(){
  var root = $('.landing_profile');
  var canSwitch = true;
  $('.col3 .nav',root).click(function(){
    if(!canSwitch){
      return;
    }
    canSwitch = false;
    var $this = $(this);
    if($this.hasClass("active")){
      return;
    }
    $('.col3 .active',root).removeClass("active");
    var ref = $this.data("ref");
    $(".profile,.quanshi,.dinwei").css({display:"none"});
    $this.addClass("active");
    $('.'+ref).fadeIn(1000,function(){
      canSwitch = true;
    });
    $('.'+ref+" .txt").jScrollPane();
  });
});
