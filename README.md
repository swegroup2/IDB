# Poupon.me
## Setting up
1. Install Docker
2. Run `make`
3. A Docker container will be created and started. If you've already built the container once, it will be restarted. To force a rebuild, run `make clean-docker` first. 
4. Now you can issue the commands under "Building"

## Building
- To deploy: `make deploy`.
- To build react app: `make react-build`
- To test react locally: `make react-test`
- To test Flask locally: `make flask-test`

## Setting up Docker Manually

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
