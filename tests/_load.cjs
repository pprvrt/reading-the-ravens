// Shared loader for the Node validators: returns the engine, scenes and plates source as one string,
// to be eval'd together with the test body (the source files are plain browser scripts, not modules).
const fs = require('fs');
const path = require('path');

global.window = { matchMedia: () => ({ matches: false }) };
global.matchMedia = window.matchMedia;
global.document = {};

const SRC = path.join(__dirname, '..', 'src', 'js');
const SOURCE = ['engine.js', 'scenes.js', 'plates.js']
  .map((f) => fs.readFileSync(path.join(SRC, f), 'utf8'))
  .join('\n')
  .replace(/^let PLATE_ID/m, 'var PLATE_ID');

module.exports = { SOURCE };
