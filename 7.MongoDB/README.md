## Mongo DB

1. Creating Model and Schema  <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/models/tourModel.js">tourModel.js</a>
2. Creating Documents in <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L133-L165">createTour()</a>
3. Reading Documents
    - All Documents <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L8-L104">getAllTours()</a>
    - Documents By ID <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L113-L132">getTour()</a>
4. Updating Documents <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L166-L186">updateTour()</a>
5. Deleting Documents <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L188-L203">deleteTour()</a>

6. Importing Dev Data Script <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8bd705848abc9e9bdb56388a97293af9ff1fa93d/7.MongoDB/dev-data/data/import-dev-data.js">import-dev-data.js</a>
7. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L17-L29">Filtering</a>
8. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L31-L42">Advanced Filtering</a>
9. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L44-L60">Sorting</a>
10. Fields Limiting
    a. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L61-L70">here</a>
    b. (Exclude field from Schema so not to be shown) <a href="">here</a>
11. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L72-L78"> Pagination</a>
12. Aggregation
    a. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L264-L271">Matching</a>
    b. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L272-L278">Grouping</a>
    c. </a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L260-L263">Unwinding</a>
    d. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/controllers/tourController.js#L282-L287">projection</a>

13. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/models/tourModel.js#L91-L98">Virtual Properties</a>
14. Mongoose MiddleWares
    a. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/models/tourModel.js#L102-L108">Document MiddleWare </a>➡ Act on the currently processed document
    b. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/models/tourModel.js#L124-L144">Query MiddleWare</a>
    c. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/models/tourModel.js#L151-L165">Aggregation MiddleWare</a>

15. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/0fe8d6ac7f257a9ac5c6d7055f4c4365f52ec2b6/7.MongoDB/models/tourModel.js#L54-L60">Custom Validators</a>
### Notes 
Query String
{{baseURL}}/v1/tours<mark>?duration=5&difficulty=easy</mark>

### Useful Extensions

### NPM Packages
- Mongoose ➡ MongoDB Driver to make Node to access and interact with MongoDB
```
npm i mongoose@5
```
- Validator
```
npm i validator
```