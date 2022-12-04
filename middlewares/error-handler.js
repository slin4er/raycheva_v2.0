const errorHandler = (err, req, res, next) => {
    if(err.message === 'Something went Wrong') {res.status(500).json({message: err.message})}
    if(err.message === 'Have not been created yet') {res.status(400).json({message: err.message})}
    if(err.message === 'Not Found') {res.status(404).json({message: err.message})}
    next(err)
}

module.exports = errorHandler