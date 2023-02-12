- Npm is a command line interface that comes automatically with Node js to manage open source packages 
- @ beginning of every project type npm init

## Types of packages that can be installed 
### 1. Simple Dependencies 

```
npm install slugify
```

### 2. Development Dependencies (Tools for development like debugger or testing library)

```
npm install nodemon --save-dev
```

## Types of installation
### 1.Local package is  available only in this project 
#### To be able to run it from command line you need to specify a script 

```
"start":"nodemon index.js"
```

#### run script

```
npm run start
```

### 2.Globally so dependency is installed globally in the machine and can be used from every where

```
npm install nodemon —global
```
⇒ you may got errors due to permissions you only need to open it :)
