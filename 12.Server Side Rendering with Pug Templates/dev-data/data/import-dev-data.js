const fs = require('fs');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const Tour = require('../../models/tourModel')
const User = require('../../models/userModel')
const Review = require('../../models/reviewModel')



//Must be Before any thing that needs to access it
dotenv.config({ path: './config.env' });

//Connect to DB
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(con => {
    // console.log(con.connections);
    console.log("DB Connection successful!⭐")
});

//Read JSON File with the Data
// Returns the contents of the file named filename. If encoding is specified then this function returns a string.
// Otherwise it returns a buffer
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));



//Import Data into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);

        console.log('Data Successfully loaded!')
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// DROP All Data From DB
const deleteData = async () => {
    try {
        // Delete all documents
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();

        console.log('Data Successfully deleted!')
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

//Specify options so that we can run from the command line
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}