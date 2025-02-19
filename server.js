const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const { connectToMongoDB } = require("./connect")



dotenv.config()
const app = express()

// Middlewares

app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(cors()) // to allow cross-origin requests

// MongoDB Connection

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDb connected')) // if the connection is successful
//     .catch(err => console.log(err)); // if the connection is unsuccessful

// connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
// .then(() => console.log("MongoDB connected"))

connectToMongoDB(process.env.MONGO_URI)  // Use .env variable
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));


// Routes

const quotesRoute = require('./routes/quotes'); // importing the quotes route
app.use('/api/quotes', quotesRoute); // using the quotes route

const PORT = process.env.PORT || 5000; // setting the port number
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // starting the server
