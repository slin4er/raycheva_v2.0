const errorHandler = (err, req, res, next) => {
    if(err.message === 'Something went Wrong') {res.status(500).json({message: err.message})}
    if(err.message === 'Have not been created yet') {res.status(400).json({message: err.message})}
    if(err.message === 'Not Found') {res.status(404).json({message: err.message})}
    if(err.message === 'You are not suppose to be here!') {res.status(401).json({message: err.message})}
    if(err.message === 'Token must be provided') {res.status(401).json({message: err.message})}
    if(err.message === 'Wrong password or login') {res.status(401).json({message: err.message})}
    if(err.message === 'Unauthorized!') {res.status(401).json({message: err.message})}
    next(err)
}

module.exports = errorHandler