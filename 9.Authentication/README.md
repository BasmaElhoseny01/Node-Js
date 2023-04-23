## Authentication

### Code Map
1. JWT TOkens
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/authController.js#L65-L87">logIn()</a>
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/authController.js#L49-L63">signUp()</a>
2. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/models/userModel.js#L93-L98">Instance Method</a>
3. Authentication: Logged in  ie. Authentication verifies the identity of a user or service by Routes Protecting <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/authController.js#L89-L124">protect()</a>
4. Authorization : Has the role to do so ie. Authorization determines their access rights <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/authController.js#L125-L137">restrictTo()</a>
5. Reset Password Functionality
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/authController.js#L139-L186">forgetPassword()</a>
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/authController.js#L188-L219">resetPassword()</a>
6. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/authController.js#L220-L240">Update user Password</a>
7. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/userController.js#L32-L56">Update user data other than password</a>
8. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/userController.js#L57-L67">Delete Account</a>
9. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/controllers/authController.js#L23-L35">Sending JWT Cookie</a>
10. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/app.js#L35-L42">Rate limiting</a> ➡ express-rate-limit
11. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/app.js#L22-L25">Setting Security HTTP Headers</a> ➡ helmet
12. Data Sanitization
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/app.js#L55-L56">against NoSQL query Injection</a>
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/app.js#L58-L63">against XSS</a>
13. <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/app.js#L74-L81">Parameter Pollution</a> 
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/app.js#L66-L70">Err 1 Example</a>
    - <a href="https://github.com/BasmaElhoseny01/Node-Js/blob/af6870508dac7b82c1e4725616064d4887f11e96/9.Authentication/app.js#L71-L74">Err 2 Example</a>




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