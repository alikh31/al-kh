(($) ->
  'use strict'
  $(document).ready ->
      window.scrollReveal = new scrollReveal
      $('#specifications').carousel interval: 3000
      $ ->
          $('.move-me a').bind 'click', (event) ->
              #just pass move-me in design and start scrolling
              $anchor = $(this)
              $('html, body').stop().animate { scrollTop: $($anchor.attr('href')).offset().top }, 1000, 'easeInOutQuad'
              event.preventDefault()
) jQuery
