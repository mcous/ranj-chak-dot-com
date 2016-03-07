'use strict'

var addClass = require('amp-add-class')

module.exports = {
  create: function createMode(document, content, postClose) {
    var closeButton = document.createElement('button')
    var modal = document.createElement('div')
    var container = document.createElement('div')

    addClass(modal, 'is-hidden')
    addClass(modal, 'modal')
    addClass(closeButton, 'modal-close-button')
    addClass(container, 'modal-container')
    addClass(content, 'modal-content')

    container.appendChild(closeButton)
    container.appendChild(content)
    modal.appendChild(container)
    document.body.appendChild(modal)

    var closeModal = function(event) {
      event.stopPropagation()
      event.preventDefault()

      addClass(modal, 'is-hidden')
      if (postClose) {
        postClose()
      }
    }

    content.addEventListener('click', function(event) {
      event.stopPropagation()
      event.preventDefault()
    })

    modal.addEventListener('click', closeModal)
    closeButton.addEventListener('click', closeModal)

    document.addEventListener('keyup', function(event) {
      if (event.key === 'Escape' || event.code === 'Escape' || event.keyCode === 27) {
        closeModal(event)
      }
    })

    return modal
  }
}
