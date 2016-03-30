'use strict'

module.exports = {
  forEach: function forEach(arrayLike, iteratee) {
    for (var i = 0; i < arrayLike.length; i++) {
      iteratee(arrayLike[i], i)
    }
  },

  filter: function filter(arrayLike, predicate) {
    var filtered = []

    for (var i = 0; i < arrayLike.length; i++) {
      if (predicate(arrayLike[i], i)) {
        filtered.push(arrayLike[i])
      }
    }

    return filtered
  },

  map: function map(arrayLike, iteratee) {
    var mapped = []

    for (var i = 0; i < arrayLike.length; i++) {
      mapped.push(iteratee(arrayLike[i], i))
    }

    return mapped
  },

  once: function once(eventEmitter, event, handler) {
    var oneTimeHandler = function(triggeredEvent) {
      eventEmitter.removeEventListener(event, oneTimeHandler)
      handler(triggeredEvent)
    }

    eventEmitter.addEventListener(event, oneTimeHandler)
  }
}
