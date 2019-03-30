# Dragonchain Smart Contract Templates

* **Overview**
  - Design goals
  - Smart contract (SC)
  - Getting started

* **Design goals**

  - Flexibility → Developers can use any programming languages they would like as long as they can configure a dockerfile correctly.
  - Scalability → Developers can create up to 20 smart contract to start, and can request an increase if needed.
  - Light weight and faster deployment → SCs are built and deployed as a docker image on Dragonchain. 
  
* **Smart contract**

    Dragonchain SC uses docker to package SC neatly for deployment. 
SC anatomy:
  - Dockerfile: "The Dockerfile is essentially the build instructions to build the image. The advantage of a Dockerfile over just storing the binary image (or a snapshot/template in other virtualisation systems) is that the automatic builds will ensure you have the latest version available. This is a good thing from a security perspective, as you want to ensure you’re not installing any vulnerable software."
  
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
  
    **NodeJs SC entrypoint**
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
* **Getting started**

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

* **How to Contribute SDKs**

    Dragonchain is community-driven and welcomes anyone who wants to contribute to our growth and the blockchain space. Currently, Dragonchain supports two SDKs (Python and Node.js) internally, but we would like to provide many SDK options to reflect our system capabilities. If you have any questions or concerns, please join our community developer forum on Telegram (Community Dragonchain Dev Official).

* **Here are a couple of languages**

  - Rust 
  - Java 
  - C/C++ 
  - C# [x]
  - R 
  - Clojure 
  - Dart
  - Go [x]
  - Swift

[x] - means ready or being developed
* **Guidelines**
    
    For all your code contributions, you should sign your work with the open license below. 
Make sure that you sign it with your actual name, nicknames aren't allowed. 

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
1 Letterman Drive
Suite D4700
San Francisco, CA, 94129

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.


Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

### Supporting documentation
This link for [more information ](https://github.com/dragonchain-inc/guide-to-develop-on-dragonchain/wiki)

