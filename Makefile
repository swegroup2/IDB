all: docker-run

.PHONY: clean
clean:
	-rm -rf poupon-web/build
	-rm -rf poupon-web/node_modules

.PHONY: clean-docker
clean-docker:
	-rm .docker_built
	-docker rm web_test

.docker_built:
	cp docker/Dockerfile Dockerfile
	docker build -t web_build .
	docker create --name web_test -it web_build
	touch .docker_built
	rm Dockerfile

.PHONY: docker-run
docker-run: .docker_built
	clear
	docker start -i web_test

.PHONY: deploy
deploy: react-build
	gcloud app deploy --no-promote --version candidate

.PHONY: react-test
react-test:
	cd poupon-web; npm start

.PHONY: react-build
react-build: clean react-install
	cd poupon-web; npm run build

.PHONY: react-install
react-install:
	cd poupon-web; npm install

.PHONY: flask-test
flask-test:
	python "test-flask.py"