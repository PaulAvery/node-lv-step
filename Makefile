BIN = ./node_modules/.bin

build: test

test: lint
	@$(BIN)/mocha --require must

lint:
	@$(BIN)/eslint lib test

release-major: test
	@$(BIN)/bump --major

release-minor: test
	@$(BIN)/bump --minor

release-patch: test
	@$(BIN)/bump --patch

publish:
	git push --tags origin HEAD:master
	npm publish
