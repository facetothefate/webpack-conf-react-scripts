# webpack-conf-react-scripts

This is a react-scripts wrapper, which will give you functionality to custmize react-scripts's webpack configuration

## How to use

### Webpack config file

Firstly follow <a href="https://github.com/facebook/create-react-app">create-react-app</a> instruction to create your app.

Or directly cd to your create-react-app created project root.

Then

```
npm install webpack-conf-react-scripts --save-dev
```

Then create 3 files under your project root

- webpack.config.common.js  // this contains config will be merged to both dev and prod config
- webpack.config.dev.js  // this contains config will only be merged to dev config
- webpack.config.prod.js // this contains config will only be merged to prod config

Follow <a href = "https://webpack.js.org/configuration/">webpack</a> instruction to add the config you need.

For example, you need add a copy plguin to react-scripts webpack config

```js

/*
* webpack.config.common.js
*/
const CopywebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
    plugins:[
        new CopywebpackPlugin([ 
            { 
                from: path.resolve(__dirname, "./build/"), 
                to: 'testcopy' 
            } ]),
    ]
};

```

webpack-conf-react-scripts will try to merge your config to existing react-scripts ones.

It will concat all array config field, and override other type of fields. 

if you wish to use it with npm scripts, modify your package.json like:

```json
  "scripts": {
    "start": "webpack-conf-react-scripts start",
    "build": "webpack-conf-react-scripts build",
    "test": "webpack-conf-react-scripts test --env=jsdom",
    "eject": "webpack-conf-react-scripts eject"
  }
```

### Arguments 

#### --entry -e

Use this argument to provide another entry point file in your src folder, this will override the default setting "src/index.js"
