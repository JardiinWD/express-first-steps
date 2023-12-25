/** Middleware for logging request information
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback function to pass control to the next middleware in the stack.
 */
const logger = (req, res, next) => {
    // Extracting the HTTP method from the request
    const method = req.method;
    // Extracting the URL from the request
    const url = req.url;
    // Getting the current year for timestamp
    const time = new Date().getFullYear();
    // Logging the request method, URL, and timestamp
    console.log(method, url, time);
    // Passing control to the next middleware in the stack
    next();
}

module.exports = logger