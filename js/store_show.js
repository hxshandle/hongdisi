$(function() {
  var currentStore = $('#store-selector option').eq(0).attr('value');
  var imgW = 1000;
  var offsetLeft = 0;
  var canMove = true;
  var $currentStore = null;
  var scrollLeft = 0;

  function placeImageGallery(target) {
    var WW = $(window).width();
    var spareW = Math.floor(WW - imgW) / 2;
    offsetLeft = - (imgW - spareW);
    scrollLeft = offsetLeft;
    var maskRL = spareW + imgW;
    $currentStore = $('#' + currentStore);
    $currentStore.css({
      left: offsetLeft + 'px',
      display: 'block',
    });
    $('.mask-left').css({
      width: spareW + 'px'
    });
    $('.mask-right').css({
      width: spareW + 'px',
      left: maskRL + 'px'
    });
    TweenLite.to('#'+currentStore,1,{opacity:1});
  }

  function switchStore(target) {
    TweenLite.to('#' + currentStore, 1, {
      opacity: 0,
      onComplete: function() {
        $currentStore.css({display:'none'});
        currentStore = target;
        placeImageGallery();
      }
    })
  }

  $('#store-selector').selectbox({
    onChange: function(val, inst) {
      switchStore(val);
    }
  });

  $('.pre-img').click(function() {
    if (!canMove) {
      return;
    }
    canMove = false;
    $currentStore.find('img:first').clone(true, true).appendTo($currentStore);
    var _l = scrollLeft - imgW;
    TweenLite.to('#' + currentStore, 2, {
      left: _l + 'px',
      onComplete: function() {
        $currentStore.find('img:first').remove();
        canMove = true;
        $currentStore.css({
          left: offsetLeft + 'px'
        });
      }
    });
  });
  $('.next-img').click(function() {
    if (!canMove) {
      return;
    }
    canMove = false;
    $currentStore.find('img:last').clone(true, true).prependTo($currentStore);
    scrollLeft = parseInt($currentStore.css('left')) - imgW;
    $currentStore.css({
      left: scrollLeft + 'px'
    });
    var _l = scrollLeft + imgW;
    TweenLite.to('#' + currentStore, 2, {
      left: _l + 'px',
      onComplete: function() {
        $currentStore.find('img:last').remove();
        canMove = true;
        scrollLeft = offsetLeft;
      }
    });
  });

  placeImageGallery();
  $(window).resize(placeImageGallery);
});

