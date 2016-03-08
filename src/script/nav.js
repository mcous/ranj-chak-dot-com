// navigation bar
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var initNavLink = function(element) {
  var icon = element.querySelector('.nav-link-icon')
  var source = icon.getAttribute('src')
  var hoverSource = icon.getAttribute('data-hover-src')

  element.addEventListener('mouseover', function() {
    icon.setAttribute('src', hoverSource)
  })

  element.addEventListener('mouseout', function() {
    icon.setAttribute('src', source)
  })
}

var initNavScroll = function(container, scroll, fade) {
  var nav = container.querySelector('#nav')
  var isInView = true
  var isTransitioning = false

  var handleInView = function(shouldBeInView, height) {
    if (shouldBeInView !== isInView) {
      isTransitioning = true

      fade.out(nav, function() {
        if (shouldBeInView) {
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

  scroll.add(function onNavScroll(scrollTop) {
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
    var navLinks = container.querySelectorAll('.nav-link')

    // change position on scroll
    initNavScroll(container, scroll, fade)

    // change icon on hover
    for (var i = 0; i < navLinks.length; i++) {
      initNavLink(navLinks[i])
    }
  }
}
