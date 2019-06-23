'use strict'

const path = require('path')
const express = require('express')
const compression = require('compression')
const app = express()

const argv = process.argv.slice(2)
const directory = path.resolve(process.cwd(), argv[0])
const port = argv[1] || 9090

const handleUp = port => console.log(`Listening on http://localhost:${port}`)
const handleError = error => {
  console.error(error)
  process.exit(1)
}

app
  .use(express.static(directory))
  .use(compression())
  .listen(port)
  .once('listening', () => handleUp(port))
  .once('error', handleError)
