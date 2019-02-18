# PW Mini 2022
App for Managing Homework 

![](https://img.shields.io/github/languages/code-size/jamesbmadden/pwmini2022.svg?style=flat-square)
![](https://img.shields.io/github/issues-raw/jamesbmadden/pwmini2022.svg?style=flat-square)

## Install

```
git clone https://github.com/jamesbmadden/pwmini2022.git
cd pwmini2022
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

## Run
```
yarn start
```