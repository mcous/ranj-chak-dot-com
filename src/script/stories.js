// add background images to stories
'use strict'

var initArticle = function(article, blurb, fade) {
  fade.out(blurb)

  article.addEventListener('mouseover', function() {
    fade.in(blurb)
  })

  article.addEventListener('mouseout', function() {
    fade.out(blurb)
  })
}

module.exports = {
  init: function(root, fade) {
    var document = root.document

    // get all articles
    var articles = document.querySelectorAll('.story-list-item')

    var article
    var bg
    var blurb
    for (var i = 0; i < articles.length; i++) {
      article = articles[i]
      blurb = article.querySelector('.story-blurb')

      // give them the proper backgrounds
      bg = article.getAttribute('data-bg')
      article.style['background-image'] = 'url(' + bg + ')'

      // initialize the fading behavior
      if (blurb) {
        initArticle(article, blurb, fade)
      }
    }
  }
}
