(function($) {
  'use strict';
  return $(document).ready(function() {
    window.scrollReveal = new scrollReveal;
    $('#specifications').carousel({
      interval: 3000
    });
    return $(function() {
      return $('.move-me a').bind('click', function(event) {
        var $anchor;
        $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutQuad');
        return event.preventDefault();
      });
    });
  });
})(jQuery);
