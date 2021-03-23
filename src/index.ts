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
  return path.join('scripts', ...name);
  // return path.resolve(config.publicPath, 'scripts', ...name);
}

function getStylesheet(...name: string[]) {
  return path.join('styles', ...name);
  // return path.resolve(config.publicPath, 'styles', ...name);
}

function getAsset(...name: string[]) {
  return path.join('assets', ...name);
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
            global: { getTemplatePath, getScript, getStylesheet, getAsset },
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
  .on('add', (_path) => {
    // message(`${path} added`);
  })
  .on('change', (path) => {
    message(`${path} changed`);
    // build only changed paths
    buildPages(pages.filter((p, index) => p.templatePath === path));
  });

const isProd = process.env.NODE_ENV === 'production';

(async function () {
  const bundler = new Bundler(path.join(config.publicPath, '*.html'), {
    outDir: config.distPath,
    watch: !isProd,
    cache: true,
    cacheDir: '.cache',
    detailedReport: isProd,
    hmr: !isProd,
    minify: true,
    sourceMaps: !isProd,
    scopeHoist: true,
  });
  if (!isProd) {
    await bundler.serve();
  } else {
    await bundler.bundle();
  }
})();
