import { createElement } from 'preact'
import { render } from 'preact-render-to-string'

import { App } from './App'
import { lang, title, meta } from './template-options.json'

export default function prerender(): string {
  return `<!doctype html>${render(
    <html lang={lang}>
      <head>
        <meta charset={meta.charset} />
        <meta name="viewport" content={meta.viewport} />
        <meta name="description" content={meta.description} />
        <meta name="author" content={meta.author} />
        <title>{title}</title>
      </head>
      <body>
        <App />
      </body>
    </html>
  )}`
}
