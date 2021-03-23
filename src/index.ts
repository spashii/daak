import * as path from 'path';
import * as ejs from 'ejs';
import * as fs from 'fs';

export const config = {
  publicPath: path.resolve(__dirname, '..', '..', 'public'),
  distPath: path.resolve(__dirname, '..', '..', 'dist'),
  templatePath: path.resolve(__dirname, '..', '..', 'templates'),
};

export function getTemplatePath(...name: string[]) {
  return path.resolve(config.templatePath, ...name);
}

export function getHtmlPath(...name: string[]) {
  return path.resolve(config.publicPath, ...name);
}

function getScript(...name: string[]) {
  return path.resolve('public', 'scripts', ...name);
  // return path.resolve(config.publicPath, 'scripts', ...name);
}

function getStylesheet(...name: string[]) {
  // return path.resolve('public', 'styles', ...name);
  // return path.resolve(config.publicPath, 'styles', ...name);
}

import pages, { IPage } from '../pages';
import * as Bundler from 'parcel-bundler';
import * as watcher from 'chokidar';
import { message } from './util';

function buildPages(pages: IPage[]) {
  pages.forEach(async (page) => {
    // compare hash of data and template
    if (true) {
      ejs
        .renderFile(
          page.templatePath,
          {
            global: { getTemplatePath, getScript, getStylesheet },
            ...page.getData(),
          },
          { async: true }
        )
        .then((html) => {
          fs.writeFile(
            page.htmlPath,
            html,
            (err) => err && console.error(err.message)
          );
          message(`${page.htmlPath} built`);
        })
        .catch((err) => console.error(err));
    }
  });
}

// build once
buildPages(pages);

watcher
  .watch(config.templatePath)
  .on('add', (path) => {
    message(`${path} added`);
  })
  .on('change', (path) => {
    message(`${path} changed`);
    // buildPages(pages((p) => p.templatePath === path));
    buildPages(pages);
  });

const entryFiles = getHtmlPath('index.html');
const options = {
  outDir: config.distPath, // The out directory to put the build files in, defaults to dist
  publicUrl: '/', // The url to serve on, defaults to '/'
  watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: true, // Enabled or disables caching, defaults to true
  cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
  contentHash: true, // Disable content hash from being included on the filename
  minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
  scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  target: 'browser', // Browser/node/electron, defaults to browser
  logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors, 0 = log nothing
  hmr: true, // Enable or disable HMR while watching
  hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
  hmrHostname: '', // A hostname for hot module reload, default to ''
  detailedReport: true, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  autoInstall: true, // Enable or disable auto install of missing dependencies found during bundling
};

(async function () {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, options);

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  const bundle = await bundler.bundle();
})();
