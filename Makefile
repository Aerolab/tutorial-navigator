ifndef PORT
  PORT=8989
endif

run: build

dev-run: node_modules
	@node_modules/.bin/supervisor \
		--quiet \
		--force-watch \
		-e js,css,html,json,jade \
		-i node_modules,components,build \
		-x make -q dev-build

build: packages
	@node node_modules/.bin/component-build

build_dev: packages
	@node node_modules/.bin/component-build --dev

dev-build: build_dev
	@node_modules/.bin/serve --port $(PORT)

packages: node_modules
	@node node_modules/.bin/component-install --dev

node_modules:
	@npm install --development

clean:
	rm -rf node_modules components build

.PHONY: build