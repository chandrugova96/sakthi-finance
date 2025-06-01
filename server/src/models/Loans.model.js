const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loansSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        userId: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paidAmount: {
            type: Number,
            required: false,
            default: 0
        },
        balanceAmount: {
            type: Number,
            required: false
        },
        startDate: {
            type: Date,
            required: false,
        },
        endDate: {
            type: Date,
            required: false,
        },
        status: {
            type: Number,
            default: 1 // 1 - In Prog & 2 - Completed
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Loans", loansSchema);