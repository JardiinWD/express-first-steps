// Requiring the 'express' and 'morgan' modules
const express = require('express');
const morgan = require('morgan');
// Creating an Express application
const app = express();
// Get people array from data.js
let { people } = require(`${__dirname}/data.js`)
// Use morgan
app.use(morgan('dev'))
// Static assets
app.use(express.static(`${__dirname}/methods-public`))
// Parse form data
app.use(express.urlencoded({
    extended: false
}))
// Parse JSON data
app.use(express.json())


/** Route for the displaying people data
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get('/api/v1/people', (req, res) => {
    res.status(200).json({
        success: true,
        data: people
    })
})

/** Route for the displaying people data
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.post('/api/v1/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name value'
        })
    }
    res.status(201).json({
        success: true,
        person: name
    })
})




app.post('/api/v1/login', (req, res) => {
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please provide a correct name')
})


// Setting the server to listen on port 6575
const port = 6575;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
