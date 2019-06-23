'use strict'

const assert = require('assert')
const path = require('path')
const sharp = require('sharp')

const USAGE = 'node scripts/convert-image <source_file> <format> <quality>'
const [sourceInput, format, quality] = process.argv.slice(2)

assert(sourceInput && format && quality, USAGE)

const source = path.resolve(process.cwd(), sourceInput)
const sourceDir = path.dirname(source)
const sourceName = path.basename(source, path.extname(source))
const outExt = format === 'jpg' || format === 'jpeg' ? 'jpg' : 'png'
const processMethod = outExt === 'jpg' ? 'jpeg' : 'png'

sharp(source)
  [processMethod]({ quality: Number(quality), progressive: true })
  .toFile(path.join(sourceDir, `${sourceName}.${outExt}`))
  .then(info => console.log(info))
  .catch(error => console.error(error))
