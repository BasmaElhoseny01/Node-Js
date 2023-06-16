## Pug Template


### Code Map
1. Geospatial Data
    - <a href="">GeoJson</a>
2. <a href="">Tour Modeling: Embedding</a>
    **We pass in the body of the request the IDs just use middleware to embed the guides data into the Tour Document**
    <a href="">Implement Pre save middle ware to embed the tours</a>
3. <a href="">Tour Modeling: Child referencing</a>
4. <a href="">Populating References</a>
5. Parent referencing the parent doesn't know its children so we need<a href="">virtual Population </a>
6. <a href="">Nested Routes</a>
7. <a href="">Factory Handlers</a>
8. <a href="">/me endpoint </a>
9. <a href="">Indexes</a>
10. <a href="">Static Methods to be called on Schema not on documents like instance methods , cal avg rating of tour</a>
11. <a href="">Prevent duplicates of reviews -> use indexing</a>
12. <a href="">Geographical</a>
### PostMan Hints
1. Globals Refer to postman
2. Environment Lect 133
3. Copying Token from response to headers of protected routes Lect 133
```
pm.environment.set("jwt", pm.response.json().token);
```


### NPM Packages
1. Encrypt Passwords
```
npm i bcryptjs
```
2. JWT
```
npm i jsonwebtoken
```
3. Node Mailer to send emails
```
npm in nodemailer
```
4. Rate limiting
```
npm i express-rate-limit
```
5. Helmet
```
npm i helmet
```
6. Mongo Sanitize to prevent NoSQL attack
```
npm i express-mongo-sanitize
```
7. xss-clean to prevent xss attack
```
npm xss-clean
```
8. http parameter pollution package
```
npm i hpp
```