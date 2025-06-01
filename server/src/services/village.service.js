const db = require("../models");

class VillageService {}
VillageService.get = async (match) => {
  try {
    let data = await db.VillagesModal.find(match);
    return data;
  } catch (err) {
    throw err;
  }
};

VillageService.getUsers = async (match) => {
  try {
    let data = await db.UsersModal.find(match);
    return data;
  } catch (err) {
    throw err;
  }
};

VillageService.getOneUser = async (match) => {
  try {
    let data = await db.UsersModal.findOne(match);
    return data;
  } catch (err) {
    throw err;
  }
};

VillageService.getUserLoans = async (match) => {
  try {
    let data = await db.LoansModal.find(match);
    return data;
  } catch (err) {
    throw err;
  }
};

VillageService.getOneLoan = async (match) => {
  try {
    let data = await db.LoansModal.findOne(match);
    return data;
  } catch (err) {
    throw err;
  }
};

VillageService.createLoan = async (payload) => {
  try {
    let newUser = new db.LoansModal(payload);
    await newUser.save();
    return newUser;
  } catch (err) {
    throw err;
  }
};

VillageService.updateLoan = async (match, payload) => {
  try {
   await db.LoansModal.updateOne(
    match,
    { $set : payload }
   )
   return
  } catch (err) {
    throw err;
  }
};

VillageService.createLoanHistory = async (payload) => {
  try {
    let newUser = new db.LoanHistoryModal(payload);
    await newUser.save();
    return newUser;
  } catch (err) {
    throw err;
  }
};

VillageService.getLoanHistory = async (match) => {
  try {
    let data = await db.LoanHistoryModal.find(match);
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = VillageService;
