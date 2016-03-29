// development server with livereload
'use strict'

const fs = require('fs')
const http = require('http')
const path = require('path')
const events = require('events')

const express = require('express')
const tinyLr = require('tiny-lr')
const connectLivereload = require('connect-livereload')
const debounce = require('lodash.debounce')
const glob = require('glob')
const moment = require('moment')
const morgan = require('morgan')

const outGlob = path.join(__dirname, 'public/*')
const outFiles = glob.sync(outGlob)

const log = (message) => {
  console.log(`[${moment().format('HH:mm:ss.SSS')}] ${message}`)
}

const handleChange = (event, filename) => {
  if (filename) {
    console.log(`[${moment().format('HH:mm:ss.SSS')}] ${filename} ${event}d`)
    tinyLr.changed(filename)
  }
}

outFiles.forEach((file) => {
  console.log('watching ' + file)
  fs.watch(file, debounce(handleChange, 500))
})

express()
  .use(morgan('dev'))
  .use(connectLivereload())
  .use(express.static(path.join(__dirname, 'public')))
  .listen(8080, '0.0.0.0', () => console.log('\nServer running at http://localhost:8080\n'))

tinyLr().listen(35729)
