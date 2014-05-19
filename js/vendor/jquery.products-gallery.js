;
(function($, window) {
  var defaults = {
    perNumber: 4,
    width: 0,
    resize: true,
    itemPadding: 5,
    navWidth: 90,
    css: '',
    container: '.prod-container',
    itemCss: 'prod-item',
    height: 500,
    duration: 0.5,
    itemClick: null
  };

  $.fn.productsGallery = function(opt) {
    var $w = $(window);
    return this.each(function() {
      var $t = $(this);
      var cfg = $.extend(defaults, opt);
      var viewWindow = $(cfg.prodWindow);
      // the container
      var $container = $t.children(cfg.container);
      var $ul = $container.find('ul');
      var itemW = _calc();
      var totalProdCount = $ul.children().length;

      /**
       * Calc each item width
       */
      function _calc() {
        var winW = $w.width() < $t.width() ? $t.width() : $w.width();
        var realW = winW - 2 * cfg.navWidth - cfg.perNumber * 2 * cfg.itemPadding;
        var itemW = Math.floor(realW / cfg.perNumber);
        return itemW;
      }

      var canMove = true;
      function _move(direction) {
        if (!canMove) {
          return;
        }
        var step = (itemW + 2 * cfg.itemPadding) * direction;
        var curIdx = $t.data('idx');
        if (direction < 0 && curIdx == totalProdCount  - cfg.perNumber) {
          return;
        }
        if (direction > 0 && curIdx === 0) {
          return;
        }
        var _l = $ul.position().left + step;
        curIdx = curIdx - direction;
        $t.data('idx', curIdx);
        canMove = false;
        TweenLite.to('#' + $ul.attr('id'), cfg.duration, {
          left: _l,
          onComplete: function() {
            canMove = true;
          }
        });
      }

      function _resetNavPosition(src) {
        var _img = new Image();
        _img.onload = function() {
          var _h = itemW * this.height / this.width;
          if ($('.products-gallery-nav-btn', $t).length == 0) {
            setTimeout(_resetNavPosition(src), 500);
          } else {
            $('.products-gallery-nav-btn', $t).css({
              top: (_h/2) + 'px'
            });
          }
        };
        _img.src = src;
      }

      function _generateNav() {
        if ($t.data('hasNav')) {
          return;
        }
        $t.data('hasNav', true);
        var $pre = $('<a href="javascript:void(0)" class="products-gallery-pre products-gallery-nav-btn"></a>');
        var $next = $('<a href="javascript:void(0)" class="products-gallery-next products-gallery-nav-btn"></a>');
        $pre.appendTo($t);
        $next.appendTo($t);
        $pre.click(function() {
          _move(1);
        });
        $next.click(function() {
          _move( - 1);
        });
      }
      /**
       * The main process function
       */
      function _process() {
        $t.addClass('products-gallery');
        $t.addClass(cfg.css);
        $container.addClass('products-gallery-container');
        var $prodItems = $ul.children();
        $prodItems.addClass('prod-item ' + cfg.itemCss);
        if (cfg.itemClick != null) {
          $prodItems.click(function() {
            cfg.itemClick.call(this, this);
          });
        }
        itemW = _calc();
        // prod item css setting
        $prodItems.css({
          padding: cfg.itemPadding + 'px',
          width: itemW + 'px'
        });
        // container css
        $container.css({
          margin: '0 ' + cfg.navWidth + 'px',
          width: (cfg.perNumber * (itemW + 2 * cfg.itemPadding)) + 'px',
          height: cfg.height + 'px'
        });
        $ul.css({
          width: ((itemW + 2 * cfg.itemPadding) * $prodItems.length) + 'px'
        });

        if (!$t.data('idx')) {
          $t.data('idx', 0);
        }
        _generateNav();
        _resetNavPosition($prodItems.eq(0).find('img').eq(0).attr('src'));
      }

      _process();
      if (cfg.resize) $w.resize(_process);
    });
  }

})(jQuery, window);

