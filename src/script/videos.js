// video list link hijacking and modal insertion
'use strict'

var removeClass = require('amp-remove-class')

var util = require('./util')
var modal = require('./modal')

var RE_VIMEO_ID = /(\d+)$/

var getVimeoId = function(url) {
  return url.match(RE_VIMEO_ID)[1]
}

var handleVideoClick = function(modal, embed, element) {
  var vimeoId = getVimeoId(element.getAttribute('href'))

  embed.src = '//player.vimeo.com/video/' + vimeoId
  removeClass(modal, 'is-hidden')
}

var initVideoLink = function(modal, embed, element) {
  element.addEventListener('click', function(event) {
    event.stopPropagation()
    event.preventDefault()

    handleVideoClick(modal, embed, element)
  })
}

module.exports = {
  init: function initVideos(root) {
    var document = root.document
    var filmSection = document.getElementById('film')
    var videoLinks = filmSection.querySelectorAll('.story-link')

    var embed = document.createElement('iframe')
    var videoModal = modal.create(document, embed, function() {
      embed.src = ''
    })

    util.forEach(videoLinks, function(link) {
      initVideoLink(videoModal, embed, link)
    })
  }
}
