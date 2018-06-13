# webpack-conf-react-scripts

This is a react-scripts wrapper, which will give you functionality to custmize react-scripts's webpack configuration

## How to use

Firstly follow create-react-app instruction to create your app.

Or directly go under your project root.

Then

```
npm install webpack-conf-react-scripts --save-dev
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

