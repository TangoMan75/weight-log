.PHONY: install dev build preview clean serve icons audit deploy help

# Default target
help:
	@echo "Weight Tracker PWA — available make targets:"
	@echo "  install   Install dependencies (npm install)"
	@echo "  dev       Start Vite dev server"
	@echo "  build     Production build to dist/"
	@echo "  preview   Preview the production build locally"
	@echo "  serve     Alias for preview"
	@echo "  audit     Show npm audit (dependency vulnerabilities)"
	@echo "  deploy    Build and publish dist/ to GitHub Pages (gh-pages branch)"
	@echo "  clean     Remove node_modules and dist/"
	@echo "  help      Show this help"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview serve:
	npm run preview

audit:
	npm audit

# Publish to GitHub Pages: build, drop a .nojekyll, push dist/ to gh-pages.
# Requires the `gh-pages` CLI (fetched on demand via npx). The repo must have
# its GitHub Pages source set to the "gh-pages" branch (root).
deploy: build
	echo node_modules > dist/.gitignore
	touch dist/.nojekyll
	npx --yes gh-pages --dist dist --dotfiles

clean:
	rm -rf node_modules dist
