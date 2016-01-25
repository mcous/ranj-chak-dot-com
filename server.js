// development server
'use strict'

var path = require('path')
var express = require('express')

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.listen(8080, function () {
  console.log('Development server running at http://localhost:8080')
})
