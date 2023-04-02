# MiddleWare

1. Our Middle Wares <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/6.MiddleWares/app.js#L27-L32">here</a>
2. Refactoring Code to have
    a. routes
    b. controllers
    c. server
3. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/6.MiddleWares/routes/tourRoutes.js#L16-L18">Param MiddleWare</a> (MiddleWare when the route contains a specific parameter )
4. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/6.MiddleWares/routes/tourRoutes.js#L26">Chaining Multiple MiddleWares</a>
5. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/6.MiddleWares/app.js#L12-L15">Serve Static Files</a> use middleware express.static()

### Setting an env variable fro the scripts in package.json
```
"start:prod":"NODE_ENV=production nodemon server.js"
```

### Useful Extensions
- DotEnv ➡ prettier for .env
- ESLint
- Prettier

### NPM Packages
1. morgan ➡ Request Response Logger middle ware 
```
npm i morgan
```
2. dotenv ➡ to be able to access env variable
```
npm i dotenv
```
3. Eslint and Prettier as Dev Dependency
eslint-config-prettier ➡ Disable Eslint Prettier 😚
eslint-plugin-prettier ➡ Show errors while typing

```
npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-ally eslint-plugin-react --save-dev  
```
