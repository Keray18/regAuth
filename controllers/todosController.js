const getTodo = (req, res) => {
    res.status(200).json({message: "get todo"})
}

const setTodo = (req, res) => {
    // if (!req.body.text) {
    //     res.status(400)
    //     throw new Error('Pls add a text field')
    // }
    res.status(200).json({message: "set todo"})
}

const updateTodo = (req, res) => {
    res.status(200).json({message: `Update todo ${req.params.id}`})
}

const deleteTodo = (req, res) => {
    res.status(200).json({message: `delete todo ${req.params.id}`})
}


module.exports = {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo
}