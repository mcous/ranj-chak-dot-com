// highjack links to images and show a modal instead
'use strict'

var removeClass = require('amp-remove-class')

var util = require('./util')
var modal = require('./modal')

var handleImageLinkClick = function(modal, image, element) {
  image.src = element.getAttribute('href')
  removeClass(modal, 'is-hidden')
}

var initImageLink = function(modal, image, element) {
  element.addEventListener('click', function(event) {
    event.stopPropagation()
    event.preventDefault()

    handleImageLinkClick(modal, image, element)
  })
}

module.exports = {
  init: function initImageModal(root) {
    var document = root.document
    var imageLinks = document.querySelectorAll('a[href$=png]')

    var image = document.createElement('img')
    var imageModal = modal.create(document, image)

    util.forEach(imageLinks, function(link) {
      initImageLink(imageModal, image, link)
    })
  }
}
