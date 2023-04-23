## Authentication

### Code Map
1. JWT TOkens
    - <a href="">logIn()</a>
    - <a href="">signUp()</a>
2. <a href="">Instance Method</a>
3. Authentication: Logged in  ie. Authentication verifies the identity of a user or service by Routes Protecting <a href="">protect()</a>
4. Authorization : Has the role to do so ie. Authorization determines their access rights <a href="">restrictTo()</a>
5. Reset Password Functionality
    - <a href="">forgetPassword()</a>
    - <a href="">resetPassword()</a>
6. <a href="">Update user Password</a>
7. <a href="">Update user data other than password</a>
8. <a href="">Delete </a>
9. <a href="">Sending JWT Cookie</a>
10. <a href="">Rate limiting</a> ➡ express-rate-limit
11. <a href="">Setting Security HTTP Headers</a> ➡ helmet
12. Data Sanitization
    - <a href="">against NoSQL query Injection</a>
    - <a href="">against XSS</a>
13. <a href="">Parameter Pollution</a> 
    - <a href="">Err 1 Example</a>
    - <a href="">Err 2 Example</a>




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