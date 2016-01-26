# ranjchak dot com

Personal website for Ranjani Chakraborty at http://ranjchak.com.

## development

ranjchak dot com is a static page hosted on GitHub pages. It uses [nodejs](http://nodejs.org) as its build runtime and [npm](http://npmjs.org) as its package manager. Make sure you have Node installed, and then:

1. `$ git clone https://github.com/mcous/ranjchak-dot-com.git`
2. `$ npm install`
3. `make && npm start`

A dev server will now be running at http://localhost:8080 to show you what the page will look like.

### building

A Makefile controls the build process and provides incremental builds. This site uses Jade for templating, Browserify for JavaScript bundling, and PostCSS for CSS help. Useful targets are:

* `$ make all` - Default target. Builds html, js, and css
* `$ make clean` - Deletes built files

### deploying

To deploy the site, cut a new release with the [npm version command](https://docs.npmjs.com/cli/version). The automatic `postversion` script will take care of building and pushing to GitHub pages. For example:

* `$ npm version patch` if you fixed a minor issue, like a typo
* `$ npm version minor` if you did something small, like added a video
* `$ npm version major` if you did something big, like change the structure

## structure

The logic, styling, and content of the page all live in separate places:

* logic - `src/script`
* styling - `src/style`
* content - `src/template`

Additionally, images live in `public/img`.

### templates

All templates live in the `src/template` directory.

The page is comprised mainly of `index.jade` and several sections, each described in the `sections.jade`. Most data for the templates is pulled at build time from `template.json`.

To editing, adding, or removing content from the site can probably be accomplished by editing `template.json`.
