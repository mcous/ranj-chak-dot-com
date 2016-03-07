// do cool things with the about me figure on hover
'use strict'

var content = require('../content.json').sectionContent.about.figure

var SWITCH_INTERVAL_MS = 1000

var figure
var current = content.default
var figureNames = [current].concat(content.areas.map(function(area) {
  return area.id
}))

var checkMousePosition = function(x, y) {
  var imageBox = figure.getBoundingClientRect()

  var x = (x - imageBox.left) / imageBox.width
  var y = (y - imageBox.top) / imageBox.height
  var box = this.box

  if ((x > box[0]) && (y > box[1]) && (x < box[2]) && (y < box[3])) {
    return this.id
  }

  return current
}

var setFigure = function(imageName) {
  var newSrc = content[imageName]

  if (figure.src !== newSrc) {
    figure.src = newSrc
    figure.alt = imageName
  }
}

module.exports = {
  init: function(root) {
    var document = root.document
    var switching = true;

    figure = document.getElementById('about-figure')

    // grab the boxes
    var boxes = content.areas.map(function(area) {
      // DEBUG
      // var boxDiv = document.createElement('div')
      // boxDiv.style.position = 'absolute'
      // boxDiv.style.left = area.box[0] * 100 + '%'
      // boxDiv.style.top = area.box[1] * 100 + '%'
      // boxDiv.style.width = (area.box[2] - area.box[0]) * 100 + '%'
      // boxDiv.style.height = (area.box[3] - area.box[1]) * 100 + '%'
      // figureContainer.appendChild(boxDiv)

      return checkMousePosition.bind(area)
    })

    figure.addEventListener('mousemove', function(event) {
      var imageName = current
      var index = 0
      switching = false

      while ((imageName === current) && (index < boxes.length)) {
        var check = boxes[index++]
        imageName = check(event.clientX, event.clientY)
      }

      setFigure(imageName)
    })

    figure.addEventListener('mouseout', function() {
      switching = true
    })

    // switch figures on a 1 second delay
    setInterval(function() {
      if (switching) {
        var currentIndex = figureNames.indexOf(current)
        var nextIndex = (++currentIndex < figureNames.length) ? currentIndex : 0
        current = figureNames[nextIndex]
        setFigure(current)
      }
    }, SWITCH_INTERVAL_MS)
  }
}
