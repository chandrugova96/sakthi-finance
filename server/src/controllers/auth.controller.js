'use strict'

const { AdminService } = require('../services')
const { Response } = require('../middleware')
const { statusCodes, responseMessage } = require('../constants')
const { encrypt } = require('../helper')

class AuthController { }

AuthController.create = async (req, res) => {
   try {
      let payload = req.body;
      let admin = await AdminService.get({ email: payload.email });
      if (admin) {
         return Response.errors(req, res, statusCodes.HTTP_ALREADY_REPORTED, responseMessage.alreadyExited)
      }

      payload['password'] = await encrypt.passwordEncrypt(payload.password);
      await AdminService.create(payload);
      return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.createdSuccess)
   }
   catch (error) {
      return Response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll)
   }
}

AuthController.login = async (req, res) => {
   try {
      let { userName, password } = req.body;
      let admin = await AdminService.get({ userName });
      if (!admin) {
         return Response.success(req, res, statusCodes.HTTP_NOT_FOUND, responseMessage.notFound)
      }

      if (admin.status !== "Y") {
         return Response.success(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.inactiveStatus)
      }

      let isValidPassword = await encrypt.passwordCompare(password, admin.password);
      if (!isValidPassword) {
         return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.passwordIncorrect)
      }

      let tokenPayload = {
         id: admin._id,
         name: admin.name,
         type: admin.type
      }
      let jwtToken = await encrypt.signAccessToken(tokenPayload)

      return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.getDataSuccess, jwtToken)
   }
   catch (error) {
      return Response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll)
   }
}

module.exports = AuthController