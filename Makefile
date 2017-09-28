all: web

.PHONY: deploy
deploy:
	gcloud app deploy --version vx 

.PHONY: test
test:
	cd poupon-web; npm start

.PHONY: web
web:
	cd poupon-web; npm run build

.PHONY: install
install: install-node
	sudo pip install -r requirements.txt
	cd poupon-web; npm install

.PHONY: install-node
install-node:
	sudo apt-get install -y build-essential
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	sudo apt-get install -y nodejs
