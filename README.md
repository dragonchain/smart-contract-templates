# Dragonchain Smart Contract Templates

* **Overview**
  - Design goals
  - Smart Contract (SC)
  - Getting Started

* **Design Goals**
  - Scalability and Flexibility - OpenFaaS provides a high degree environment customization while running it on kubernetes which gives Dragonchain the capability for hybrid, on-prem and multi-cloud deployment. Also, developers can use any programming languages they would like as long as they can configure a dockerfile correctly.
  - Light weight and faster deployment - SCs are built and deployed as a docker image on Dragonchain. 
* **Smart Contract**
Dragonchain SC uses docker to package SC neatly for deployment. 
SC anatomy:
  - Dockerfile: "The Dockerfile is essentially the build instructions to build the image. The advantage of a Dockerfile over just storing the binary image (or a snapshot / template in other virtualisation systems) is that the automatic builds will ensure you have the latest version available. This is a good thing from a security perspective, as you want to ensure you’re not installing any vulnerable software."
    **Node SC  dockerfile**
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
  - Entrypoint: Dragonchain SC uses stdin to receive a payload and then uses stdout to print the payload result to Dragonchain heap. A Heap is a flexible key and value pair storage that can be structured to meet business needs.
    **NodeJs SC Entrypoint**
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
* **Getting Started**
To get started deploying SC on Dragonchain, you might need to have some knowledge of "containers" and ["function as a service"](https://www.contino.io/insights/what-is-openfaas-and-why-is-it-an-alternative-to-aws-lambda-an-interview-with-creator-alex-ellis): [Docker](https://docs.docker.com/engine/reference/builder/#run) and [OpenFaaS](https://docs.openfaas.com/). If you are not familiar with these software stacks, it is highly recommend getting familiar with them.
Here are steps to deploy a SC:
  - Create a Dragonchain console account
  - Create a Docker hub account
  - Create a Dragonchain [Level 1 Node](https://github.com/dragonchain-inc/guide-to-develop-on-dragonchain/wiki/Create-Level-1-Node) for SC deployment 
  - [Install Docker on your machine](https://www.docker.com/products/docker-desktop) if you are new to dockers
  - [Install OpenFaaS on your machine](https://docs.openfaas.com/cli/install/) if you are new to openfaas (optional)
  - Login into docker on terminal ``` → docker login```
  - Creating a local directory
  - Clone the templates: ``` → git clone https://github.com/dragonchain-inc/sc-templates ```
  - Change Directory: ```→ cd sc-templates ```
  - Pick a SC template: ``` → cd node_contract``` 
  - Build SC: ```→ docker build -t <docker_username>/<contract_name> .```
  - Push SC to docker hub ```→ docker push  <docker_username>/<contract_name> ```
  - [Deploy with SDKs](https://github.com/dragonchain-inc/guide-to-develop-on-dragonchain/wiki/Software-Development-Kit-(SDKs))


## Supporting Documentation
This link for [more infromation ](https://github.com/dragonchain-inc/guide-to-develop-on-dragonchain/wiki)

