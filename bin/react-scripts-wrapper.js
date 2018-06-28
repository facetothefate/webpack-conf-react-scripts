#!/usr/bin/env node

const Module = require('module');

const path = require('path');

const overrideConfig = require(path.resolve('./webpack.config.common.js'));

const overrideDevConfig = require(path.resolve('./webpack.config.dev.js'));

const overrideProdConfig = require(path.resolve('./webpack.config.prod.js'));

const {require: oldRequire} = Module.prototype;

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'eject' || x === 'start' || x === 'test'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

const entryIndex = args.findIndex(
    x => x === '--entry' || x === '-e'
);

let entryPoint = null;

if (entryIndex !== -1 && entryIndex + 1 < args.length) {
    entryPoint = args[entryIndex + 1];
}

function mergeConfig(origin, override) {
    return mergeObject(origin, override);
}

function mergeObject(origin, override) {
    for (key in override) {
        if (key in origin) {
            if (Array.isArray(origin[key])) {
                origin[key] = mergeArray(origin[key], override[key]);
            } else if (origin[key] && typeof origin[key] === 'object') {
                origin[key] = mergeObject(origin[key], override[key]);
            } else {
                origin[key] = override[key];
            }
        } else {
            origin[key] =  override[key];
        }
    }
    return origin;
}

function mergeArray(origin, override) {
    return origin.concat(override);
}

/*
* Let's hijack the require here,
* So that before the react-scripts actually import its webpack config, 
* we can change its content
*/

Module.prototype.require = function hijackedRequire(file) {
    if (file.indexOf('./paths') !== -1) {
        console.log(file);
        const paths = oldRequire.apply(this, arguments);
        if ('appIndexJs' in paths) {
            console.log(paths.appIndexJs);
            if (entryPoint) {
                paths.appIndexJs = path.resolve(`${__dirname}`, entryPoint);
            }
        }
        return paths;
    }
    if (file.indexOf('webpack.config') !== -1) {
        let config = oldRequire.apply(this, arguments);
        mergeConfig(config, overrideConfig);
        if (file.indexOf('webpack.config.dev') !== -1) {
            mergeConfig(config, overrideDevConfig);
        } else if (file.indexOf('webpack.config.prod') !== -1) {
            mergeConfig(config, overrideProdConfig);
        }
        return config;
    }
    return oldRequire.apply(this, arguments);
};


/*
* Start the react scripts normally
*/
switch (script) {
  case 'build':
  case 'eject':
  case 'start':
  case 'test': {
    require('react-scripts/scripts/' + script);
    break;
  }
  default:
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update react-scripts?');
    console.log(
      'See: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases'
    );
     break;
}
