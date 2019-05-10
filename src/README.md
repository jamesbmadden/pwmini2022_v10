# Source Code

## index.js
### Imports
<img src="https://raw.githubusercontent.com/jamesbmadden/pwmini2022/master/README_Materials/src/index/imports.png">

#### Custom Elements ES5 Adapter
Classes are transpiled to ES5 by Babel, so the ES5 Adapter is required for the code to continue to work. In current versions, as this file is not transpiled, it breaks the main script in older browsers. This will be changed in the future.

#### lit-element
Lit Element is the Library used for the components in PW Mini 2022. Therefore, it is required for the AppState and SigninPage Components in this file.

#### @graviton/button & @graviton/input
Both Graviton Components are included on the signin page, so they must be included in the initial bundle.

#### ./keys
Keys contains the Firebase keys. It is not included in the GitHub Repo for security reasons.



## ./Components
Components contains folders containing two files. Each folder contains the resources for one component. the folder is what the component is, for example `./components/calendar`. Inside each folder is a `<Component Name>.js` with the code and a `<Component Name>.less` with the styles.