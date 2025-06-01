const jwt = require('jsonwebtoken');

const Response = require("./responses");
const { statusCodes, responseMessage } = require('../constants');

class Token {}
Token.validateToken = (req, res, next)  =>{
	try {
		let token = req.headers["authorization"];
		if (!token) {
			return Response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
		};
		if(!token.includes("Bearer")){
			return Response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
		};
		token = token.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
			if (error) {
				Response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, error, responseMessage.unauthorized);
			} else {
				req.user = decoded;
				next()
			}
		});

	} catch (error) {
		Response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
	}
};

module.exports = Token;