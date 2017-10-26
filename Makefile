all: docker-run

.PHONY: clean
clean:
	-rm -rf poupon-web/build

.PHONY: clean-docker
clean-docker:
	-rm .docker_built
	-docker rm web_test

.docker_built:
	cp docker/Dockerfile Dockerfile
	docker build -t web_build .
	touch .docker_built
	rm Dockerfile

.PHONY: docker-run
docker-run: .docker_built
	@-docker rm web_test
	clear
	docker run -p 5000:5000 --mount type=bind,src="/$(shell pwd)",dst=/app --name web_test -it web_build
	@-docker rm web_test

.PHONY: deploy
deploy: flask-test react-build deploy-gcloud

.PHONY: deploy-gcloud
deploy-gcloud:
	gcloud app deploy --version candidate

.PHONY: gcloud-setup
gcloud-setup:
	gcloud init
	gcloud config set project poupon-181003

.PHONY: react-serve
react-serve: 
	cd poupon-web; npm start

.PHONY: react-build
react-build: 
	@echo "!!! Make sure to run make react-install from your HOST (not docker) first !!!"
	cd poupon-web; npm run build

.PHONY: react-install
react-install: clean
	-rm -rf poupon-web/node_modules
	cd poupon-web; npm install

.PHONY: flask-test
flask-test:
	python "test-main.py"
