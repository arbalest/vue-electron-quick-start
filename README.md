# electron-vue-starter

## About

This project takes the Electron Quick Start project and the default Vue CLI project, and layers
a launcher script on top that will launch the Vue development server, then launch Electron
and point the Electron window to the Vue dev server, so both can be run together from the
same terminal using a single command.

## Getting Started

This project can be used either by cloning it and using it as a starting point for a project,
or by copying the `dev` and `electron-start` entries from the `package.json` scripts section, and copying the `./electron` folder into your own existing project.

## Additional Notes

When using a project based on vue-cli with Electron, in order to load Electron NodeJS modules using Electron's require,
rather than Webpack's loader, we should use `window.require`, e.g.

`const fs = window.require('fs');`

## Run for Development

To run the project for development:
```
npm run dev
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
