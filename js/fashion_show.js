$(function() {
  var curXiLie = "fs-1";
  function switchShow(val) {
    alert('switch show ' + val);
  }

  // resize image xilie
  function resizeXiLieImg() {
    var WW = $(window).width();
    var w = Math.floor((WW - 2) / 3);
    $('img:not(.camera)', '#' + curXiLie).each(function(idx, el) {
      var mr = (idx + 1) % 3 === 0 ? '0px': '1px';
      $(this).css({
        width: w + 'px',
        'margin-right': mr
      });
    });
    var _img = $('img', '#' + curXiLie).eq(0);
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
  $('.close').click(function() {
    var $this = $(this);
    var _id = $this.parent().attr('id');
    TweenLite.to('#' + _id, 1, {
      top: '1000px'
    });
  });
});

