/** Middleware for Authorization
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 * @param {Function} next - Callback function to pass control to the next middleware in the stack.
 */
const authorize = (req, res, next) => {
    // Extracting the 'user' parameter from the request query
    const { user } = req.query;

    // Checking if the user is authorized ('ale' is considered authorized)
    if (user === 'ale') {
        // If authorized, attaching user information to the request object
        req.user = {
            name: 'Ale',
            id: 3
        };
        // Passing control to the next middleware in the stack
        next();
    } else {
        // If not authorized, sending a 401 Unauthorized status and a message
        res.status(401).send('Unauthorized');
    }
}

// Exporting the authorize middleware for use in other parts of the application
module.exports = authorize;
