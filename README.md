# generate-d-ts

Generate d.ts by TypeScript api.

## Installation

```sh
npm i generate-d-ts
```

## Usage

```js
const { createDeclarations, writeDeclarations } = require('generate-d-ts') // or import

/**
 * @param filesPath string[]
 * @param outDir string
 */
const declarations = createDeclarations(['src/index.ts', 'src/component.ts'], 'lib')

// write files
writeDeclarations(declarations)
```
