'use strict'

const assert = require('assert')
const path = require('path')
const sharp = require('sharp')

const USAGE = 'node scripts/create-thumbnails <source_file>'
const [sourceInput] = process.argv.slice(2)

assert(sourceInput, USAGE)

const HI_RES_WIDTH = 1280
const HI_RES_QUALITY = 80
const LO_RES_WIDTH = 256
const LO_RES_QUALITY = 50

const source = path.resolve(process.cwd(), sourceInput)
const sourceDir = path.dirname(source)
const sourceName = path.basename(source, path.extname(source))

const input = sharp(source)

// stats
input
  .clone()
  .stats()
  .then(stats =>
    console.log(
      `#${stats.channels.map(c => Math.round(c.mean).toString(16)).join('')}`
    )
  )
  .catch(error => console.error(error))

// high-res thumbnail
input
  .clone()
  .resize({ width: HI_RES_WIDTH })
  .jpeg({ quality: HI_RES_QUALITY })
  .toFile(path.join(sourceDir, `${sourceName}.thumb.jpg`))
  .then(info => console.log(info))
  .catch(error => console.error(error))

// low-res thumbnail
input
  .clone()
  .resize({ width: LO_RES_WIDTH })
  .jpeg({ quality: LO_RES_QUALITY })
  .toFile(path.join(sourceDir, `${sourceName}.lores.jpg`))
  .then(info => console.log(info))
  .catch(error => console.error(error))
