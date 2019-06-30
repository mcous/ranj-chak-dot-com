# ranj chak dot com

Personal website for Ranjani Chakraborty at https://ranjchak.com.

## development

ranjchak.com is a static page hosted on GitHub pages. It uses [nodejs](http://nodejs.org) as its build runtime and [npm](http://npmjs.org) as its package manager. Make sure you have Node >= v8 installed, and then:

1. `git clone https://github.com/mcous/ranj-chak-dot-com.git`
2. `npm install`
3. `npm start`

A dev server will now be running at <http://localhost:8080> to show you what the page will look like.

### building

To build for production, the following scripts are used

- `npm run build` - Builds production HTML, JS, and CSS
- `npm run serve` - Runs a server at <http://localhost:9090> with the production assets

### developing

There are several important development scripts:

- `npm start` - Start the dev server at <http://localhost:8080>
- `npm run format` - Autoformats JavaScript, TypeScript, YAML, and Markdown
- `npm run lint` - Lints TypeScript and CSS
- `npm run check` - Type checks TypeScript

### deploying

To deploy the site, run

- `npm release`

The version will be bumped, a change log will be generated, and the `dist` folder will be built and deployed to the `gh-pages` branch.
