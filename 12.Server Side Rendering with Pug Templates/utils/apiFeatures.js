class APIFeatures {
    constructor(query, queryString) {
        this.query = query;//The one we modify in 😉
        this.queryString = queryString;//The one sent with Route
    }

    filter() {
        // Filtering
        //Exclude Special field names from teh query string 
        // const queryObj=req.query;//Shallow Copy
        const queryObj = { ...this.queryString };//new Object that have key-pair of the old object
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Await ==> the query is executed
        // const tours = await Tour.find(queryObj);
        // a.Build Query
        // const query = Tour.find(queryObj);
        // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');//Similar :D


        // Advanced Filtering
        // Request:{{baseURL}}/v1/tours?duration[gte]=5  ==> duration >=5
        //req.query:{ duration: { gte: '5' } }  ❌
        // MongolDB Query (Correct) :{ duration: { $gte: 5 } } ➡ so we need to transform first tp second
        //Sol replace gte with $gte
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);//\b exact without any string around it \g replace all occurrences instead first match only is replaced
        // console.log(JSON.parse(queryString))//{ duration: { '$gte': '5' } } ✅

        this.query.find(JSON.parse(queryStr))
        return this;
    }


    sort() {
        // Sorting
        if (this.queryString.sort) {
            // console.log(this.queryString.sort)
            //Query:sort=price
            //Mongoose:[price]
            // query=query.sort(req.query.sort);

            //Query:sort=price,ratingsAverage
            //Mongoose:[price,ratingsAverage]
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);

        }
        else {
            //Sort by Created At even if he didn't specify the sort
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    limitFields() {
        // Fields Limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            //just remove __v
            this.query = this.query.select('-__v ')
        }
        return this;
    }

    paginate() {
        //Pagination
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        //EX: page 1:1-10 page 2:11-20 page 3:21-30  he request 2,10 so skip first 10 documents
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}


module.exports = APIFeatures;