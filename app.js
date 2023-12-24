// Requiring the 'http' module
const http = require('http');

// Creating an HTTP server
const server = http.createServer((req, res) => {
    // Extracting the requested URL from the request
    const url = req.url;

    // Handling different routes based on the requested URL
    if (url === '/') {
        // Setting the response header with a 200 status code and content type
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.write('<h1>Home page</h1>'); // Sending the HTML content for the home page
        res.end(); // Ending the response
    }
    // About page
    else if (url === '/about') {
        // Setting the response header with a 200 status code and content type
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.write('<h1>About page</h1>'); // Sending the HTML content for the about page
        res.end(); // Ending the response
    }
    // Not found
    else {
        // Setting the response header with a 200 status code and content type
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.write('<h1>Page not found</h1>'); // Sending the HTML content for the page not found
        res.end(); // Ending the response
    }
});

// Listening on port 6575
server.listen(6575);
