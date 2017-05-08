'use strict';

const path = require('path');

module.exports = {
  // Resolve Absolute Path of mock files
  appRoot: path.resolve(__dirname, './'),
  mockDir: 'mock',

  // Root Directory of Debug HTTP Server.
  serveRoot: path.resolve(__dirname, '../public')
};