// navigation bar
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var initNavScroll = function(container, scroll, fade) {
  var nav = container.querySelector('#nav')
  var isInView = true
  var isTransitioning = false

  var handleInView = function(shouldBeInView, height) {
    if (shouldBeInView !== isInView) {
      isTransitioning = true

      fade.out(nav, function() {
        if (shouldBeInView) {
          container.style.height = 'auto'
          removeClass(nav, 'is-side-nav')
        }

        else {
          container.style.height = height + 'px'
          addClass(nav, 'is-side-nav')
        }

        fade.in(nav, function() {
          isTransitioning = false
        })
      })
    }

    isInView = shouldBeInView
  }

  scroll.add(function onNavScroll() {
    if (isTransitioning) {
      return
    }

    var rect = container.getBoundingClientRect()
    var top = rect.top
    var height = rect.height
    var threshold = -3 * height / 4

    handleInView((top > threshold), height)
  })
}

module.exports = {
  init: function(root, scroll, fade) {
    var document = root.document
    var container = document.getElementById('nav-container')

    // change position on scroll
    initNavScroll(container, scroll, fade)
  }
}
