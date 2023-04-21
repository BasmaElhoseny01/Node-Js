## Authentication

### Code Map
1. JWT TOkens in login and sign up
2. <a href="">Instance Method</a>
3. Authentication: Logged in  ie. Authentication verifies the identity of a user or service by Routes Protecting <a href="">protect()</a>
4. Authorization : Has the role to do so ie. Authorization determines their access rights <a href="">restrictTo()</a>
5. Reset Password Functionality
    - <a href="">forgetPassword()</a>
    - <a href="">resetPassword()</a>
6. 

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