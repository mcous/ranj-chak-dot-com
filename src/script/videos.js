// video list link hijacking and modal insertion
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var EMBED_ID = 'film-modal-embed'

var modal
var container
var embed

var closeModal = function(event) {
  event.stopPropagation()
  event.preventDefault()

  addClass(modal, 'is-hidden')
  embed.src = ''
}

var changeVideoEmbed = function(vimeoId) {
  embed.src = '//player.vimeo.com/video/' + vimeoId
}

var handleVideoClick = function(element) {
  var vimeoId = element.getAttribute('data-vimeo')

  removeClass(modal, 'is-hidden')
  changeVideoEmbed(vimeoId)
}

var initVideoLink = function(element) {
  element.addEventListener('click', function(event) {
    event.stopPropagation()
    event.preventDefault()

    handleVideoClick(element)
  })
}

var initVideoModal = function(document) {
  var closeButton = document.createElement('button')
  modal = document.createElement('div')
  container = document.createElement('div')
  embed = document.createElement('iframe')

  modal.id = 'film-modal'
  closeButton.id = 'film-modal-close-button'
  container.id = 'film-modal-container'
  embed.id = 'film-modal-embed'

  addClass(modal, 'is-hidden')
  embed.webkitallowfullscreen = true
  embed.mozallowfullscreen = true
  embed.allowfullscreen = true

  container.appendChild(closeButton)
  container.appendChild(embed)
  modal.appendChild(container)
  document.body.appendChild(modal)

  closeButton.addEventListener('click', closeModal)
  document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape' || event.code === 'Escape' || event.keyCode === 27) {
      closeModal(event)
    }
  })
}

module.exports = {
  init: function(root) {
    var document = root.document
    var filmSection = document.getElementById('film')
    var videoLinks = filmSection.querySelectorAll('.story-list-item-link')

    initVideoModal(document)

    var link
    for (var i = 0; i < videoLinks.length; i++) {
      initVideoLink(videoLinks[i])
    }
  }
}
