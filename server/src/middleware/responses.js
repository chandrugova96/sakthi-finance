class Response {}
// triggering a success response
Response.success = (req, res, status, message, data) => {
    message = message ? message : "Success"
    let response = {
        status,
        message
    }
    if (data) response['data'] = data;
    return res.status(status).json(response);
};

// triggering a error response
Response.errors = (req, res, status, message, data) => {
    let response = {
        status,
        message
    }
    if (data) response['data'] = data;
    return res.status(status).json(response);
};

// triggering a joi error response
Response.joierrors = (req, res, err) => {
    let error = err.details.map(e => e.message.replace(/"/g, ""));
    let message = "Bad Request";
    let status = 400;
    return res.status(status).json({
        success: false,
        status,
        message,
        error: error.join(', ')
    });
};

module.exports = Response;