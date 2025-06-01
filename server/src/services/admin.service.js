const db = require("../models");

class AdminService {}
AdminService.get = async (match) => {
  try {
    let admin = await db.AdminModal.findOne(match);
    return admin;
  } catch (err) {
    throw err;
  }
};

AdminService.create = async (payload) => {
  try {
    let newUser = new db.AdminModal(payload);
    await newUser.save();
    return newUser;
  } catch (err) {
    throw err;
  }
};

module.exports = AdminService;
