'use strict';

import express from 'express';
import webpack from 'webpack';

import { ENV } from './config/appConfig';
import expressConfig from './config/express';
const path = require('path');
const fs = require('fs');

const app = express();

if (ENV === 'development') {
  const webpackDevConfig = require('../webpack/webpack.dev.babel');
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

/*
 * Bootstrap application settings
 */
expressConfig(app);

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', (req, res) => {
  fs.readFile(path.join('public', 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});


const server = app.listen(app.get('port'));
