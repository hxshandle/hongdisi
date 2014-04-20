$(function() {
  var curXiLie = "fs-1";
  var imgW = 1000;
  var offsetLeft = 0;
  function switchShow(val) {
    var originalId = $('.lv1.active').attr('id');
    if(val == originalId){
      return;
    }
    $('.lv1.active').removeClass('active').stop().fadeOut();
    $('#'+val).addClass('active').stop().fadeIn();
  }
  var canMove = true;
  var $dpShow = $('.dp-show');
  $('.pre-img','#fashion-show').click(function() {
    if (!canMove) {
      return;
    }
    canMove = false;
    $dpShow.find('img:first').clone(true, true).appendTo($dpShow);
    var _l = scrollLeft - imgW;
    TweenLite.to('.dp-show', 2, {
      left: _l + 'px',
      onComplete: function() {
        $dpShow.find('img:first').remove();
        canMove = true;
        $dpShow.css({
          left: offsetLeft + 'px'
        });
      }
    });
  });
  $('.next-img','#fashion-show').click(function() {
    if (!canMove) {
      return;
    }
    canMove = false;
    $dpShow.find('img:last').clone(true, true).prependTo($dpShow);
    scrollLeft = parseInt($dpShow.css('left')) - imgW;
    $dpShow.css({
      left: scrollLeft + 'px'
    });
    var _l = scrollLeft + imgW;
    TweenLite.to('.dp-show', 2, {
      left: _l + 'px',
      onComplete: function() {
        $dpShow.find('img:last').remove();
        canMove = true;
        scrollLeft = offsetLeft;
      }
    });
  });

  var imgW = 1000;
  function placeImageGallery() {
    var WW = $(window).width();
    var spareW = Math.floor(WW - imgW) / 2;
    offsetLeft = - (imgW - spareW);
    scrollLeft = offsetLeft;
    var maskRL = spareW + imgW;
    var $gallery = $('.dp-show');
    $gallery.css({
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
  }
  placeImageGallery();

  // resize image xilie
  function resizeXiLieImg() {
    var WW = $(window).width();
    var w = Math.floor((WW - 2) / 3);
    $('img:not(.camera,.close img)', '#' + curXiLie).each(function(idx, el) {
      var mr = (idx + 1) % 3 === 0 ? '0px': '1px';
      $(this).css({
        width: w + 'px',
        'margin-right': mr
      });
    });
    var _img = $('img', '#' + curXiLie).eq(1);
    var _w = _img.width();
    var _h = _img.height();
    $('.mask', '#' + curXiLie).css({
      width: _w,
      height: _h
    });
  }
  resizeXiLieImg();
  $(window).resize(resizeXiLieImg);

  $('#fashion-show .mask').hover(
  function() {
    TweenLite.fromTo(this, 1, {
      opacity: 0
    },
    {
      opacity: 0.4
    });
    TweenLite.fromTo($(this).next().get(0), 1, {
      opacity: 0
    },
    {
      opacity: 0.99
    });
  },
  function() {
    TweenLite.fromTo(this, 1, {
      opacity: 0.4
    },
    {
      opacity: 0
    });
    TweenLite.fromTo($(this).next().get(0), 1, {
      opacity: 0.99
    },
    {
      opacity: 0
    });
  });

  $('#fs-selector').selectbox({
    onChange: function(val, inst) {
      switchShow(val);
    }
  });
  var canShow = true;
  $('.lv-xl').click(function() {
    if (!canShow) {
      return;
    }
    canShow = false;
    var $this = $(this);
    $('#' + $this.data('ref')).addClass('active');
    TweenLite.to('#' + $this.data('ref'), 1, {
      top: '0px',
      onComplete: function() {
        canShow = true;
      }
    });
  });
  // level 2
  $('.lv-2').click(function(){
    var $this = $(this);
    var ref = $this.data('ref');
    $('.big-show').css({display:'none'});
    $('#'+ref).addClass('active').css({display:'block'});
    TweenLite.to('.big-show-outer',1,{top:'0px'});
  });
  // close level 3
  $('.close').click(function() {
    var $this = $(this);
    var _id = $this.parent().attr('id');
    TweenLite.to('#' + _id, 1, {
      top: '1000px'
    });
  });
  $('.close-big-show').click(function(){
    TweenLite.to('.big-show-outer',1,{top:'1000px'});
  });
});

