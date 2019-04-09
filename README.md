# Dragonchain Smart Contract Templates

## Node.js Smart Contract Example

    Dragonchain uses docker to package Smart Contract for deployment. 
  - Dockerfile
    Node SC  dockerfile
    ```dockerfile
    FROM node:8-alpine

    WORKDIR /home/app

    # Get and install dependencies
    COPY package.json .
    RUN NPM_CONFIG_LOGLEVEL=warn npm install --production

    # Copy the actual code
    COPY . .
    RUN chown 1000:1000 -R /home/app

    USER 1000:1000

    ```
  - Entrypoint
  
    Node.js Smart Contract entrypoint
    ```js
    'use strict'
    const getStdin = require('get-stdin');
    const handler = require('./contract/handler');

    getStdin().then(val => {
        handler(val, (err, res) => {
            if (err) {
                return console.error(err);
            }
            if (res) {
                process.stdout.write(JSON.stringify(res));
            }
        });
    }).catch(e => {
        console.error(e.stack);
    });
    ``` 
### Contribute SDK

Currently, Dragonchain supports two SDKs ([Python](https://github.com/dragonchain-inc/dragonchain-sdk-python) and [Node.js](https://github.com/dragonchain-inc/dragonchain-sdk-node)) internally, but we would like to have many SDK options to reflect our system capabilities. If you have any questions or concerns, please join our community developer forum on Telegram (Community Dragonchain Dev Official).
