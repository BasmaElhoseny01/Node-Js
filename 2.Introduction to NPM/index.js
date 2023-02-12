//@ beginning of every project type npm init

//To run nodemon npm run start as script added in package.json
// 1) core modules
const fs= require('fs')

// 2) Third Party modules
const slugify =require("slugify")
//Slugify
// Small utility library for generating speaking URLs (slug).
// A Slug is the unique identifying part of a web address, typically at the end of the URL.

// 3)My modules
const func=require('./module')

console.log(slugify('Fresh Fruits',{lower:true}))