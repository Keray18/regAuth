const asyncHandler = require('express-async-handler')
const Todo = require('../models/todoModel')
const User = require("../models/userModel")

const getTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.find({ user: req.user.id })
    res.status(200).json(todo)
})

const setTodo = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Pls add a text field')
    }
    
    const todo = await Todo.create({
        text: req.body.text,
        user: req.body.id,
    })

    res.status(200).json(todo)
})

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    const user = await User.findById(req.user.id)

    if(!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }

    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    if(todo.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not Authorized.")
    }
    
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
    })

    res.status(200).json(updateTodo)
})

const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    const user = await User.findById(req.user.id)

    if (!todo) {
        res.status(400)
    }
    if (!user) {
        res.status(401)
        throw new Error("User not found.")
    }

    if(todo.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User is not Authorized.")
    }

    await todo.deleteOne()
    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo
}