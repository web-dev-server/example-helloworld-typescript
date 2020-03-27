# Example - Hello World - TypeScript

[![Latest Stable Version](https://img.shields.io/badge/Stable-v2.0.0-brightgreen.svg?style=plastic)](https://github.com/web-dev-server/example-helloworld/releases)
[![Min. TypeScript Version](https://img.shields.io/badge/TypeScript-v3.7-brightgreen.svg?style=plastic)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)
[![License](https://img.shields.io/badge/Licence-BSD-brightgreen.svg?style=plastic)](https://github.com/web-dev-server/example-helloworld/blob/master/LICENCE.md)

Hallo world example with static and dynamic content in TypeScript.

## Instalation
```shell
git clone https://github.com/web-dev-server/example-helloworld-typescript.git example-helloworld-typescript
cd ./example-helloworld-typescript
npm update
npm update --save-dev
tsc
```

## Usage
```shell
node build/run-server.js
```
- open your web browser and enjoy browsing on:
	- http://127.0.0.1:8000/
	- http://127.0.0.1:8000/static-content/
	- http://127.0.0.1:8000/build/dynamic-content-javascript/
	- http://127.0.0.1:8000/build/dynamic-content-javascript/?something=in&query=string
	- http://127.0.0.1:8000/build/dynamic-content-javascript/anything-else
	- http://127.0.0.1:8000/build/dynamic-content-typescript/
	- http://127.0.0.1:8000/build/dynamic-content-typescript/?something=in&query=string
	- http://127.0.0.1:8000/build/dynamic-content-typescript/anything-else
