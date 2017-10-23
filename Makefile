all: test

.PHONY: deploy
deploy: build deploy-candidate deploy-production

.PHONY: deploy-candidate
deploy-candidate:
	gcloud app deploy --no-promote --version candidate
	gcloud app versions migrate candidate
	gcloud app versions delete production

.PHONY: deploy-production
deploy-production:
	gcloud app deploy --no-promote --version production
	gcloud app versions migrate production
	gcloud app versions delete candidate

.PHONY: test
test:
	cd poupon-web; npm start

.PHONY: build
build:
	cd poupon-web; npm run build

.PHONY: install
install: install-node post-install

.PHONY: post-install
post-install:
	sudo pip install -t lib -r requirements.txt
	cd poupon-web; npm install

.PHONY: install-node
install-node:
	sudo apt-get update
	sudo apt-get install -y build-essential
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	sudo apt-get install -y nodejs
	sudo apt-get install python
	sudo apt-get install python-pip