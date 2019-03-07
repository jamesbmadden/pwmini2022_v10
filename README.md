# PW Mini 2022
App for Managing Homework 

[![](https://img.shields.io/github/languages/code-size/jamesbmadden/pwmini2022.svg?style=flat-square)](https://github.com/jamesbmadden/pwmini2022)
[![](https://img.shields.io/github/issues-raw/jamesbmadden/pwmini2022.svg?style=flat-square)](https://github.com/jamesbmadden/pwmini2022/issues)

## Install

```
git clone https://github.com/jamesbmadden/pwmini2022.git
cd pwmini2022
yarn install
```
Create an ```src/keys.js``` file with your firebase configuration object:
```javascript
// src/keys.js

export const fb = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "..."
}
```
In another directory, clone and build the [Graviton Components Package](https://github.com/jamesbmadden/graviton).
```
git clone https://github.com/jamesbmadden/graviton
cd graviton
yarn install
yarn build
```
Then link that package to the pwmini2022 directory.
```
// Inside the graviton directory
yarn link
```
```
// In the pwmini2022 directory
yarn link graviton
```

## Run
```
yarn start
```