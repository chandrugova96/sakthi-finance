const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const villagesSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Villages", villagesSchema);