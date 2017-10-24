all: docker-run

.PHONY: clean
clean:
	-rm .docker_built
	-docker rm web_test
	-rm -rf poupon-web/build

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
react-build:
	cd poupon-web; npm run build

.PHONY: flask-test
flask-test:
	python "test-flask.py"