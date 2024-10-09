# Vue3 - Tetris

### Demo
https://navelorange1999.github.io/vue3-tetris/

### Script
```
# Init
yarn

# Dev preivew
yarn dev

# build
yarn build

# lint
yarn lint
```

### Summary

##### Baiscal Classes
1. BlockClass: Generate Block and controll block
2. GameClass Render view, limit blocks，record games-info
3. EventClass: Disptach event to GameClass

##### Vue Components
1. Cell
2. Menu
3. Scene

##### How to connect class with vue-component
Use vue3's reactive API，create reactive game-obj，vue-component will watch when game-obj updated 



