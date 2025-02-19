const express = require("express");
const router = express.Router();
const Quote = require('../models/Quote');

// Home page route
router.get('/home', (req, res) => {
    try {
        res.send('Welcome to the Quotes API!'); // Send a welcome message as a response
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
// Get a random Quote

router.get('/random', async (req, res) => {
    try {
        const count = await Quote.countDocuments(); // Get the total count of the quotes
        const random = Math.floor(Math.random() * count); // Get a random number
        const quote = await Quote.findOne().skip(random); // Get a random quote
        res.json(quote); // Send the quote as a response
    } catch (err) {
        res.status(500).json({error : err.message}); // Send the error message as a response
    }
})

// Get a Quote by catgory

router.get('/:category', async (req, res) => {
    try {
        const quotes = await Quote.find({ category: req.params.category}) // Get all the quotes with the specified category
        res.json(quotes); // Send the quotes as a response
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Add a new Quote

router.post('/', async (req, res) => {
    try {
        const { text, author, category } = req.body; // Get the text, author, and category from the request body
        const newQuote = new Quote({ text, author, category }) // Create a new quote
        await newQuote.save(); // Save the new quote to the database
        res.json(newQuote); // Send the new quote as a response
    } catch (err) {
        res.status(500).json({error: err.message});        
    }
})

module.exports = router; // Export the router

/*

In the above code snippet, we have created two routes.
The first route is used to get a random quote from the database.
We first get the total count of the quotes using the countDocuments() method.
Then, we generate a random number using the Math.random() method and multiply it by the total count of the quotes.
We then use the findOne() method to get a random quote from the database and send it as a response

*/
