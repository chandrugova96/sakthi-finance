const response = require("../middleware/responses");
const { statusCodes, responseMessage } = require('../constants');

class BaseValidation {}
BaseValidation.validateBody = (req, res, next, seeker_schema) => {
	try {
		const { error } = seeker_schema.validate(req.body);
		if (error) return response.joierrors(req, res, error);
		next();
	} catch (error) {
		response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
	}
};

BaseValidation.validateQuery = (req, res, next, seeker_schema) => {
	try {
		const { error } = seeker_schema.validate(req.query);
		if (error) return response.joierrors(req, res, error);
		next();
	} catch (error) {
		response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
	}
}

module.exports = BaseValidation;