# Poupon.me
## Setting up
- On Ubuntu (using apt): `make install`
- On other systems:
	- Install Node.js 8.x
	- Install Python 2.7 and Pip
	- `make post-install`

## Building
- To deploy: `make deploy`
- To build react app: `make build`
- To test locally: `make test`

## Setting up Docker

### Building the Docker Image
Run the following commands ONLY once:
In the root directory:

	docker build -t web_build .

This creates a docker image named web_build based on the Dockerfile

	docker run --name web_test -it web_build 

This creates a docker container named web_test for you from the web_build docker image you just build

### Using the Docker Container
After the initial run, you can stop the container by simply typing:
	exit
Afterwards, whenever you need to RERUN the container, simply run the following command:
	docker start -i web_test (or whatever else you decided to name the image)
