# Dragonchain Smart Contract Templates

Dragonchain smart contracts use docker containers and stdin/stdout for input/output.

In order to help get started, some templates are provided in various languages to demo setting up the input/output/logging aspects of a smart contract, as well as its associated Dockerfile for building.

## Making A Smart Contract

In order to run a smart contract on Dragonchain, it must be packaged in a Docker container for the linux platform with x86-64 architecture. This means that a Dockerfile shoud be used to assist in building the container with the code.

Please note that Dragonchain smart contracts will always run as user 1000:1000, so it can be useful to add this to the end of your Dockerfile for testing purposes. (See any of the templates in this repository for any example).

### Handling Input/Output/Logging

Dragonchain smart contracts use stdin for input, stdout for output, and stderr for logging purposes.

The templates provided in various languages here demo setting up a contract to be able to handle this.

## Getting started

Clone the repository locally to copy any of the template contracts

```sh
git clone https://github.com/dragonchain-inc/smart-contract-templates
```

Then simply use and modify a contract for any language you wish.

## Testing Your Contract

In order to test your contract, first build it into a tagged docker container that you can run (with a command line `docker build . -t testing`).

Now simply pass stdin into this container to run it, also remembering to pass in your contract start command. For example:

```sh
# Node contract
echo "some input" | docker run -i testing node index.js
# Go contract
echo "some input" | docker run -i testing ./main
# Python contract
echo "some input" | docker run -i testing python index.py
# Bash contract
echo "some input" | docker run -i testing bash contract.bash
```

## Contributing

We are happy to take pull requests to add new language templates, or modify existing ones if necessary.
