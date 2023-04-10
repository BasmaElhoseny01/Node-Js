module.exports = fn => {
    return (req, res, next) => {
        //This make createTour be called always but we need it to be called only when a one hits the route so managed by express
        fn(req, res, next).catch(err => next(err))
    }
}