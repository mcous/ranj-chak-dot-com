// reposition the navigation bar when scrolled away
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

module.exports = {
  init: function(root, scroll, fade) {
    var document = root.document
    var container = document.getElementById('social-links-container')
    var social = document.getElementById('social-links')
    var isInView = true
    var isTransitioning = false

    scroll.add(function onNavScroll(scrollTop) {
      if (isTransitioning) {
        return
      }

      var rect = container.getBoundingClientRect()
      var top = rect.top
      var height = rect.height
      var limit = root.innerHeight - (height / 2)

      if ((top > limit) && (isInView === true)) {
        isInView = false
        isTransitioning = true

        fade.out(social, function() {
          container.style.height = height + 'px'
          addClass(social, 'is-side-social')
          fade.in(social, function() {
            isTransitioning = false
          })
        })
      }

      else if ((top < limit) && (isInView === false)) {
        isInView = true
        fade.out(social, function() {
          container.style.height = 'auto'
          removeClass(social, 'is-side-social')
          fade.in(social, function() {
            isTransitioning = false
          })
        })
      }
    })
  }
}
