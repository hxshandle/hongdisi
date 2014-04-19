$(function() {
  function switchShow(val){
    alert('switch show ' + val);
  }

  $('#fashion-show .mask').hover(
    function(){
      TweenLite.fromTo(this,1,{opacity:0},{opacity:0.4});
      TweenLite.fromTo($(this).next().get(0),1,{opacity:0},{opacity:0.99});
    },
    function(){
      TweenLite.fromTo(this,1,{opacity:0.4},{opacity:0});
      TweenLite.fromTo($(this).next().get(0),1,{opacity:0.99},{opacity:0});
    });
  $('#fs-selector').selectbox({
    onChange: function(val, inst) {
      switchShow(val);
    }
  });
});

