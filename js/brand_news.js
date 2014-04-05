$(function() {
  var root = $('#brand-news');
  var itemLength = $('.item', root).length;
  var curItemIdx = 0;
  var curLeft = 0;
  var stepLength = 253;

  function moveStep(step) {
    var $el = $('#news-scroll-inner', root).eq(0);
    curLeft = curLeft - stepLength * step;
    TweenLite.to('#news-scroll-inner', 1, {
      left: curLeft + 'px'
    });
  }

  function canNext() {
    return curItemIdx + 3 < itemLength ? true: false;
  }
  function canPre() {
    return curItemIdx > 0 ? true: false;
  }

  $('.pre', root).hover(
  function() {
    if (canPre()) {
      $(this).addClass('active');
    }
  },
  function() {
    $(this).removeClass('active');
  }).click(function() {
    if (canPre()) {
      curItemIdx--;
      moveStep( - 1);
      if (!canPre()) {
        $(this).removeClass('active');
      }
    }
  });

  $('.next', root).hover(
  function() {
    if (canNext()) {
      $(this).addClass('active');
    }
  },
  function() {
    $(this).removeClass('active');
  }).click(function() {
    if (canNext()) {
      curItemIdx++;
      moveStep(1);
      if (!canNext()) {
        $(this).removeClass('active');
      }
    }
  });

  // handler hover
  $('.item', root).hover(
  function() {
    $('.icon', $(this)).attr('src', "img/news-active.png");
  },
  function() {
    $('.icon', $(this)).attr('src', "img/news.png");
  });
});

