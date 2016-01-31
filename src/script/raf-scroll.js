// scroll event handler using raf
// inspired by https://developer.mozilla.org/en-US/docs/Web/Events/scroll
'use strict'

var handlers = []

var trigger = function(event) {
  handlers.forEach(function(handler) {
    handler(event)
  })
}

module.exports = {
  init: function(root, scrollTop) {
    var running = false
    var top = scrollTop()

    root.addEventListener('scroll', function() {
      if (running) {
        return
      }

      running = true
      root.requestAnimationFrame(function() {
        trigger(scrollTop())
        running = false
      })
    })
  },

  add: function(handler) {
    handlers.push(handler)
  },

  remove: function(handler) {
    var index = handlers.indexOf(handler)
    if (index === -1) {
      return false
    }

    handlers.splice(index, 1)
    return true
  }
}
