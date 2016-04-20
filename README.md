# ranj chak dot com

Personal website for Ranjani Chakraborty at http://ranjchak.com.

## development

ranjchak.com is a static page hosted on GitHub pages. It uses [nodejs](http://nodejs.org) as its build runtime and [npm](http://npmjs.org) as its package manager. Make sure you have Node >= v4 installed, and then:

1. `$ git clone https://github.com/mcous/ranj-chak-dot-com.git`
2. `$ npm install`
3. `$ make && npm start`

A dev server will now be running at [0.0.0.0:8080](http://localhost:8080) to show you what the page will look like.

### building

A Makefile controls the build process and provides incremental builds. This site uses Jade for templating, Browserify for JavaScript bundling, PostCSS for CSS help, and imagemin for image minification. Useful targets are:

* `$ make all` - Default target. Builds html, js, and css, and minifies images
* `$ make clean` - Deletes built files
* `$ make watch` - Watches files and builds as necessary on changes

### developing

There are several important development scripts:

* `$ npm start` - Start the dev server at [0.0.0.0:8080](http://localhost:8080)
* `$ npm run lint` - Lints the JavaScript and CSS

The development server is [Express](http://expressjs.com/)-based and lives in `server.js`. It incorporates LiveReload, so it will reload the page automatically (no plugin needed) when source files change.

### deploying

To deploy the site, cut a new release with the [npm version command](https://docs.npmjs.com/cli/version). The automatic `postversion` script will take care of building and pushing to GitHub pages. To deploy, you must have write access to the `ranj-chak-dot-com` repository. For example:

* `$ npm version patch -m 'Upgrade to %s for ____'` if you fixed a minor issue, like a typo
* `$ npm version minor -m 'Upgrade to %s for ____'` if you did something small, like added a video
* `$ npm version major -m 'Upgrade to %s for ____'` if you did something big, like change the structure

## source

The logic, styling, structure, images, and content of the page all live in separate places:

* logic - `src/script`
* styling - `src/style`
* template - `src/template`
* content - `src/content.json`
* images - `src/img`

The build steps output to `public`.

### logic

There are several JavaScript modules that handle things like modals and animations. They live in `src/script` and are combined into a single `bundle.js` file at build time. The build is handled by [Browserify](http://browserify.org/).

### styling

Style files are broken up into individual components to line up (mostly) with the template files. They live in `src/style` and are combined into a single `bundle.css` at build time. The build is handled by [PostCSS](http://postcss.org/) with several plugins (configuration in `.postcssrc`):

#### postcss import plugin

This plugin is included to [inline the files from CSS imports](https://github.com/postcss/postcss-import) to build a single CSS bundle.

#### postcss cssnext plugin

This plugin is included to allow the use of [future CSS syntax and features](http://cssnext.io/).

#### lost plugin

This plugin is included to allow the use of the [lost fractional grid system](https://github.com/peterramsing/lost).

### templates and content

All templates live in the `src/template` directory. Content for the templates is pulled at build time from `src/content.json`. The templates are combined and output to a single `index.html`. The templates are written in [Jade](http://jade-lang.com/).

Most editing, adding, or removing content from the site can be accomplished by editing `src/content.json`.

### images

Images live in `src/img`. Before the images are deployed or served, they are minified by [imagemin](https://github.com/imagemin/imagemin).
