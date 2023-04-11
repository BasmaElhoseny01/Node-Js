## Mongo DB

1. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/54566422dfbd181d36451ff09901b86009604160/8.Error Handling/app.js#L45-L65">Unhandled Routes [Undefined]</a>
2. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/54566422dfbd181d36451ff09901b86009604160/8.Error Handling/app.js#L69">Global Error Handling MiddleWare</a>
3. Mongoose Errors to be marked as operational errors
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/54566422dfbd181d36451ff09901b86009604160/8.Error Handling/controllers/errorController.js#L62">Invalid Mongo ID</a>
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/54566422dfbd181d36451ff09901b86009604160/8.Error Handling/controllers/errorController.js#L64">Duplicate primary key</a>
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/54566422dfbd181d36451ff09901b86009604160/8.Error Handling/controllers/errorController.js#L66">Validation Error</a> ie. one of the validators aren't satisfied
4. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/54566422dfbd181d36451ff09901b86009604160/8.Error Handling/server.js#L41-L50">Unhandled Rejections</a> ie.rejected promises [Async code]
4. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/54566422dfbd181d36451ff09901b86009604160/8.Error Handling/server.js#L7-L13">Unhandled Exception</a> ex:syntax error [Sync code]

### Scripts
- run in production
```
"start:pro": "set NODE_ENV=production & nodemon server.js"
```
### NPM Packages
- ndb ➡ Node Debugger=
```
npm i ndn --global
```
📝Add debug script in package.json
```
"debug":"ndb server.js"
```