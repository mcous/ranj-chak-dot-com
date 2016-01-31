// reposition the navigation bar when scrolled away
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

module.exports = {
  init: function(root, scroll, fade) {
    var document = root.document
    var container = document.getElementById('nav-container')
    var nav = document.getElementById('nav')
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
}
