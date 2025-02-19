const mongoose = require('mongoose')

async function connectToMongoDB(quotes){
    return mongoose.connect(quotes)
}

module.exports = {
    connectToMongoDB,
}