// switch the nav icon source on hover
'use strict'

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

module.exports = {
  init: function(root) {
    var document = root.document
    var navLinks = document.querySelectorAll('.nav-link')

    for (var i = 0; i < navLinks.length; i++) {
      initNavLink(navLinks[i])
    }
  }
}
