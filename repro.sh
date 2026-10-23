#!/usr/bin/env sh

for v in 1.62.1 1.63.0; do
	echo "Running tests with Playwright v$v"
	docker run --rm --init --ipc=host \
		-v "$PWD/index.mjs:/work/index.mjs:ro" -w /work \
		mcr.microsoft.com/playwright:v$v-noble \
		sh -c "npm init -y >/dev/null && npm i --silent playwright@$v && node index.mjs"
	echo
done
