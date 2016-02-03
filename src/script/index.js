// entry point for ranjchak dot com application
'use strict'

var anchorScroll = require('anchor-scroll')
var scrollTop = require('scrolltop')
var fade = require('fade')
var domready = require('domready')
var transitionEndEvent = require('transitionend-property')

var rafScroll = require('./raf-scroll')
var cssFade = require('./css-fade')
var nav = require('./nav')
var stories = require('./stories')
var videos = require('./videos')
var figure = require('./figure')

domready(function() {
  anchorScroll.init({
    updateUrl: true,
    offset: -100,
    ease: 'linear',
    duration: 300,
    selector: "a[href*='#']"
  })

  cssFade.init(transitionEndEvent)

  rafScroll.init(window, scrollTop)

  nav.init(window, rafScroll, cssFade)

  stories.init(window, cssFade)

  videos.init(window)

  figure.init(window)
})
