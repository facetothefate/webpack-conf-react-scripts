# react-scripts-webpack-config

This is a react-scripts wrapper, which will give you functionality to custmize react-scripts's webpack configuration

## How to use

Firstly follow create-react-app instruction to create your app.

Or directly go under your project root.

Then

```
npm install react-scripts-webpack-config --save-dev
```

Then Create 3 files under your project root

- webpack.config.common.js  // this contains config will be merged to both dev and prod config
- webpack.config.dev.js  // this contains config will only be merged to dev config
- webpack.config.prod.js // this contains config will only be merged to prod config

Follow webpack instruction to add the config you need.

For example you need a copy plguin copy something

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

react-scripts-webpack-config will try to merge your config to existing react-scripts ones.

It will concat all array config field, and override other type of fields. 

if you wish to use it with npm scripts, modify your package.json like:

```json
  "scripts": {
    "start": "react-scripts-webpack-config start",
    "build": "react-scripts-webpack-config build",
    "test": "react-scripts-webpack-config test --env=jsdom",
    "eject": "react-scripts-webpack-config eject"
  }
```

