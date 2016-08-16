// do cool things with the about me figure on hover
'use strict'

var util = require('./util')
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

var checkMousePosition = function(mouseX, mouseY) {
  var imageBox = container.getBoundingClientRect()

  var x = (mouseX - imageBox.left) / imageBox.width
  var y = (mouseY - imageBox.top) / imageBox.height
  var box = this.box

  if ((x > box[0]) && (y > box[1]) && (x < box[2]) && (y < box[3])) {
    return this.id
  }

  return current
}

var setFigure = function(imageName) {
  var newId = getFigureElementId(imageName)

  var toHide = figures.filter(function(figure) {
    return figure.id !== newId
  })

  var toShow = figures.filter(function(figure) {
    return figure.id === newId
  })

  toHide.forEach(function(figure) {
    figure.show = false
    util.makeInvisible(figure.element)
  })

  toShow.forEach(function(figure) {
    figure.show = true
    util.makeVisible(figure.element)
  })

  current = imageName
}

var resumeSwitching = function() {
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
        show: false
      }

      if (state.id === getFigureElementId(current)) {
        state.show = true
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
