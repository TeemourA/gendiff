install:
	npm install

lint:
	npx eslint .

link:
	sudo npm link

test:
	npm test

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run