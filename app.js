// Requiring the 'express' and 'path' modules
const express = require('express');
// Creating an Express application
const app = express();
// Other Packages
const path = require('path');
const morgan = require('morgan');
app.use(morgan('dev'))
// Serving static files from the 'public' directory
app.use(express.static('./public'));
// Importing Products
const { products } = require(`${__dirname}/data.js`)
// Requiring the logger middleware from the 'logger.js' file
const logger = require(`${__dirname}/logger.js`);
// Requiring the logger middleware from the 'logger.js' file
const authorize = require(`${__dirname}/authorize.js`);
// Using the logger and authorize middleware for all routes
// app.use([logger, authorize]);


/** Route for the home page for displaying products data
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
/* app.get('/', (req, res) => {
    res.json(products)
}); */

/** Route for retrieving a modified list of products (subset of original data) from the API
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
app.get('/api/v1/products', (req, res) => {
    // Mapping the original 'products' array to create a new array with selected properties
    const newProducts = products.map(product => {
        // Destructuring properties from the original product object
        const { id, name, image, price } = product;
        // Returning a new object with selected properties
        return { id, name, image, price };
    });

    // Sending the modified list of products as a JSON response
    res.json(newProducts);
});


/** Route for retrieving product data by a specific ID from the API
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
app.get('/api/v1/products/:id', (req, res) => {
    // Extracting the product ID from the request parameters
    const productId = req.params.id;

    // Finding the product with the specified ID in the 'products' array
    const singleProduct = products.find(product => {
        return product.id === Number(productId);
    });

    // Handling the case where the product with the specified ID is not found
    if (!singleProduct) {
        // Sending a 404 status code and a message indicating that the resource was not found
        return res.status(404).send(`Resource with ID ${productId} was not found`);
    } else {
        // Sending the product data as a JSON response
        return res.json(singleProduct);
    }
});

/** Route for retrieving filtered product data from the API based on query parameters
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
app.get('/api/v1/query', (req, res) => {
    // Destructuring query parameters from the request
    const { search, limit } = req.query;
    // Creating a copy of the 'products' array for sorting
    let sortedProducts = [...products];

    // Filtering products based on the 'search' parameter
    if (search) {
        return sortedProducts = sortedProducts.filter(product => {
            return product.name.startsWith(search);
        });
    }

    // Slicing the array based on the 'limit' parameter
    if (limit) {
        return sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    // Handling the case where no products match the search criteria
    if (sortedProducts.length < 1) {
        // Returning a JSON response indicating no matching products
        return res.status(200).json({
            success: true,
            data: []
        });
    }

    // Sending the filtered and sorted products as a JSON response
    return res.status(200).json(sortedProducts);
});

/** Route for displaying the home page with middleware logging
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
app.get('/v2/', (req, res) => {
    // Sending a response for the home page with middleware logging
    res.send('Home page on Middleware');
});

/** Route for displaying the about page
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
app.get('/v2/about', (req, res) => {
    // Sending a response for the about page
    res.send('About page on Middleware');
});



/** Route for the home page
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
/* app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
}); */

/** Catch-all route for handling any other requests
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
});

// Setting the server to listen on port 6575
const port = 6575;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
