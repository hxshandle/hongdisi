$(function() {

  function toggleTopNav() {
    var scrollTop = $(window).scrollTop();
    var WH = $(window).height();
    if (scrollTop > WH - 77) {
      $('.top-nav').fadeIn(1000);
    } else {
      $('.top-nav').fadeOut(1000);
    }
  }

  $(window).on('scroll', toggleTopNav);

  $('.search-icon').click(function() {
    var isShow = $('#universal-search').data("show");
    $('#universal-search').data("show", ! isShow);
    if (isShow) {
      TweenLite.fromTo('#universal-search', 1, {
        width: 168
      },
      {
        width: 0
      });
    } else {
      TweenLite.fromTo('#universal-search', 1, {
        width: 0
      },
      {
        width: 168
      });
    }
  });
  // click
  $('.top-menu a').click(function() {
    var WW = $(window).width();
    if (WW < 1460) {
      $('.top-menu').toggle();
    }
  });
  // hover 
  $('.top-menu a').hover(
  function() {
    var $this = $(this);
    var _w = $this.width();
    $this.data('en', $this.text());
    $this.text($this.data('zh')).css({
      display: 'inline-block',
      width: _w + 'px'
    });

  },
  function() {
    var $this = $(this);
    $this.text($this.data('en')).css({
      display: 'inline'
    });
  });
  $('.top-menu-toggle').click(function() {
    $('.top-menu').toggle();
  });
  $(window).resize(function() {
    var WW = $(window).width();
    if (WW > 1460) {
      $('.top-menu').show();
    } else {
      $('.top-menu').hide();
    }
  });
});

