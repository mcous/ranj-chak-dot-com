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

  scroll.add(function onNavScroll(scrollTop) {
    if (isTransitioning) {
      return
    }

    var rect = container.getBoundingClientRect()
    var top = rect.top
    var height = rect.height
    var middle = height / 2

    if ((top < -middle) && (isInView === true)) {
      isInView = false
      isTransitioning = true

      fade.out(nav, function() {
        container.style.height = height + 'px'
        addClass(nav, 'is-side-nav')

        fade.in(nav, function() {
          isTransitioning = false
        })
      })
    }

    else if ((top > -middle) && (isInView === false)) {
      isInView = true
      fade.out(nav, function() {
        container.style.height = 'auto'
        removeClass(nav, 'is-side-nav')

        fade.in(nav, function() {
          isTransitioning = false
        })
      })
    }
  })
}

module.exports = {
  init: function(root, scroll, fade) {
    var document = root.document
    var container = document.getElementById('nav-container')
    var navLinks = container.querySelectorAll('.nav-link')

    // change position on scroll
    // initNavScroll(container, scroll, fade)

    // change icon on hover
    for (var i = 0; i < navLinks.length; i++) {
      initNavLink(navLinks[i])
    }
  }
}
