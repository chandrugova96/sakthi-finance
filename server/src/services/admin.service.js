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

module.exports = AdminService;
