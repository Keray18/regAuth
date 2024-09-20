const mongoose = require("mongoose");
const User = require('../models/userModel')

const todoSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a text field']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Todo', todoSchema)