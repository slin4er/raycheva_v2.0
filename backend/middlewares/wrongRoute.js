const wrongRoute = (req, res) => {
    res.status(500).json({message:'This Route does not exist'})
}

module.exports = wrongRoute