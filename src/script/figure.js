// do cool things with the about me figure on hover
'use strict'

var content = require('../content.json').sectionContent.about.figure

var figure

var checkMousePosition = function(x, y) {
  var imageBox = figure.getBoundingClientRect()

  var x = (x - imageBox.left) / imageBox.width
  var y = (y - imageBox.top) / imageBox.height
  var box = this.box

  if ((x > box[0]) && (y > box[1]) && (x < box[2]) && (y < box[3])) {
    return this.id
  }

  return content.default
}

module.exports = {
  init: function(root) {
    var document = root.document
    figure = document.getElementById('about-figure-image')
    // var figureContainer = document.getElementById('about-figure-image-container')
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
      var imageName = content.default
      var index = 0

      while ((imageName === content.default) && (index < boxes.length)) {
        var check = boxes[index++]
        imageName = check(event.clientX, event.clientY)
      }

      var newSrc = content[imageName]
      if (figure.src !== newSrc) {
        figure.src = newSrc
        figure.alt = imageName
      }
    })

    figure.addEventListener('mouseout', function() {
      figure.src = content[content.default]
      figure.alt = content.default
    })
  }
}
