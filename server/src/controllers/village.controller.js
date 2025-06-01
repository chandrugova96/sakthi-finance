'use strict'

const { VillageService } = require('../services')
const { Response } = require('../middleware')
const { statusCodes, responseMessage } = require('../constants')
const db = require("../models");
const { getNextId } = require('../helper/common');

class VillageController { }

VillageController.get = async (req, res) => {
   try {
      let villages = await VillageService.get({});
      return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.createdSuccess, villages)
   }
   catch (error) {
      return Response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll)
   }
}

VillageController.getUsers = async (req, res) => {
   try {
      let { villageId } = req.query;
      let users = await VillageService.getUsers({ villageId });
      return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.createdSuccess, users)
   }
   catch (error) {
      return Response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll)
   }
}

VillageController.getOneUser = async (req, res) => {
   try {
      let { userId } = req.query;
      let user = await VillageService.getOneUser({ id : Number(userId) });
      return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.createdSuccess, user)
   }
   catch (error) {
      return Response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll)
   }
}

VillageController.createLoan = async (req, res) => {
   try {
      let { userId, amount } = req.body;
      const nextId = await getNextId(db.LoansModal);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 100);

      let loanData = {
         id: nextId,
         userId,
         amount,
         startDate: today,
         endDate,
         balanceAmount: amount
      };
      let loan = await VillageService.createLoan(loanData);
      return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.createdSuccess, loan)
   }
   catch (error) {
      return Response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll)
   }
}

VillageController.updateLoan = async (req, res) => {
   try {
      let { loanId } = req.params;
      let { amount } = req.body;

      let loan = await VillageService.getOneLoan({ id: loanId });
      let paidAmount = loan.paidAmount + Number(amount);
      let balanceAmount = loan.amount - paidAmount;
      await VillageService.updateLoan({ id : loanId }, { paidAmount, balanceAmount });

      const nextId = await getNextId(db.LoanHistoryModal);
      let loanHistoryData = {
         id: nextId,
         loanId: loan.id,
         userId: loan.userId,
         amount: loan.amount,
         paidAmount: amount,
         balanceAmount: balanceAmount,
         date: new Date()
      };
      await VillageService.createLoanHistory(loanHistoryData)
      loan = await VillageService.getOneLoan({ id: loanId });
      return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.createdSuccess, loan)
   }
   catch (error) {
      return Response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll)
   }
}

VillageController.getUserLoans = async (req, res) => {
   try {
      let { userId } = req.query;
      let villages = await VillageService.getUserLoans({ userId });
      return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.createdSuccess, villages)
   }
   catch (error) {
      return Response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll)
   }
}

VillageController.getLoanHistory = async (req, res) => {
   try {
      let { loanId } = req.query;
      let villages = await VillageService.getLoanHistory({ loanId });
      return Response.success(req, res, statusCodes.HTTP_OK, responseMessage.createdSuccess, villages)
   }
   catch (error) {
      return Response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll)
   }
}

module.exports = VillageController