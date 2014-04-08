$(function(){
  $('#store-selector').selectbox({
    onChange:function(val, inst){
      alert(val);
    }
  });

});
