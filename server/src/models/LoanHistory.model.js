const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loansSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        loanId: {
            type: Number,
            required: true,
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
        date: {
            type: Date,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("LoanHistory", loansSchema);