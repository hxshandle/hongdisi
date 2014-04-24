$(function() {
  var curXiLie = "fs-1";
  var imgW = 1000;
  var offsetLeft = 0;
  function switchShow(val) {
    var originalId = $('.lv1.active').attr('id');
    if (val == originalId) {
      return;
    }
    $('.lv1.active').removeClass('active').stop().fadeOut();
    $('#' + val).addClass('active').stop().fadeIn();
  }
  var canMove = true;
  var $dpShow = $('.dp-show');
  $('.pre-img', '#fashion-show').click(function() {
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
  $('.next-img', '#fashion-show').click(function() {
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
    $('.xilie').css({height:(2*_h+2)+'px'});
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


  // xilie nav left
  $('.pre-img-xilie').click(function(){
    var $this = $(this);
    var $root = $this.parent('.xilie');
    var currentPage = $root.data('currentPage');
    if(currentPage === 0){
      return;
    }
    var imgs = $root.find('li');
    //show pre page
    var startIdx = (currentPage-1)*6;
    for(var i = startIdx; i < startIdx+6;i++){
      imgs.eq(i).fadeIn(800);
    }
    $root.data('currentPage',--currentPage);
    
  });
  
  // xilie nav right
  $('.next-img-xilie').click(function(){
    var $this = $(this);
    var $root = $this.parent('.xilie');
    var currentPage = $root.data('currentPage');
    var pageCount = $root.data('pageCount');
    if(currentPage == pageCount-1){
      return;
    }
    //hidden current page
    var imgs = $root.find('li');
    var startIdx = currentPage * 6;
    for(var i = startIdx; i < startIdx+6;i++){
      imgs.eq(i).fadeOut();
    }
    $root.data('currentPage',++currentPage);


  });

  var canShow = true;
  var currentXilie = null;
  // Process Xilie page nation
  function processXiliePagenation(){
    if(currentXilie == null){
      return;
    }
    var $this = $('#'+currentXilie);
    if($this.data('processed')){
      return;
    }
    $this.data('processed',true);
    var imgs = $this.find('li');
    if(imgs.length > 6){
      var pageCount = Math.ceil(imgs.length/6);
      $this.data('pageCount',pageCount);
      $this.data('currentPage',0);
    }
    
  }

  $('.lv-xl').click(function() {
    if (!canShow) {
      return;
    }
    canShow = false;
    var $this = $(this);
    currentXilie = $this.data('ref');
    $('#' + $this.data('ref')).addClass('active');
    TweenLite.to('#' + $this.data('ref'), 1, {
      top: '0px',
      onComplete: function() {
        processXiliePagenation();
        canShow = true;
      }
    });
  });
  // level 2
  $('.lv-2').click(function() {
    var $this = $(this);
    var ref = $this.data('ref');
    $('.big-show').css({
      display: 'none'
    });
    $('#' + ref).addClass('active').css({
      display: 'block',
      top: '0px'
    });
    TweenLite.to('.big-show-outer', 1, {
      top: '0px'
    });
  });
  // close level 3
  $('.close').click(function() {
    var $this = $(this);
    var _id = $this.parent().attr('id');
    TweenLite.to('#' + _id, 1, {
      top: '1000px'
    });
  });
  $('.close-big-show').click(function() {
    TweenLite.to('.big-show-outer', 1, {
      top: '1000px'
    });
  });

  // big show
  $('.big-show-wrapper img').on('load', function() {
    var $this = $(this);
    $this.data('width', $this.width());
    $this.data('height', $this.height());
  }).each(function(){
    var $this = $(this);
    this.src = $this.attr('src');
  });

  var moveInterval = null;
  var imageOuterHeight = 701;
  function stopMoveUpDown() {
    if (moveInterval != null) {
      clearInterval(moveInterval);
      moveInterval = null;
    }
  }
  function _moveDown($target, h) {
    var _pos = $target.position();
    if (h + _pos.top - 701 == 0) {
      stopMoveUpDown();
      return;
    }
    var step = (701 + 5 - _pos.top) > h ? h - 701 + _pos.top: 5;
    $target.css({
      top: (_pos.top - step) + 'px'
    });
  }
  function _moveUp($target, h) {
    var _pos = $target.position();
    if(_pos.top == 0){
      stopMoveUpDown();
      return;
    }
    var step = _pos.top + 5 < 0 ? 5 : -_pos.top;
    $target.css({
      top: (_pos.top + step) + 'px'
    });
  }
  function moveUpDown(direction) {
    if (null != moveInterval) {
      return;
    }
    var $target = $('.big-show-wrapper .active');
    var pos = $target.position();
    var imgHeight = $target.data('height');
    moveInterval = setInterval(function() {
      if(direction > 0){
        _moveDown($target,imgHeight);
      }else{
        _moveUp($target,imgHeight);
      }
    },
    20);
  }

  $('.big-show-wrapper').mousemove(function(e) {
    var parentOffset = $(this).parent().offset();
    var relativeXPosition = (e.pageX - parentOffset.left);
    var relativeYPosition = (e.pageY - parentOffset.top);

    if (relativeYPosition < 200) {
      stopMoveUpDown();
      moveUpDown( - 1);
    }
    if (relativeYPosition > 500) {
      stopMoveUpDown();
      moveUpDown(1);
    }
    if(relativeYPosition > 200 && relativeYPosition < 500){
      stopMoveUpDown();
    }
  });

});

