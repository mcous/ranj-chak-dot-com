// do cool things with the about me figure on hover
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var util = require('./util')
var fade = require('./css-fade')
var content = require('../content.json').sectionContent.about.figure

var SWITCH_INTERVAL_MS = 1200

var container
var figures
var figureSwitchInterval

var current = content.default
var figureNames = [current].concat(content.areas.map(function(area) {
  return area.id
}))

var getFigureElementId = function(name) {
  return ('about-figure-' + name)
}

var checkMousePosition = function(x, y) {
  var imageBox = container.getBoundingClientRect()

  var x = (x - imageBox.left) / imageBox.width
  var y = (y - imageBox.top) / imageBox.height
  var box = this.box

  if ((x > box[0]) && (y > box[1]) && (x < box[2]) && (y < box[3])) {
    return this.id
  }

  return current
}

var setFigure = function(imageName) {
  var newId = getFigureElementId(imageName)

  var toFadeOut = figures.filter(function(figure) {
    return ((figure.fade === 'is-faded-in') && (figure.id !== newId))
  })

  var toFadeIn = figures.filter(function(figure) {
    return ((figure.fade === 'is-faded-out') && (figure.id === newId))
  })

  toFadeIn.forEach(function(figure) {
    figure.fade = 'is-faded-in'
    fade.in(figure.element)
  })

  toFadeOut.forEach(function(figure) {
    setTimeout(function() {
      figure.fade = 'is-faded-out'
      fade.out(figure.element)
    }, (fade.FADE_TIME_MS / 2))
  })

  current = imageName
}

var resumeSwitching = function(switching) {
  setFigure(current)

  // switch figures on a 1 second delay
  figureSwitchInterval = setInterval(function() {
    var currentIndex = figureNames.indexOf(current)
    var nextIndex = (++currentIndex < figureNames.length) ? currentIndex : 0

    setFigure(figureNames[nextIndex])
  }, SWITCH_INTERVAL_MS)
}

var pauseSwitching = function() {
  clearInterval(figureSwitchInterval)
}

module.exports = {
  init: function(root) {
    var document = root.document

    container = document.getElementById('about-figure-container')
    var allFigures = container.querySelectorAll('.about-figure')

    figures = util.map(allFigures, function(figure) {
      var state = {
        id: figure.id,
        element: figure,
        fade: 'is-faded-out'
      }

      if (state.id === getFigureElementId(current)) {
        state.fade = 'is-faded-in'
      }

      return state
    })

    // grab the boxes
    var boxes = content.areas.map(function(area) {
      return checkMousePosition.bind(area)
    })

    container.addEventListener('mousemove', function(event) {
      var imageName = current
      var index = 0
      pauseSwitching()

      while ((imageName === current) && (index < boxes.length)) {
        var check = boxes[index++]
        imageName = check(event.clientX, event.clientY)
      }

      setFigure(imageName)
    })

    container.addEventListener('mouseout', function() {
      resumeSwitching()
    })

    resumeSwitching()
  }
}
