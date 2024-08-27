const asyncHandler = require('express-async-handler')
const Todo = require('../models/todoModel')


const getTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.find()
    res.status(200).json(todo)
})

const setTodo = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Pls add a text field')
    }
    
    const todo = await Todo.create({
        text: req.body.text,
    })

    res.status(200).json(todo)
})

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if(!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }
    
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
    })

    res.status(200).json(updateTodo)
})

const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
    }

    await todo.remove()
    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo
}