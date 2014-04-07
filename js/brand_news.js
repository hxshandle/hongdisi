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

  function triggleNewsIcon(isActive) {
    if (isActive) {
      $('.item.active .icon', root).attr('src', "img/news-active.png");
    } else {

      $('.item.active .icon', root).attr('src', "img/news.png");
      $('.item.active', root).removeClass('active');
    }
  }

  // handler hover
  $('.item', root).hover(
  function() {
    $('.icon', $(this)).attr('src', "img/news-active.png");
  },
  function() {
    if (!$(this).hasClass('active')) {
      $('.icon', $(this)).attr('src', "img/news.png");
    }
  }).click(function() {
    var $this = $(this);
    var ref = $this.data('ref');
    var $target = $('#' + ref);
    if ($target.hasClass('active')) {
      return;
    }
    triggleNewsIcon(false);
    $this.addClass('active');
    triggleNewsIcon(true);
    $('.news.active', root).removeClass('active').hide();
    /*
    $target.addClass('active').fadeIn(1000, function() {
      $('.jScrollPane', $target).jScrollPane();
    });
    */
    $target.fadeIn(1000, function() {
      $target.addClass('active');
      $('.jScrollPane', $target).jScrollPane();
    });
  });
  triggleNewsIcon(true);
});

