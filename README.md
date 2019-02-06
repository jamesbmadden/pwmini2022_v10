# PW Mini 2022
App for Managing Homework

## Install

```
git clone https://github.com/jamesbmadden/pwmini2022.git
cd pwmini2022
```
Create a ```src/keys.js``` file with your firebase configuration object:
```javascript
// src/keys.js

export const fb = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "..."
}
```

## Run
```
yarn start
```