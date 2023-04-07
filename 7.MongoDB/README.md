## Mongo DB

1. Creating Model and Schema  <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/7.MongoDB/models/tourModel.js">tourModel.js</a>
2. Creating Documents in <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/7.MongoDB/controllers/tourController.js#L47-L78">createTour()</a>
3. Reading Documents
    - All Documents <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/7.MongoDB/controllers/tourController.js#L6-L25">getAllTours()</a>
    - Documents By ID <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/7.MongoDB/controllers/tourController.js#L27-L46">getTour()</a>
4. Updating Documents <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/7.MongoDB/controllers/tourController.js#L80-L100">updateTour()</a>
5. Deleting Documents <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/8975ab8e5d8feb4a8a30e7b1b4abdcb410e2f476/7.MongoDB/controllers/tourController.js#L102-L117">deleteTour()</a>

6. Importing Dev Data Script <a href="">import-dev-data.js</a>
7. Filtering
8. Advanced Filtering
9. Sorting
10. Fields Limiting
    a. <a href="">here</a>
    b. (Exclude field from Schema so not to be shown) <a href="">here</a>

### Notes 
Query String
{{baseURL}}/v1/tours<mark>?duration=5&difficulty=easy</mark>

### Useful Extensions

### NPM Packages
- Mongoose ➡ MongoDB Driver to make Node to access and interact with MongoDB
```
npm i mongoose@5
```