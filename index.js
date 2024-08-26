const express = require("express")
const { errorHandler } = require("./midellerware/errorMiddleware")

const PORT = 5000


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/todo', require('./routes/todoRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`)
})