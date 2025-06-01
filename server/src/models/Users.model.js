const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        villageId: {
            type: Number,
            required: true,
        },
        mobileNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Users", usersSchema);