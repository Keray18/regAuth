const express = require("express")
const { errorHandler } = require("./midellerware/errorMiddleware")
const connectDB = require("./config/db")

const PORT = 8000

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/todo', require('./routes/todoRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`)
})